import React from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { cn } from '@/lib/utils';
import { Database, Layers, ArrowRight } from 'lucide-react';

export const DataStructureViewer: React.FC = () => {
  const { steps, currentStep } = useSimulatorStore();

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;
  const dataStructure = currentStepData?.dataStructure;

  if (!dataStructure) {
    return (
      <div className="rounded-lg bg-secondary/50 p-4 text-center">
        <Database className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Run the algorithm to see the data structure
        </p>
      </div>
    );
  }

  const getTypeLabel = () => {
    switch (dataStructure.type) {
      case 'queue':
        return { label: 'Queue (FIFO)', color: 'text-cyan-500' };
      case 'stack':
        return { label: 'Stack (LIFO)', color: 'text-purple-500' };
      case 'priority-queue':
        return { label: 'Priority Queue', color: 'text-amber-500' };
    }
  };

  const typeInfo = getTypeLabel();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className={cn("h-4 w-4", typeInfo.color)} />
          <span className={cn("text-sm font-medium", typeInfo.color)}>
            {typeInfo.label}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {dataStructure.items.length} items
        </span>
      </div>

      <div className="relative">
        {/* Visual representation */}
        <div className={cn(
          "flex gap-1 overflow-x-auto pb-2",
          dataStructure.type === 'stack' && "flex-col-reverse items-start"
        )}>
          {dataStructure.items.length === 0 ? (
            <div className="text-xs text-muted-foreground italic">Empty</div>
          ) : (
            dataStructure.items.slice(0, 10).map((item, index) => (
              <div
                key={`${item.row}-${item.col}-${index}`}
                className={cn(
                  "flex-shrink-0 px-2 py-1 rounded text-xs font-mono",
                  "bg-card border border-border shadow-sm",
                  "animate-fade-in",
                  index === 0 && dataStructure.type !== 'stack' && "ring-2 ring-primary",
                  index === dataStructure.items.length - 1 && dataStructure.type === 'stack' && "ring-2 ring-primary"
                )}
              >
                <div className="font-semibold">
                  ({item.row},{item.col})
                </div>
                {item.priority !== undefined && (
                  <div className="text-muted-foreground text-[10px]">
                    p={item.priority}
                  </div>
                )}
                {item.fCost !== undefined && (
                  <div className="text-muted-foreground text-[10px]">
                    f={item.fCost}
                  </div>
                )}
              </div>
            ))
          )}
          {dataStructure.items.length > 10 && (
            <div className="flex-shrink-0 px-2 py-1 text-xs text-muted-foreground">
              +{dataStructure.items.length - 10} more
            </div>
          )}
        </div>

        {/* Direction indicator */}
        {dataStructure.items.length > 0 && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            {dataStructure.type === 'queue' && (
              <>
                <span>Front</span>
                <ArrowRight className="h-3 w-3" />
                <span>Back</span>
              </>
            )}
            {dataStructure.type === 'stack' && (
              <>
                <span>Top ↑ (next to pop)</span>
              </>
            )}
            {dataStructure.type === 'priority-queue' && (
              <>
                <span>Min priority</span>
                <ArrowRight className="h-3 w-3" />
                <span>Max priority</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
