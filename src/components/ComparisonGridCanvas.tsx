import React, { useRef, useEffect } from 'react';
import { Cell, CellState, CellType, AlgorithmStep } from '@/types/algorithm';
import { cn } from '@/lib/utils';

const CELL_SIZE = 20;
const CELL_GAP = 1;

const getCellColor = (type: CellType, state: CellState): string => {
  if (type === 'start') return 'hsl(145, 70%, 45%)';
  if (type === 'end') return 'hsl(350, 85%, 55%)';
  if (type === 'wall') return 'hsl(220, 20%, 25%)';
  
  switch (state) {
    case 'current':
      return 'hsl(40, 95%, 55%)';
    case 'frontier':
      return 'hsl(190, 95%, 50%)';
    case 'visited':
      return 'hsl(260, 70%, 60%)';
    case 'path':
      return 'hsl(145, 80%, 50%)';
    default:
      return 'hsl(220, 20%, 98%)';
  }
};

interface ComparisonGridCanvasProps {
  step: AlgorithmStep | null;
  gridSize: { rows: number; cols: number };
  baseGrid: Cell[][];
  algorithmColor: string;
  algorithmName: string;
}

export const ComparisonGridCanvas: React.FC<ComparisonGridCanvasProps> = ({
  step,
  gridSize,
  baseGrid,
  algorithmColor,
  algorithmName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = gridSize.cols * (CELL_SIZE + CELL_GAP) - CELL_GAP;
  const height = gridSize.rows * (CELL_SIZE + CELL_GAP) - CELL_GAP;

  const grid = step?.grid || baseGrid;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || grid.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        const cell = grid[row]?.[col];
        if (!cell) continue;
        
        const x = col * (CELL_SIZE + CELL_GAP);
        const y = row * (CELL_SIZE + CELL_GAP);

        ctx.fillStyle = getCellColor(cell.type, cell.state);
        ctx.beginPath();
        ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, 3);
        ctx.fill();

        if (cell.type === 'start') {
          ctx.fillStyle = 'white';
          ctx.font = 'bold 10px Inter';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        } else if (cell.type === 'end') {
          ctx.fillStyle = 'white';
          ctx.font = 'bold 10px Inter';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('E', x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        }
      }
    }
  }, [grid, gridSize]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white",
        algorithmColor
      )}>
        {algorithmName}
      </div>
      <div className="rounded-lg bg-card p-2 border border-border overflow-auto">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            width: width,
            height: height,
            imageRendering: 'crisp-edges',
          }}
        />
      </div>
    </div>
  );
};
