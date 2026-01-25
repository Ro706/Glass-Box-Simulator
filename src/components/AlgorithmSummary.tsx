import React from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { algorithmInfo } from '@/lib/algorithms';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  HardDrive, 
  ThumbsUp, 
  ThumbsDown,
  Target
} from 'lucide-react';

export const AlgorithmSummary: React.FC = () => {
  const { algorithm } = useSimulatorStore();
  const info = algorithmInfo[algorithm];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold",
          info.color
        )}>
          {info.shortName.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold">{info.name}</h3>
          <p className="text-xs text-muted-foreground">
            Uses: {info.dataStructure}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {info.description}
      </p>

      {/* Complexity */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Clock className="h-3 w-3" />
            Time
          </div>
          <div className="font-mono text-sm font-medium">{info.timeComplexity}</div>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <HardDrive className="h-3 w-3" />
            Space
          </div>
          <div className="font-mono text-sm font-medium">{info.spaceComplexity}</div>
        </div>
      </div>

      {/* Strengths */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
          <ThumbsUp className="h-4 w-4" />
          Strengths
        </div>
        <ul className="space-y-1">
          {info.strengths.map((strength, index) => (
            <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-red-500">
          <ThumbsDown className="h-4 w-4" />
          Weaknesses
        </div>
        <ul className="space-y-1">
          {info.weaknesses.map((weakness, index) => (
            <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              {weakness}
            </li>
          ))}
        </ul>
      </div>

      {/* Best for */}
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <div className="flex items-center gap-2 text-xs font-medium text-primary mb-1">
          <Target className="h-3 w-3" />
          Best For
        </div>
        <p className="text-sm">{info.bestFor}</p>
      </div>
    </div>
  );
};
