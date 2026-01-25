import React, { useEffect } from 'react';
import { useComparisonStore } from '@/store/comparisonStore';
import { useSimulatorStore } from '@/store/simulatorStore';
import { ComparisonGridCanvas } from './ComparisonGridCanvas';
import { ComparisonMetrics } from './ComparisonMetrics';
import { ComparisonControls } from './ComparisonControls';
import { algorithmInfo } from '@/lib/algorithms';
import { Columns2 } from 'lucide-react';

export const ComparisonPanel: React.FC = () => {
  const { grid, gridSize } = useSimulatorStore();
  const {
    algorithmA,
    algorithmB,
    baseGrid,
    setBaseGrid,
    isRunning,
    speed,
    stepForward,
  } = useComparisonStore();

  // Sync base grid when comparison mode is enabled
  useEffect(() => {
    if (grid.length > 0) {
      setBaseGrid(grid);
    }
  }, [grid, setBaseGrid]);

  // Auto-step when running
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      stepForward();
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, stepForward]);

  const stepA = algorithmA.steps[algorithmA.currentStep] || null;
  const stepB = algorithmB.steps[algorithmB.currentStep] || null;

  const infoA = algorithmInfo[algorithmA.algorithm];
  const infoB = algorithmInfo[algorithmB.algorithm];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Columns2 className="h-5 w-5" />
        Side-by-Side Comparison
      </div>

      <ComparisonControls />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ComparisonGridCanvas
          step={stepA}
          gridSize={gridSize}
          baseGrid={baseGrid.length > 0 ? baseGrid : grid}
          algorithmColor={infoA.color}
          algorithmName={infoA.name}
        />
        <ComparisonGridCanvas
          step={stepB}
          gridSize={gridSize}
          baseGrid={baseGrid.length > 0 ? baseGrid : grid}
          algorithmColor={infoB.color}
          algorithmName={infoB.name}
        />
      </div>

      <ComparisonMetrics />

      {/* Explanations side by side */}
      {(stepA || stepB) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stepA && (
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                {infoA.shortName} says:
              </div>
              <p className="text-sm">{stepA.explanation}</p>
            </div>
          )}
          {stepB && (
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                {infoB.shortName} says:
              </div>
              <p className="text-sm">{stepB.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
