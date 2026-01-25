export type CellType = 'empty' | 'wall' | 'start' | 'end';
export type CellState = 'unvisited' | 'frontier' | 'visited' | 'current' | 'path';

export interface Cell {
  row: number;
  col: number;
  type: CellType;
  state: CellState;
  gCost: number; // Distance from start
  hCost: number; // Heuristic distance to end
  fCost: number; // gCost + hCost
  parent: { row: number; col: number } | null;
}

export type AlgorithmType = 'bfs' | 'dfs' | 'dijkstra' | 'astar';

export interface AlgorithmStep {
  grid: Cell[][];
  currentNode: { row: number; col: number } | null;
  frontier: { row: number; col: number }[];
  visited: { row: number; col: number }[];
  path: { row: number; col: number }[];
  explanation: string;
  dataStructure: DataStructureState;
  isComplete: boolean;
  foundPath: boolean;
}

export interface DataStructureState {
  type: 'queue' | 'stack' | 'priority-queue';
  items: DataStructureItem[];
}

export interface DataStructureItem {
  row: number;
  col: number;
  priority?: number;
  gCost?: number;
  hCost?: number;
  fCost?: number;
}

export interface AlgorithmInfo {
  name: string;
  shortName: string;
  description: string;
  dataStructure: string;
  timeComplexity: string;
  spaceComplexity: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string;
  color: string;
}

export interface SimulatorState {
  grid: Cell[][];
  gridSize: { rows: number; cols: number };
  algorithm: AlgorithmType;
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  currentStep: number;
  steps: AlgorithmStep[];
  selectedCell: { row: number; col: number } | null;
  drawMode: 'wall' | 'start' | 'end' | 'erase';
  metrics: {
    nodesExplored: number;
    pathLength: number;
    executionSteps: number;
  };
}
