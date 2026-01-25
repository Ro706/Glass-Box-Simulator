import React, { useEffect, useRef } from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw,
  Zap,
  Turtle
} from 'lucide-react';

export const PlaybackControls: React.FC = () => {
  const {
    isRunning,
    isPaused,
    speed,
    currentStep,
    steps,
    runAlgorithm,
    stepForward,
    stepBackward,
    pause,
    resume,
    reset,
    setSpeed,
  } = useSimulatorStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        stepForward();
      }, speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, speed, stepForward]);

  // Stop when algorithm completes
  useEffect(() => {
    if (currentStep >= 0 && steps[currentStep]?.isComplete) {
      pause();
    }
  }, [currentStep, steps, pause]);

  const canStepBack = currentStep > 0;
  const canStepForward = currentStep < steps.length - 1;
  const hasStarted = steps.length > 0;
  const isComplete = currentStep >= 0 && steps[currentStep]?.isComplete;

  return (
    <div className="space-y-4">
      {/* Main playback buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={stepBackward}
          disabled={!canStepBack || isRunning}
          className="h-10 w-10"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        {!isRunning || isPaused ? (
          <Button
            variant="default"
            size="lg"
            onClick={hasStarted && canStepForward ? resume : runAlgorithm}
            disabled={isComplete && !canStepForward}
            className="flex-1 gap-2 bg-gradient-hero hover:opacity-90 text-primary-foreground font-semibold"
          >
            <Play className="h-5 w-5" />
            {hasStarted ? 'Resume' : 'Run'}
          </Button>
        ) : (
          <Button
            variant="default"
            size="lg"
            onClick={pause}
            className="flex-1 gap-2"
          >
            <Pause className="h-5 w-5" />
            Pause
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={stepForward}
          disabled={!canStepForward}
          className="h-10 w-10"
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          className="h-10 w-10"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Speed control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Turtle className="h-3 w-3" />
            Speed
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Zap className="h-3 w-3" />
          </span>
        </div>
        <Slider
          value={[1000 - speed]}
          onValueChange={([value]) => setSpeed(1000 - value)}
          min={0}
          max={950}
          step={50}
          className="w-full"
        />
        <div className="text-center text-xs text-muted-foreground">
          {speed}ms per step
        </div>
      </div>

      {/* Progress indicator */}
      {hasStarted && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step {currentStep + 1}</span>
            <span>of {steps.length}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-hero transition-all duration-200"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
