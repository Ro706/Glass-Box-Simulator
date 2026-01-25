import React from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { algorithmInfo } from '@/lib/algorithms';
import { cn } from '@/lib/utils';
import { MessageCircle, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { TextToSpeech } from './TextToSpeech';

export const ExplanationPanel: React.FC = () => {
  const { steps, currentStep, algorithm } = useSimulatorStore();

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;
  const info = algorithmInfo[algorithm];

  return (
    <div className="space-y-4">
      {/* Current step explanation */}
      <div className="rounded-lg bg-card border border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Current Step</span>
          </div>
          {currentStepData && (
            <TextToSpeech text={currentStepData.explanation} />
          )}
        </div>
        
        {currentStepData ? (
          <p className="text-sm leading-relaxed">
            {currentStepData.explanation}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Click "Run" to start the algorithm and see step-by-step explanations.
          </p>
        )}

        {/* Status indicator */}
        {currentStepData?.isComplete && (
          <div className={cn(
            "flex items-center gap-2 p-2 rounded-md text-sm",
            currentStepData.foundPath 
              ? "bg-green-500/10 text-green-600" 
              : "bg-red-500/10 text-red-600"
          )}>
            {currentStepData.foundPath ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Path found successfully!</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                <span>No path exists</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Algorithm insight */}
      <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-medium">Why {info.shortName}?</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {info.description}
        </p>
        <div className="text-xs">
          <span className="text-muted-foreground">Best for: </span>
          <span className="text-foreground">{info.bestFor}</span>
        </div>
      </div>
    </div>
  );
};
