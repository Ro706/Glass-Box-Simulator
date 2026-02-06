import React, { useMemo, useState } from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { detectIntent, generateAnswer, suggestedQuestions, TutorAnswer, TutorIntent } from '@/lib/tutorTemplates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TextToSpeech } from './TextToSpeech';
import { cn } from '@/lib/utils';
import {
  Bot,
  Send,
  MessageSquare,
  Sparkles,
  PauseCircle,
  PlayCircle,
  Activity,
  Loader2,
  Settings,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  answer?: TutorAnswer;
  source?: 'template' | 'gemini';
}

const MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Recommended)' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
  { id: 'gemini-pro', name: 'Gemini 1.0 Pro (Stable)' },
  { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Exp)' },
];

export const AlgorithmTutor: React.FC = () => {
  const { algorithm, steps, currentStep, isRunning, isPaused } = useSimulatorStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [customModel, setCustomModel] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState<string | null>(null);
  
  const [apiKey, setApiKey] = useState<string>(() => {
    return (import.meta.env.VITE_GEMINI_API_KEY as string)?.trim() || localStorage.getItem('gemini_api_key')?.trim() || '';
  });

  const [model, setModel] = useState<string>(() => {
    const saved = localStorage.getItem('gemini_model')?.trim();
    const isValid = saved && MODELS.some(m => m.id === saved);
    return isValid ? saved : 'gemini-2.5-flash';
  });

  const handleTestConnection = async () => {
    if (!apiKey) {
      setTestStatus('error');
      setTestError('No API Key provided. Please enter a key in settings.');
      return;
    }
    setTestStatus('testing');
    setTestError(null);
    
    // Simple ping to verify the key and model
    const result = await fetchGeminiAnswer("Hello! Just respond with 'Connection Successful' if you receive this.", contextSummary, apiKey, model);
    
    if (result.error) {
      setTestStatus('error');
      setTestError(result.error);
    } else {
      setTestStatus('success');
      // Add a system message to the chat too
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Connection test successful! I am ready to help with your DSA questions.",
        source: 'gemini' 
      }]);
    }
  };

  const handleSaveKey = (key: string) => {
    const cleanKey = key.trim();
    setApiKey(cleanKey);
    localStorage.setItem('gemini_api_key', cleanKey);
    setApiError(null);
  };

  const handleSaveModel = (m: string) => {
    const cleanModel = m.trim();
    setModel(cleanModel);
    localStorage.setItem('gemini_model', cleanModel);
    setApiError(null);
  };

  const stepData = currentStep >= 0 ? steps[currentStep] : null;
  const stepIndex = currentStep >= 0 ? currentStep : 0;

  const contextSummary = useMemo(
    () => ({
      algorithm,
      stepIndex,
      step: stepData,
      isRunning,
      isPaused,
    }),
    [algorithm, stepIndex, stepData, isRunning, isPaused],
  );

  const handleAsk = (question: string) => {
    if (!question.trim()) return;

    const suggested = suggestedQuestions(algorithm);
    const isPreProvided = suggested.some(
      (sq) => sq.question.toLowerCase() === question.trim().toLowerCase()
    );

    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');
    setApiError(null);

    const intent = detectIntent(question);

    if (isPreProvided || (intent && !apiKey)) {
      const answer = generateAnswer((intent || 'fallback') as TutorIntent, contextSummary);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: answer.body, answer, source: 'template' },
      ]);
      return;
    }

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Please provide a Gemini API Key in settings to ask unique questions.',
          answer: {
            intent: 'fallback',
            title: 'API Key Required',
            body: 'I can only answer pre-set questions without an API key. Enter your Gemini key in settings for open-ended DSA help.',
          },
          source: 'template',
        },
      ]);
      return;
    }

    setIsThinking(true);
    void fetchGeminiAnswer(question, contextSummary, apiKey, model).then((respObj) => {
      setIsThinking(false);
      
      if (respObj.error) {
        setApiError(respObj.error);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Error: ${respObj.error}`,
            answer: {
              intent: 'fallback',
              title: 'API Error',
              body: `The Gemini API returned an error: ${respObj.error}. Please check your key or try a different model like "Gemini 1.0 Pro".`,
            },
            source: 'template',
          },
        ]);
        return;
      }

      const resp = respObj.text;
      if (!resp) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `I could not reach Gemini (${model}).`,
            answer: {
              intent: 'fallback',
              title: 'Connection Issue',
              body: 'Possible reasons: Invalid API Key, Regional restrictions, or Unsupported model. Try switching to "Gemini 1.0 Pro" in settings.',
            },
            source: 'template',
          },
        ]);
        return;
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: resp,
          answer: {
            intent: 'fallback',
            title: 'AI Tutor',
            body: resp,
          },
          source: 'gemini',
        },
      ]);
    });
  };

  const currentStatus = stepData
    ? `${stepData.dataStructure.type} · Frontier ${stepData.dataStructure.items.length} · Visited ${stepData.visited.length}`
    : 'No steps yet — run the simulator';
  
  const frontierSummary = stepData?.dataStructure?.items
    ?.slice(0, 5)
    .map((n) => `(${n.row},${n.col})`)
    .join(', ');
  
  async function fetchGeminiAnswer(question: string, ctx: typeof contextSummary, key: string, modelId: string): Promise<{ text: string | null; error: string | null }> {
    const cleanKey = key.trim();
    let cleanModel = modelId.trim();
    
    // Ensure model path is correct
    if (!cleanModel.startsWith('models/')) {
      cleanModel = `models/${cleanModel}`;
    }

    try {
      const prompt = `You are "Algorithm Tutor", a specialized expert in Data Structures and Algorithms (DSA).

STRICT RULES:
1. ONLY answer questions related to DSA, graph theory, or the current algorithm simulation.
2. If the user asks anything outside of DSA, you MUST politely refuse.
3. Be concise and technical.
4. Keep answers under 100 words.

Current Simulation Context:
- Algorithm: ${ctx.algorithm.toUpperCase()}
- Current Step: ${ctx.stepIndex}
- Current Node: ${ctx.step?.currentNode ? `(${ctx.step.currentNode.row},${ctx.step.currentNode.col})` : 'none'}
- Frontier: ${ctx.step?.dataStructure.type ?? 'n/a'}
- Visited: ${ctx.step?.visited.length ?? 0}
- Status: ${ctx.isRunning ? 'Running' : ctx.isPaused ? 'Paused' : 'Stopped'}

User Question: ${question}

Response:`;

      const fetchData = async (version: string) => {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/${version}/${cleanModel}:generateContent?key=${cleanKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                contents: [{ parts: [{ text: prompt }] }],
                safetySettings: [
                  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
                ]
              }),
            }
          );
          return res;
        } catch (e) {
          return null;
        }
      };

      // Try v1beta first as it has the widest model support
      let res = await fetchData('v1beta');

      // If v1beta fails, try v1
      if (!res || !res.ok) {
        const v1Res = await fetchData('v1');
        if (v1Res && v1Res.ok) {
          res = v1Res;
        }
      }

      if (!res || !res.ok) {
        const errorData = res ? await res.json().catch(() => ({})) : {};
        const errorMessage = errorData.error?.message || (res ? res.statusText : "Network Error");
        
        if (res?.status === 404) {
          return { 
            text: null, 
            error: `Model not found (404). This usually means the model name "${modelId}" is not supported in your region or for your API key. Try switching to "Gemini 1.0 Pro (Stable)" in settings.` 
          };
        }
        return { text: null, error: errorMessage };
      }

      const data = await res.json();
      
      if (data.promptFeedback?.blockReason) {
        return { text: null, error: `Blocked by Google: ${data.promptFeedback.blockReason}` };
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text && data?.candidates?.[0]?.finishReason === 'SAFETY') {
        return { text: "Response blocked by safety filters.", error: null };
      }

      return { text: text ?? null, error: text ? null : "The model returned an empty response." };
    } catch (err: any) {
      return { text: null, error: err.message || "A network error occurred while connecting to Gemini." };
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="gap-2 shadow-lg" size="lg">
            <Bot className="h-5 w-5" />
            Ask the Algorithm
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Algorithm Tutor
              </DrawerTitle>
              <Button 
                variant={showSettings ? "secondary" : "ghost"} 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            {showSettings && (
              <div className="p-3 rounded-md bg-secondary/50 border space-y-3 animate-fade-in">
                <div className="space-y-1">
                  <Label htmlFor="apiKey" className="text-xs">Gemini API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => handleSaveKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="model" className="text-xs">AI Model</Label>
                  <Select value={model} onValueChange={handleSaveModel}>
                    <SelectTrigger id="model" className="h-8 text-xs">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {MODELS.map(m => (
                        <SelectItem key={m.id} value={m.id} className="text-xs">
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 border-t pt-2">
                  <Label htmlFor="customModel" className="text-[10px] text-muted-foreground uppercase font-bold">Experimental: Manual Model</Label>
                  <div className="flex gap-2">
                    <Input
                      id="customModel"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      placeholder="e.g. gemini-1.5-flash-001"
                      className="h-8 text-xs flex-1"
                    />
                    <Button 
                      size="sm" 
                      className="h-8 px-2 text-[10px]" 
                      onClick={() => {
                        if (customModel.trim()) {
                          handleSaveModel(customModel.trim());
                          setCustomModel('');
                        }
                      }}
                    >
                      Use
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Active: <code className="bg-secondary px-1 rounded">{model}</code>
                  </p>
                </div>

                <div className="space-y-2 border-t pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] text-muted-foreground uppercase font-bold">API Verification</Label>
                    {testStatus === 'success' && <Badge variant="outline" className="text-[9px] bg-green-500/10 text-green-600 border-green-200">Online</Badge>}
                    {testStatus === 'error' && <Badge variant="outline" className="text-[9px] bg-red-500/10 text-red-600 border-red-200">Offline</Badge>}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full h-8 text-xs gap-2" 
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing'}
                  >
                    {testStatus === 'testing' ? (
                      <RefreshCw className="h-3 w-3 animate-spin" />
                    ) : (
                      <Activity className="h-3 w-3" />
                    )}
                    Test Connection
                  </Button>

                  {testStatus === 'success' && (
                    <div className="flex items-center gap-2 text-[10px] text-green-600 bg-green-500/5 p-1.5 rounded border border-green-100">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Gemini is responding correctly!</span>
                    </div>
                  )}

                  {testStatus === 'error' && (
                    <div className="flex flex-col gap-1 text-[10px] text-red-600 bg-red-500/5 p-1.5 rounded border border-red-100">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        <span className="font-bold">Test Failed</span>
                      </div>
                      <p className="pl-5 opacity-80 break-words">{testError}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Replaced DrawerDescription with div to fix nesting warning */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">Algorithm: {algorithm.toUpperCase()}</Badge>
              <Badge variant="outline">Step: {currentStep >= 0 ? currentStep + 1 : '—'}</Badge>
              <Badge variant="outline" className={cn(isPaused ? 'text-yellow-600' : isRunning ? 'text-green-600' : 'text-muted-foreground')}>
                {isPaused ? 'Paused' : isRunning ? 'Running' : 'Idle'}
              </Badge>
              {stepData?.currentNode && (
                <Badge variant="secondary">
                  Current node ({stepData.currentNode.row},{stepData.currentNode.col})
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{currentStatus}</p>
          </DrawerHeader>

          <Separator />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-10 h-full">
            <div className="lg:col-span-2 flex flex-col gap-3 border rounded-lg bg-card">
              <ScrollArea className="flex-1 p-4 space-y-4 max-h-[50vh]">
                {messages.length === 0 && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Ask about the active algorithm step.
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn('p-3 rounded-lg border', msg.role === 'assistant' ? 'bg-secondary/40' : 'bg-card')}> 
                    <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[11px]">{msg.role === 'assistant' ? 'Tutor' : 'You'}</Badge>
                      {msg.role === 'assistant' && msg.answer?.intent && (
                        <span className="uppercase tracking-wide text-[10px]">{msg.answer.intent}</span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.role === 'assistant' ? msg.answer?.body ?? msg.text : msg.text}</p>
                    {msg.role === 'assistant' && msg.answer?.extra && (
                      <ul className="mt-2 text-xs text-muted-foreground space-y-1 list-disc list-inside">
                        {msg.answer.extra.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {msg.role === 'assistant' && msg.answer && (
                      <div className="mt-2">
                        <TextToSpeech text={`${msg.answer.title}. ${msg.answer.body} ${(msg.answer.extra ?? []).join('. ')}`} />
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>

              <Separator />

              <form
                className="p-3 flex items-center gap-2 mb-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleAsk(input);
                }}
              >
                <Input
                  placeholder="Ask about this algorithm step..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="text-sm"
                />
                <Button type="submit" className="gap-2" variant="default" disabled={isThinking}>
                  {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {isThinking ? 'Thinking' : 'Ask'}
                </Button>
              </form>
            </div>

            <div className="space-y-3 border rounded-lg p-3 bg-card/60">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Quick questions
              </h4>
              <div className="grid gap-2">
                {suggestedQuestions(algorithm).map((item) => (
                  <Button
                    key={item.question}
                    variant="secondary"
                    size="sm"
                    className="justify-start text-left"
                    onClick={() => handleAsk(item.question)}
                  >
                    {item.question}
                  </Button>
                ))}
              </div>
              <Separator />
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" /> <span>Works best while running or stepping.</span>
                </div>
                <div className="flex items-center gap-2">
                  <PauseCircle className="h-4 w-4" /> <span>Paused? I still use the current frontier.</span>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};