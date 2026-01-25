import React from 'react';
import { useComparisonStore } from '@/store/comparisonStore';
import { algorithmInfo } from '@/lib/algorithms';
import { AlgorithmType } from '@/types/algorithm';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
} from 'lucide-react';

const algorithms: AlgorithmType[] = ['bfs', 'dfs', 'dijkstra', 'astar'];

export const ComparisonControls: React.FC = () => {
  const {
    algorithmA,
    algorithmB,
    setAlgorithmA,
    setAlgorithmB,
    runComparison,
    stepForward,
    stepBackward,
    pause,
    resume,
    reset,
    isRunning,
    isPaused,
    speed,
    setSpeed,
  } = useComparisonStore();

  const hasSteps = algorithmA.steps.length > 0 || algorithmB.steps.length > 0;

  return (
    <div className="space-y-4">
      {/* Algorithm selectors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Algorithm A
          </label>
          <Select
            value={algorithmA.algorithm}
            onValueChange={(value) => setAlgorithmA(value as AlgorithmType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((alg) => (
                <SelectItem key={alg} value={alg}>
                  {algorithmInfo[alg].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Algorithm B
          </label>
          <Select
            value={algorithmB.algorithm}
            onValueChange={(value) => setAlgorithmB(value as AlgorithmType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((alg) => (
                <SelectItem key={alg} value={alg}>
                  {algorithmInfo[alg].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={stepBackward}
          disabled={!hasSteps || algorithmA.currentStep <= 0}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        {isRunning ? (
          <Button size="icon" onClick={pause}>
            <Pause className="h-4 w-4" />
          </Button>
        ) : hasSteps && !algorithmA.isComplete ? (
          <Button size="icon" onClick={resume}>
            <Play className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="icon" onClick={runComparison}>
            <Play className="h-4 w-4" />
          </Button>
        )}

        <Button
          size="icon"
          variant="outline"
          onClick={stepForward}
          disabled={!hasSteps || (algorithmA.isComplete && algorithmB.isComplete)}
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={reset}
          disabled={!hasSteps}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Speed control */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Speed</span>
          <span>{Math.round(1000 / speed)} steps/sec</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(v) => setSpeed(v[0])}
          min={50}
          max={500}
          step={50}
          className="w-full"
        />
      </div>
    </div>
  );
};
