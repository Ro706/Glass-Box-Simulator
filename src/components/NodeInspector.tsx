import React from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { cn } from '@/lib/utils';
import { MapPin, ArrowUp, Calculator, Target } from 'lucide-react';

export const NodeInspector: React.FC = () => {
  const { grid, selectedCell, steps, currentStep } = useSimulatorStore();

  if (!selectedCell) {
    return (
      <div className="rounded-lg bg-secondary/50 p-4 text-center">
        <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Click on a cell to inspect its properties
        </p>
      </div>
    );
  }

  const cell = grid[selectedCell.row][selectedCell.col];
  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

  const getStateLabel = () => {
    switch (cell.state) {
      case 'unvisited': return { label: 'Unvisited', color: 'bg-secondary' };
      case 'frontier': return { label: 'In Frontier', color: 'bg-cell-frontier' };
      case 'visited': return { label: 'Visited', color: 'bg-cell-visited' };
      case 'current': return { label: 'Current', color: 'bg-cell-current' };
      case 'path': return { label: 'On Path', color: 'bg-cell-path' };
    }
  };

  const getTypeLabel = () => {
    switch (cell.type) {
      case 'empty': return 'Empty';
      case 'wall': return 'Wall';
      case 'start': return 'Start Node';
      case 'end': return 'End Node';
    }
  };

  const stateInfo = getStateLabel();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">
            Cell ({selectedCell.row}, {selectedCell.col})
          </span>
        </div>
        <div className={cn(
          "px-2 py-1 rounded text-xs font-medium text-white",
          stateInfo.color
        )}>
          {stateInfo.label}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-muted-foreground text-xs">Type</div>
          <div className="font-medium">{getTypeLabel()}</div>
        </div>

        {cell.type !== 'wall' && cell.state !== 'unvisited' && (
          <>
            <div className="space-y-1">
              <div className="text-muted-foreground text-xs flex items-center gap-1">
                <Calculator className="h-3 w-3" />
                g (cost from start)
              </div>
              <div className="font-mono font-medium">
                {cell.gCost === Infinity ? '∞' : cell.gCost}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-muted-foreground text-xs flex items-center gap-1">
                <Target className="h-3 w-3" />
                h (heuristic to goal)
              </div>
              <div className="font-mono font-medium">{cell.hCost}</div>
            </div>

            <div className="space-y-1">
              <div className="text-muted-foreground text-xs">f (total: g + h)</div>
              <div className="font-mono font-medium">
                {cell.fCost === Infinity ? '∞' : cell.fCost}
              </div>
            </div>

            {cell.parent && (
              <div className="col-span-2 space-y-1">
                <div className="text-muted-foreground text-xs flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  Parent Node
                </div>
                <div className="font-mono font-medium">
                  ({cell.parent.row}, {cell.parent.col})
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Why this node explanation */}
      {currentStepData?.currentNode?.row === selectedCell.row &&
        currentStepData?.currentNode?.col === selectedCell.col && (
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="text-xs font-medium text-primary mb-1">
            Why this node?
          </div>
          <p className="text-xs text-muted-foreground">
            This node was selected because it had the highest priority in the data structure
            at this step of the algorithm.
          </p>
        </div>
      )}
    </div>
  );
};
