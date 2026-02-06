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
  Settings
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  answer?: TutorAnswer;
  source?: 'template' | 'gemini';
}

const MODELS = [
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Recommended)' },
  { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash (Latest)' },
  { id: 'gemini-pro', name: 'Gemini 1.0 Pro' },
  { id: 'gemini-1.0-pro', name: 'Gemini 1.0 Pro (Explicit)' },
];

export const AlgorithmTutor: React.FC = () => {
  const { algorithm, steps, currentStep, isRunning, isPaused } = useSimulatorStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [apiKey, setApiKey] = useState<string>(() => {
    return (import.meta.env.VITE_GEMINI_API_KEY as string) || localStorage.getItem('gemini_api_key') || '';
  });

  const [model, setModel] = useState<string>(() => {
    return localStorage.getItem('gemini_model') || 'gemini-1.5-flash';
  });

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleSaveModel = (m: string) => {
    setModel(m);
    localStorage.setItem('gemini_model', m);
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
    const intent = detectIntent(question);

    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');

    if (!intent) {
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: 'Please provide a Gemini API Key to enable open-ended questions.',
            answer: {
              intent: 'fallback',
              title: 'API Key Required',
              body: 'Enter your Gemini API key in settings to continue.',
            },
            source: 'template',
          },
        ]);
        return;
      }

      setIsThinking(true);
      void fetchGeminiAnswer(question, contextSummary, apiKey, model).then((resp) => {
        setIsThinking(false);
        if (!resp) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              text: `I could not reach Gemini (${model}). Check your key or try a different model in settings.`,
              answer: {
                intent: 'fallback',
                title: 'Connection Error',
                body: 'Failed to fetch response. Verify your key and model selection.',
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
              title: 'Gemini',
              body: resp,
            },
            source: 'gemini',
          },
        ]);
      });
      return;
    }

    const answer = generateAnswer(intent as TutorIntent, contextSummary);
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', text: answer.body, answer, source: 'template' },
    ]);
  };

  const currentStatus = stepData
    ? `${stepData.dataStructure.type} · Frontier ${stepData.dataStructure.items.length} · Visited ${stepData.visited.length}`
    : 'No steps yet — run the simulator';
  
  const frontierSummary = stepData?.dataStructure?.items
    ?.slice(0, 5)
    .map((n) => `(${n.row},${n.col})`)
    .join(', ');
  
  async function fetchGeminiAnswer(question: string, ctx: typeof contextSummary, key: string, modelId: string): Promise<string | null> {
    try {
      const prompt = `You are Algorithm Tutor. Be concise and helpful. If the question is unrelated to algorithms, answer briefly and politely.
Context:
- Algorithm: ${ctx.algorithm}
- Step index: ${ctx.stepIndex}
- Current node: ${ctx.step?.currentNode ? `(${ctx.step.currentNode.row},${ctx.step.currentNode.col})` : 'none'}
- Frontier type: ${ctx.step?.dataStructure.type ?? 'n/a'}
- Frontier head: ${ctx.step?.dataStructure.items?.[0] ? `(${ctx.step.dataStructure.items[0].row},${ctx.step.dataStructure.items[0].col})` : 'empty'}
- Frontier sample: ${frontierSummary ?? 'empty'}
- Visited count: ${ctx.step?.visited.length ?? 0}
- Is running: ${ctx.isRunning}
- Is paused: ${ctx.isPaused}
Question: ${question}
Keep answers under 80 words.`;

      // Use v1beta by default
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        },
      );

      if (!res.ok) {
        console.error('Gemini API Error:', res.status, res.statusText);
        return null;
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
      return text ?? null;
    } catch (err) {
      console.error('Gemini error', err);
      return null;
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
                  <p className="text-[10px] text-muted-foreground">
                    Try a different model if you get 404 errors.
                  </p>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-4 h-full">
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
                className="p-3 flex items-center gap-2"
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
