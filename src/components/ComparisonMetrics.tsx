import React from 'react';
import { useComparisonStore } from '@/store/comparisonStore';
import { algorithmInfo } from '@/lib/algorithms';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ComparisonMetrics: React.FC = () => {
  const { algorithmA, algorithmB } = useComparisonStore();

  const infoA = algorithmInfo[algorithmA.algorithm];
  const infoB = algorithmInfo[algorithmB.algorithm];

  const metrics = [
    {
      label: 'Nodes Explored',
      valueA: algorithmA.metrics.nodesExplored,
      valueB: algorithmB.metrics.nodesExplored,
      lowerIsBetter: true,
    },
    {
      label: 'Path Length',
      valueA: algorithmA.metrics.pathLength,
      valueB: algorithmB.metrics.pathLength,
      lowerIsBetter: true,
    },
    {
      label: 'Steps Taken',
      valueA: algorithmA.metrics.executionSteps,
      valueB: algorithmB.metrics.executionSteps,
      lowerIsBetter: true,
    },
  ];

  const getComparison = (valueA: number, valueB: number, lowerIsBetter: boolean) => {
    if (valueA === 0 && valueB === 0) return 'equal';
    if (valueA === valueB) return 'equal';
    if (lowerIsBetter) {
      return valueA < valueB ? 'a-wins' : 'b-wins';
    }
    return valueA > valueB ? 'a-wins' : 'b-wins';
  };

  const ComparisonIcon = ({ comparison }: { comparison: string }) => {
    if (comparison === 'equal') {
      return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
    if (comparison === 'a-wins') {
      return <TrendingUp className="h-3 w-3 text-primary" />;
    }
    return <TrendingDown className="h-3 w-3 text-destructive" />;
  };

  return (
    <div className="rounded-xl bg-card border border-border p-4">
      <h3 className="font-medium mb-4 text-sm">Efficiency Comparison</h3>
      
      <div className="space-y-3">
        {/* Headers */}
        <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground">
          <div>Metric</div>
          <div className="text-center">
            <Badge variant="outline" className={cn("text-[10px]", infoA.color, "text-white border-0")}>
              {infoA.shortName}
            </Badge>
          </div>
          <div className="text-center">vs</div>
          <div className="text-center">
            <Badge variant="outline" className={cn("text-[10px]", infoB.color, "text-white border-0")}>
              {infoB.shortName}
            </Badge>
          </div>
        </div>

        {/* Metrics rows */}
        {metrics.map((metric) => {
          const comparison = getComparison(metric.valueA, metric.valueB, metric.lowerIsBetter);
          
          return (
            <div key={metric.label} className="grid grid-cols-4 gap-2 items-center text-sm">
              <div className="text-muted-foreground text-xs">{metric.label}</div>
              <div className={cn(
                "text-center font-mono font-medium",
                comparison === 'a-wins' && "text-primary",
                comparison === 'b-wins' && "text-destructive"
              )}>
                {metric.valueA}
              </div>
              <div className="flex justify-center">
                <ComparisonIcon comparison={comparison} />
              </div>
              <div className={cn(
                "text-center font-mono font-medium",
                comparison === 'b-wins' && "text-primary",
                comparison === 'a-wins' && "text-destructive"
              )}>
                {metric.valueB}
              </div>
            </div>
          );
        })}
      </div>

      {/* Winner announcement */}
      {(algorithmA.isComplete || algorithmB.isComplete) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-center">
            {algorithmA.isComplete && algorithmA.metrics.pathLength > 0 && (
              <span className={cn("font-medium", infoA.color.replace('bg-', 'text-'))}>
                {infoA.shortName} found path
              </span>
            )}
            {algorithmA.isComplete && algorithmA.metrics.pathLength === 0 && (
              <span className="text-muted-foreground">
                {infoA.shortName}: No path found
              </span>
            )}
            <span className="mx-2 text-muted-foreground">•</span>
            {algorithmB.isComplete && algorithmB.metrics.pathLength > 0 && (
              <span className={cn("font-medium", infoB.color.replace('bg-', 'text-'))}>
                {infoB.shortName} found path
              </span>
            )}
            {algorithmB.isComplete && algorithmB.metrics.pathLength === 0 && (
              <span className="text-muted-foreground">
                {infoB.shortName}: No path found
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
