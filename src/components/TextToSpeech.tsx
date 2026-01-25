import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TextToSpeechProps {
  text: string;
  className?: string;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, className }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const startSpeaking = useCallback(() => {
    if (!window.speechSynthesis || !text) return;

    // Stop any ongoing speech
    stopSpeaking();

    // Clean the text (remove emojis and special characters for better speech)
    const cleanText = text.replace(/[🚀🎉❌⚡💡🔍📊🎯]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [text, speechRate, stopSpeaking]);

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  };

  // Stop speaking when text changes
  useEffect(() => {
    stopSpeaking();
  }, [text, stopSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  if (!isSupported) {
    return null;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant={isSpeaking ? 'default' : 'outline'}
        size="sm"
        onClick={toggleSpeech}
        disabled={!text}
        className={cn(
          'gap-2 transition-all',
          isSpeaking && 'animate-pulse bg-primary'
        )}
      >
        {isSpeaking ? (
          <>
            <VolumeX className="h-4 w-4" />
            Stop Speaking
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4" />
            Speak Explanation
          </>
        )}
      </Button>

      <Select
        value={speechRate.toString()}
        onValueChange={(value) => setSpeechRate(parseFloat(value))}
      >
        <SelectTrigger className="w-[140px] h-9">
          <Gauge className="h-3 w-3 mr-2" />
          <SelectValue placeholder="Speed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.5">Slow (0.5x)</SelectItem>
          <SelectItem value="0.75">Slower (0.75x)</SelectItem>
          <SelectItem value="1">Normal (1x)</SelectItem>
          <SelectItem value="1.25">Faster (1.25x)</SelectItem>
          <SelectItem value="1.5">Fast (1.5x)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
