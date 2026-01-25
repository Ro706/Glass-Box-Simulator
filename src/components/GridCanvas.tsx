import React, { useRef, useEffect, useCallback } from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { Cell, CellState, CellType } from '@/types/algorithm';
import { cn } from '@/lib/utils';

const CELL_SIZE = 28;
const CELL_GAP = 2;

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

const getCellBorderColor = (type: CellType, state: CellState): string => {
  if (type === 'start') return 'hsl(145, 70%, 35%)';
  if (type === 'end') return 'hsl(350, 85%, 45%)';
  if (type === 'wall') return 'hsl(220, 20%, 15%)';
  
  switch (state) {
    case 'current':
      return 'hsl(40, 95%, 45%)';
    case 'frontier':
      return 'hsl(190, 95%, 40%)';
    case 'visited':
      return 'hsl(260, 70%, 50%)';
    case 'path':
      return 'hsl(145, 80%, 40%)';
    default:
      return 'hsl(220, 15%, 88%)';
  }
};

export const GridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  
  const {
    grid,
    gridSize,
    drawMode,
    setCellType,
    setSelectedCell,
    selectedCell,
    isRunning,
  } = useSimulatorStore();

  const width = gridSize.cols * (CELL_SIZE + CELL_GAP) - CELL_GAP;
  const height = gridSize.rows * (CELL_SIZE + CELL_GAP) - CELL_GAP;

  const getCellFromPosition = useCallback((clientX: number, clientY: number): { row: number; col: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));
    
    if (row >= 0 && row < gridSize.rows && col >= 0 && col < gridSize.cols) {
      return { row, col };
    }
    return null;
  }, [gridSize]);

  const handleCellAction = useCallback((row: number, col: number) => {
    if (isRunning) return;
    
    const cell = grid[row][col];
    
    if (drawMode === 'start' && cell.type !== 'end') {
      setCellType(row, col, 'start');
    } else if (drawMode === 'end' && cell.type !== 'start') {
      setCellType(row, col, 'end');
    } else if (drawMode === 'wall' && cell.type !== 'start' && cell.type !== 'end') {
      setCellType(row, col, 'wall');
    } else if (drawMode === 'erase' && cell.type !== 'start' && cell.type !== 'end') {
      setCellType(row, col, 'empty');
    }
  }, [drawMode, grid, setCellType, isRunning]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const cell = getCellFromPosition(e.clientX, e.clientY);
    if (cell) {
      isDrawingRef.current = true;
      handleCellAction(cell.row, cell.col);
    }
  }, [getCellFromPosition, handleCellAction]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    
    const cell = getCellFromPosition(e.clientX, e.clientY);
    if (cell && (drawMode === 'wall' || drawMode === 'erase')) {
      handleCellAction(cell.row, cell.col);
    }
  }, [getCellFromPosition, handleCellAction, drawMode]);

  const handleMouseUp = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const cell = getCellFromPosition(e.clientX, e.clientY);
    if (cell) {
      setSelectedCell(cell);
    }
  }, [getCellFromPosition, setSelectedCell]);

  // Draw the grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cells
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        const cell = grid[row][col];
        const x = col * (CELL_SIZE + CELL_GAP);
        const y = row * (CELL_SIZE + CELL_GAP);

        // Cell background
        ctx.fillStyle = getCellColor(cell.type, cell.state);
        ctx.beginPath();
        ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, 4);
        ctx.fill();

        // Cell border
        ctx.strokeStyle = getCellBorderColor(cell.type, cell.state);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Selected cell highlight
        if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
          ctx.strokeStyle = 'hsl(220, 90%, 50%)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Draw icons for start/end
        if (cell.type === 'start') {
          ctx.fillStyle = 'white';
          ctx.font = 'bold 14px Inter';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        } else if (cell.type === 'end') {
          ctx.fillStyle = 'white';
          ctx.font = 'bold 14px Inter';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('E', x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        }

        // Show costs for A* (when cell has been calculated)
        if (cell.state !== 'unvisited' && cell.fCost !== Infinity && cell.type === 'empty') {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.font = '8px JetBrains Mono';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${cell.fCost}`, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        }
      }
    }
  }, [grid, gridSize, selectedCell]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-auto rounded-xl bg-card p-4 shadow-lg border border-border",
        "max-h-[calc(100vh-200px)]"
      )}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        style={{ 
          width: width, 
          height: height,
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
};
