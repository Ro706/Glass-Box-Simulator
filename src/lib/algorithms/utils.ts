import { Cell, CellType } from '@/types/algorithm';

export function createGrid(rows: number, cols: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      grid[row][col] = createCell(row, col);
    }
  }
  return grid;
}

export function createCell(row: number, col: number, type: CellType = 'empty'): Cell {
  return {
    row,
    col,
    type,
    state: 'unvisited',
    gCost: Infinity,
    hCost: 0,
    fCost: Infinity,
    parent: null,
  };
}

export function cloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

export function getNeighbors(grid: Cell[][], row: number, col: number): Cell[] {
  const neighbors: Cell[] = [];
  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      grid[newRow][newCol].type !== 'wall'
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
}

export function manhattanDistance(
  row1: number,
  col1: number,
  row2: number,
  col2: number
): number {
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
}

export function findCell(grid: Cell[][], type: CellType): Cell | null {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.type === type) {
        return cell;
      }
    }
  }
  return null;
}

export function reconstructPath(
  grid: Cell[][],
  endCell: Cell
): { row: number; col: number }[] {
  const path: { row: number; col: number }[] = [];
  let current: Cell | null = endCell;

  while (current) {
    path.unshift({ row: current.row, col: current.col });
    if (current.parent) {
      current = grid[current.parent.row][current.parent.col];
    } else {
      break;
    }
  }

  return path;
}

export function generateRandomMaze(grid: Cell[][], density: number = 0.3): Cell[][] {
  const newGrid = cloneGrid(grid);
  const startCell = findCell(newGrid, 'start');
  const endCell = findCell(newGrid, 'end');

  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[0].length; col++) {
      const cell = newGrid[row][col];
      if (cell.type === 'empty' && Math.random() < density) {
        // Don't block start or end neighbors
        const isNearStart = startCell && manhattanDistance(row, col, startCell.row, startCell.col) <= 1;
        const isNearEnd = endCell && manhattanDistance(row, col, endCell.row, endCell.col) <= 1;
        if (!isNearStart && !isNearEnd) {
          newGrid[row][col].type = 'wall';
        }
      }
    }
  }

  return newGrid;
}

export function createDemoGrid(rows: number, cols: number): Cell[][] {
  const grid = createGrid(rows, cols);
  
  // Set start and end
  grid[Math.floor(rows / 2)][2].type = 'start';
  grid[Math.floor(rows / 2)][cols - 3].type = 'end';

  // Create an interesting maze pattern
  const wallPatterns = [
    // Vertical wall with gap
    ...Array.from({ length: Math.floor(rows * 0.6) }, (_, i) => ({
      row: Math.floor(rows * 0.2) + i,
      col: Math.floor(cols * 0.35),
    })),
    // Another vertical wall
    ...Array.from({ length: Math.floor(rows * 0.6) }, (_, i) => ({
      row: Math.floor(rows * 0.2) + i,
      col: Math.floor(cols * 0.65),
    })),
    // Horizontal sections
    ...Array.from({ length: Math.floor(cols * 0.2) }, (_, i) => ({
      row: Math.floor(rows * 0.3),
      col: Math.floor(cols * 0.4) + i,
    })),
    ...Array.from({ length: Math.floor(cols * 0.2) }, (_, i) => ({
      row: Math.floor(rows * 0.7),
      col: Math.floor(cols * 0.4) + i,
    })),
  ];

  // Leave gaps in walls
  const gapIndices = new Set([
    Math.floor(rows * 0.35),
    Math.floor(rows * 0.55),
    Math.floor(rows * 0.75),
  ]);

  for (const { row, col } of wallPatterns) {
    if (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      grid[row][col].type === 'empty' &&
      !gapIndices.has(row)
    ) {
      grid[row][col].type = 'wall';
    }
  }

  return grid;
}
