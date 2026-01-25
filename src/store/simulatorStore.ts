import { create } from 'zustand';
import { Cell, AlgorithmType, AlgorithmStep, SimulatorState } from '@/types/algorithm';
import { createDemoGrid, cloneGrid, generateRandomMaze } from '@/lib/algorithms/utils';
import { getAlgorithmGenerator } from '@/lib/algorithms';

const DEFAULT_ROWS = 15;
const DEFAULT_COLS = 25;

interface SimulatorStore extends SimulatorState {
  // Actions
  setGridSize: (rows: number, cols: number) => void;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  setCellType: (row: number, col: number, type: 'wall' | 'start' | 'end' | 'empty') => void;
  setDrawMode: (mode: 'wall' | 'start' | 'end' | 'erase') => void;
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
  setSpeed: (speed: number) => void;
  
  // Grid actions
  resetGrid: () => void;
  clearWalls: () => void;
  generateMaze: () => void;
  loadDemoGrid: () => void;
  
  // Algorithm execution
  runAlgorithm: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  
  // Internal
  _generator: Generator<AlgorithmStep> | null;
  _setGenerator: (gen: Generator<AlgorithmStep> | null) => void;
}

export const useSimulatorStore = create<SimulatorStore>((set, get) => ({
  grid: createDemoGrid(DEFAULT_ROWS, DEFAULT_COLS),
  gridSize: { rows: DEFAULT_ROWS, cols: DEFAULT_COLS },
  algorithm: 'bfs',
  isRunning: false,
  isPaused: false,
  speed: 200,
  currentStep: -1,
  steps: [],
  selectedCell: null,
  drawMode: 'wall',
  metrics: {
    nodesExplored: 0,
    pathLength: 0,
    executionSteps: 0,
  },
  _generator: null,

  setGridSize: (rows, cols) => {
    set({
      grid: createDemoGrid(rows, cols),
      gridSize: { rows, cols },
      steps: [],
      currentStep: -1,
      isRunning: false,
      isPaused: false,
    });
  },

  setAlgorithm: (algorithm) => {
    set({ algorithm, steps: [], currentStep: -1, isRunning: false, isPaused: false });
    get().reset();
  },

  setCellType: (row, col, type) => {
    const { grid } = get();
    const newGrid = cloneGrid(grid);
    
    // If setting start or end, remove existing one first
    if (type === 'start' || type === 'end') {
      for (const r of newGrid) {
        for (const cell of r) {
          if (cell.type === type) {
            cell.type = 'empty';
          }
        }
      }
    }
    
    newGrid[row][col].type = type;
    newGrid[row][col].state = 'unvisited';
    set({ grid: newGrid, steps: [], currentStep: -1 });
  },

  setDrawMode: (mode) => set({ drawMode: mode }),

  setSelectedCell: (cell) => set({ selectedCell: cell }),

  setSpeed: (speed) => set({ speed }),

  resetGrid: () => {
    const { gridSize } = get();
    set({
      grid: createDemoGrid(gridSize.rows, gridSize.cols),
      steps: [],
      currentStep: -1,
      isRunning: false,
      isPaused: false,
      metrics: { nodesExplored: 0, pathLength: 0, executionSteps: 0 },
    });
  },

  clearWalls: () => {
    const { grid } = get();
    const newGrid = cloneGrid(grid);
    for (const row of newGrid) {
      for (const cell of row) {
        if (cell.type === 'wall') {
          cell.type = 'empty';
        }
        cell.state = 'unvisited';
      }
    }
    set({ grid: newGrid, steps: [], currentStep: -1 });
  },

  generateMaze: () => {
    const { grid } = get();
    const newGrid = generateRandomMaze(cloneGrid(grid), 0.3);
    set({ grid: newGrid, steps: [], currentStep: -1 });
  },

  loadDemoGrid: () => {
    const { gridSize } = get();
    set({
      grid: createDemoGrid(gridSize.rows, gridSize.cols),
      steps: [],
      currentStep: -1,
      isRunning: false,
      isPaused: false,
    });
  },

  runAlgorithm: () => {
    const { grid, algorithm, steps, currentStep } = get();
    
    // If we have steps and are paused, resume from current position
    if (steps.length > 0 && currentStep >= 0) {
      set({ isRunning: true, isPaused: false });
      return;
    }
    
    // Reset grid states before running
    const cleanGrid = cloneGrid(grid);
    for (const row of cleanGrid) {
      for (const cell of row) {
        cell.state = 'unvisited';
        cell.gCost = Infinity;
        cell.hCost = 0;
        cell.fCost = Infinity;
        cell.parent = null;
      }
    }
    
    const generator = getAlgorithmGenerator(algorithm, cleanGrid);
    const allSteps: AlgorithmStep[] = [];
    
    // Pre-compute all steps
    let result = generator.next();
    while (!result.done) {
      allSteps.push(result.value);
      result = generator.next();
    }
    if (result.value) {
      allSteps.push(result.value);
    }
    
    set({
      steps: allSteps,
      currentStep: 0,
      isRunning: true,
      isPaused: false,
      grid: allSteps[0]?.grid || cleanGrid,
    });
  },

  stepForward: () => {
    const { steps, currentStep, isRunning } = get();
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      const step = steps[nextStep];
      set({
        currentStep: nextStep,
        grid: step.grid,
        metrics: {
          nodesExplored: step.visited.length,
          pathLength: step.path.length > 0 ? step.path.length - 1 : 0,
          executionSteps: nextStep + 1,
        },
        isRunning: !step.isComplete && isRunning,
      });
    } else {
      set({ isRunning: false });
    }
  },

  stepBackward: () => {
    const { steps, currentStep } = get();
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      const step = steps[prevStep];
      set({
        currentStep: prevStep,
        grid: step.grid,
        isPaused: true,
        isRunning: false,
        metrics: {
          nodesExplored: step.visited.length,
          pathLength: step.path.length > 0 ? step.path.length - 1 : 0,
          executionSteps: prevStep + 1,
        },
      });
    }
  },

  pause: () => set({ isPaused: true, isRunning: false }),

  resume: () => set({ isPaused: false, isRunning: true }),

  reset: () => {
    const { grid } = get();
    const cleanGrid = cloneGrid(grid);
    for (const row of cleanGrid) {
      for (const cell of row) {
        cell.state = 'unvisited';
        cell.gCost = Infinity;
        cell.hCost = 0;
        cell.fCost = Infinity;
        cell.parent = null;
      }
    }
    set({
      grid: cleanGrid,
      steps: [],
      currentStep: -1,
      isRunning: false,
      isPaused: false,
      selectedCell: null,
      metrics: { nodesExplored: 0, pathLength: 0, executionSteps: 0 },
    });
  },

  _setGenerator: (gen) => set({ _generator: gen }),
}));
