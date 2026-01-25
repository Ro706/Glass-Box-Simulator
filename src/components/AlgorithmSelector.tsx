import React from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { algorithmInfo } from '@/lib/algorithms';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Layers, 
  Box, 
  Route, 
  Sparkles,
  Check
} from 'lucide-react';

const algorithmIcons = {
  bfs: Layers,
  dfs: Box,
  dijkstra: Route,
  astar: Sparkles,
};

export const AlgorithmSelector: React.FC = () => {
  const { algorithm, setAlgorithm, isRunning } = useSimulatorStore();

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(algorithmInfo) as Array<keyof typeof algorithmInfo>).map((key) => {
        const info = algorithmInfo[key];
        const Icon = algorithmIcons[key];
        const isSelected = algorithm === key;

        return (
          <Button
            key={key}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => setAlgorithm(key)}
            disabled={isRunning}
            className={cn(
              "relative gap-2 transition-all duration-200",
              isSelected && "shadow-glow"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{info.shortName}</span>
            {isSelected && (
              <Check className="h-3 w-3 ml-1" />
            )}
          </Button>
        );
      })}
    </div>
  );
};
