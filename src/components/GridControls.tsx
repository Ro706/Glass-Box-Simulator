import React from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Square, 
  Circle, 
  Flag, 
  Eraser, 
  Shuffle, 
  Trash2,
  RotateCcw
} from 'lucide-react';

const drawModes = [
  { id: 'wall' as const, label: 'Wall', icon: Square, color: 'bg-cell-wall' },
  { id: 'start' as const, label: 'Start', icon: Circle, color: 'bg-cell-start' },
  { id: 'end' as const, label: 'End', icon: Flag, color: 'bg-cell-end' },
  { id: 'erase' as const, label: 'Erase', icon: Eraser, color: 'bg-secondary' },
];

export const GridControls: React.FC = () => {
  const {
    drawMode,
    setDrawMode,
    clearWalls,
    generateMaze,
    resetGrid,
    isRunning,
  } = useSimulatorStore();

  return (
    <div className="space-y-4">
      {/* Draw mode selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Draw Mode</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {drawModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = drawMode === mode.id;

            return (
              <Button
                key={mode.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setDrawMode(mode.id)}
                disabled={isRunning}
                className={cn(
                  "gap-2 justify-start w-full",
                  isSelected && "ring-2 ring-ring ring-offset-2"
                )}
              >
                <div className={cn("w-3 h-3 rounded-sm shrink-0", mode.color)} />
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{mode.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Grid actions */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Grid Actions</label>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateMaze}
            disabled={isRunning}
            className="gap-2 justify-start"
          >
            <Shuffle className="h-4 w-4 shrink-0" />
            <span className="truncate">Random Maze</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearWalls}
            disabled={isRunning}
            className="gap-2 justify-start"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            <span className="truncate">Clear Walls</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetGrid}
            disabled={isRunning}
            className="gap-2 justify-start"
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            <span className="truncate">Reset Grid</span>
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Legend</label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cell-start" />
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cell-end" />
            <span>End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cell-wall" />
            <span>Wall</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cell-frontier" />
            <span>Frontier</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cell-visited" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cell-current" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <div className="w-4 h-4 rounded bg-cell-path" />
            <span>Path</span>
          </div>
        </div>
      </div>
    </div>
  );
};
