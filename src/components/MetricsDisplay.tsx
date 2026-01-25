import React from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { cn } from '@/lib/utils';
import { Search, Route, Footprints, Clock } from 'lucide-react';

export const MetricsDisplay: React.FC = () => {
  const { metrics, steps, currentStep } = useSimulatorStore();

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

  const metricsData = [
    {
      label: 'Nodes Explored',
      value: metrics.nodesExplored,
      icon: Search,
      color: 'text-purple-500',
    },
    {
      label: 'Path Length',
      value: metrics.pathLength > 0 ? metrics.pathLength : '-',
      icon: Route,
      color: 'text-emerald-500',
    },
    {
      label: 'Steps Taken',
      value: metrics.executionSteps,
      icon: Footprints,
      color: 'text-cyan-500',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {metricsData.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="rounded-lg bg-card border border-border p-3 text-center"
          >
            <Icon className={cn("h-5 w-5 mx-auto mb-1", metric.color)} />
            <div className="text-2xl font-bold font-mono">
              {metric.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {metric.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
