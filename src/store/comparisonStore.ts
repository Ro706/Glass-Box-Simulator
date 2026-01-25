import { create } from 'zustand';
import { Cell, AlgorithmType, AlgorithmStep } from '@/types/algorithm';
import { cloneGrid } from '@/lib/algorithms/utils';
import { getAlgorithmGenerator } from '@/lib/algorithms';

interface ComparisonMetrics {
  nodesExplored: number;
  pathLength: number;
  executionSteps: number;
}

interface AlgorithmRun {
  algorithm: AlgorithmType;
  steps: AlgorithmStep[];
  currentStep: number;
  metrics: ComparisonMetrics;
  isComplete: boolean;
}

interface ComparisonState {
  isComparisonMode: boolean;
  baseGrid: Cell[][];
  algorithmA: AlgorithmRun;
  algorithmB: AlgorithmRun;
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
}

interface ComparisonStore extends ComparisonState {
  setComparisonMode: (enabled: boolean) => void;
  setAlgorithmA: (algorithm: AlgorithmType) => void;
  setAlgorithmB: (algorithm: AlgorithmType) => void;
  setBaseGrid: (grid: Cell[][]) => void;
  setSpeed: (speed: number) => void;
  
  runComparison: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

const createEmptyRun = (algorithm: AlgorithmType): AlgorithmRun => ({
  algorithm,
  steps: [],
  currentStep: -1,
  metrics: { nodesExplored: 0, pathLength: 0, executionSteps: 0 },
  isComplete: false,
});

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  isComparisonMode: false,
  baseGrid: [],
  algorithmA: createEmptyRun('bfs'),
  algorithmB: createEmptyRun('astar'),
  isRunning: false,
  isPaused: false,
  speed: 200,

  setComparisonMode: (enabled) => {
    set({ isComparisonMode: enabled });
    if (!enabled) {
      get().reset();
    }
  },

  setAlgorithmA: (algorithm) => {
    set({ algorithmA: createEmptyRun(algorithm) });
  },

  setAlgorithmB: (algorithm) => {
    set({ algorithmB: createEmptyRun(algorithm) });
  },

  setBaseGrid: (grid) => {
    set({ baseGrid: cloneGrid(grid) });
  },

  setSpeed: (speed) => set({ speed }),

  runComparison: () => {
    const { baseGrid, algorithmA, algorithmB } = get();
    
    if (baseGrid.length === 0) return;

    // Prepare grids for both algorithms
    const prepareGrid = (grid: Cell[][]): Cell[][] => {
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
      return cleanGrid;
    };

    const gridA = prepareGrid(baseGrid);
    const gridB = prepareGrid(baseGrid);

    // Generate steps for algorithm A
    const genA = getAlgorithmGenerator(algorithmA.algorithm, gridA);
    const stepsA: AlgorithmStep[] = [];
    let resultA = genA.next();
    while (!resultA.done) {
      stepsA.push(resultA.value);
      resultA = genA.next();
    }
    if (resultA.value) stepsA.push(resultA.value);

    // Generate steps for algorithm B
    const genB = getAlgorithmGenerator(algorithmB.algorithm, gridB);
    const stepsB: AlgorithmStep[] = [];
    let resultB = genB.next();
    while (!resultB.done) {
      stepsB.push(resultB.value);
      resultB = genB.next();
    }
    if (resultB.value) stepsB.push(resultB.value);

    set({
      algorithmA: {
        ...algorithmA,
        steps: stepsA,
        currentStep: 0,
        isComplete: false,
        metrics: { nodesExplored: 0, pathLength: 0, executionSteps: 0 },
      },
      algorithmB: {
        ...algorithmB,
        steps: stepsB,
        currentStep: 0,
        isComplete: false,
        metrics: { nodesExplored: 0, pathLength: 0, executionSteps: 0 },
      },
      isRunning: true,
      isPaused: false,
    });
  },

  stepForward: () => {
    const { algorithmA, algorithmB, isRunning } = get();
    
    let newA = { ...algorithmA };
    let newB = { ...algorithmB };
    let bothComplete = true;

    // Step algorithm A
    if (newA.currentStep < newA.steps.length - 1) {
      const nextStep = newA.currentStep + 1;
      const step = newA.steps[nextStep];
      newA = {
        ...newA,
        currentStep: nextStep,
        metrics: {
          nodesExplored: step.visited.length,
          pathLength: step.path.length > 0 ? step.path.length - 1 : 0,
          executionSteps: nextStep + 1,
        },
        isComplete: step.isComplete,
      };
      if (!step.isComplete) bothComplete = false;
    }

    // Step algorithm B
    if (newB.currentStep < newB.steps.length - 1) {
      const nextStep = newB.currentStep + 1;
      const step = newB.steps[nextStep];
      newB = {
        ...newB,
        currentStep: nextStep,
        metrics: {
          nodesExplored: step.visited.length,
          pathLength: step.path.length > 0 ? step.path.length - 1 : 0,
          executionSteps: nextStep + 1,
        },
        isComplete: step.isComplete,
      };
      if (!step.isComplete) bothComplete = false;
    }

    set({
      algorithmA: newA,
      algorithmB: newB,
      isRunning: !bothComplete && isRunning,
    });
  },

  stepBackward: () => {
    const { algorithmA, algorithmB } = get();
    
    let newA = { ...algorithmA };
    let newB = { ...algorithmB };

    // Step algorithm A backward
    if (newA.currentStep > 0) {
      const prevStep = newA.currentStep - 1;
      const step = newA.steps[prevStep];
      newA = {
        ...newA,
        currentStep: prevStep,
        metrics: {
          nodesExplored: step.visited.length,
          pathLength: step.path.length > 0 ? step.path.length - 1 : 0,
          executionSteps: prevStep + 1,
        },
        isComplete: false,
      };
    }

    // Step algorithm B backward
    if (newB.currentStep > 0) {
      const prevStep = newB.currentStep - 1;
      const step = newB.steps[prevStep];
      newB = {
        ...newB,
        currentStep: prevStep,
        metrics: {
          nodesExplored: step.visited.length,
          pathLength: step.path.length > 0 ? step.path.length - 1 : 0,
          executionSteps: prevStep + 1,
        },
        isComplete: false,
      };
    }

    set({
      algorithmA: newA,
      algorithmB: newB,
      isRunning: false,
      isPaused: true,
    });
  },

  pause: () => set({ isPaused: true, isRunning: false }),

  resume: () => set({ isPaused: false, isRunning: true }),

  reset: () => {
    const { algorithmA, algorithmB } = get();
    set({
      algorithmA: createEmptyRun(algorithmA.algorithm),
      algorithmB: createEmptyRun(algorithmB.algorithm),
      isRunning: false,
      isPaused: false,
    });
  },
}));
