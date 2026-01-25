import { AlgorithmStep, AlgorithmType } from '@/types/algorithm';

export type TutorIntent =
  | 'step-reasoning'
  | 'next-step'
  | 'behavior'
  | 'comparison'
  | 'mistakes';

export interface TutorContext {
  algorithm: AlgorithmType;
  stepIndex: number;
  step: AlgorithmStep | null;
  isRunning: boolean;
  isPaused: boolean;
}

export interface TutorAnswer {
  intent: TutorIntent | 'fallback';
  title: string;
  body: string;
  extra?: string[];
}

const mistakesByAlgorithm: Record<AlgorithmType, string[]> = {
  bfs: [
    'Forgetting to mark nodes as visited immediately when enqueuing, causing duplicates.',
    'Using a stack instead of a queue—BFS must explore level by level.',
    'Assuming BFS works on weighted graphs for optimal paths—it does not when weights exist.',
  ],
  dfs: [
    'Not handling cycles, which can cause infinite loops.',
    'Expecting DFS to return the shortest path—it only returns a path.',
    'Stack overflow in recursive implementations on deep graphs.',
  ],
  dijkstra: [
    'Using negative edge weights—Dijkstra requires non-negative weights.',
    'Not updating priority when a shorter path is found (decrease-key behavior).',
    'Stopping early without confirming the extracted node is the goal with the minimal distance.',
  ],
  astar: [
    'Using a heuristic that overestimates distance—breaks optimality guarantees.',
    'Not keeping g/f scores updated when a better path is discovered.',
    'Treating A* as purely greedy and ignoring g-cost, which can miss optimal paths.',
  ],
};

const behaviorSnippets: Record<AlgorithmType, string> = {
  bfs: 'BFS explores in widening circles (levels). It guarantees the shortest path in unweighted grids because it visits nodes in order of distance from the start.',
  dfs: 'DFS dives deep along one path before backtracking. It is fast and memory-light but does not guarantee the shortest path.',
  dijkstra: "Dijkstra always expands the node with the smallest known distance from start. It's optimal on non-negative weighted graphs but explores broadly.",
  astar: 'A* uses f = g + h. It balances actual cost (g) with heuristic (h) to focus the search toward the goal while keeping optimality (with admissible h).',
};

const comparisonSnippets: Record<AlgorithmType, string> = {
  bfs: 'Compared to DFS, BFS stays shallow and guarantees shortest unweighted paths. Compared to Dijkstra/A*, it is simpler but ignores weights and heuristics.',
  dfs: 'Compared to BFS, DFS may find a path faster but not the shortest. Compared to Dijkstra/A*, DFS ignores weights/heuristics and can wander deep.',
  dijkstra: 'Compared to BFS, Dijkstra handles weights optimally. Compared to A*, it can be slower because it lacks a heuristic to guide the search.',
  astar: 'Compared to Dijkstra, A* uses a heuristic to expand promising nodes first, usually faster. Compared to BFS/DFS, it handles weights and directionality.',
};

const intentKeywords: Record<TutorIntent, string[]> = {
  'step-reasoning': ['why', 'selected', 'choose', 'chose'],
  'next-step': ['next', 'predict', 'will happen', 'expand'],
  behavior: ['why is', 'better', 'optimal', 'path'],
  comparison: ['different', 'faster', 'compare', 'versus', 'vs'],
  mistakes: ['mistake', 'common', 'error', 'pitfall'],
};

export const suggestedQuestions = (
  algorithm: AlgorithmType,
): { label: string; question: string }[] => [
  { label: 'Step reasoning', question: 'Why was this node selected?' },
  { label: 'Next step', question: 'Which node will be expanded next?' },
  { label: 'Optimality', question: 'Is the current path optimal?' },
  { label: 'Comparison', question: 'How would another algorithm behave differently?' },
  { label: 'Mistakes', question: 'What mistakes do students make here?' },
  { label: 'Unchosen node', question: "Why didn't the algorithm choose that neighbor?" },
  { label: 'Frontier order', question: 'How is the frontier ordered right now?' },
  { label: 'Stop condition', question: 'When will the search stop?' },
  { label: 'State change', question: 'What happens if I add or remove a wall now?' },
  { label: 'Visited rule', question: 'When is a node marked visited versus frontier?' },
  algorithm === 'astar'
    ? { label: 'Heuristic', question: 'How is the heuristic guiding the search now?' }
    : { label: 'Priority', question: 'Why is this item at the front of the data structure?' },
];

export function detectIntent(question: string): TutorIntent | null {
  const q = question.toLowerCase();
  for (const intent of Object.keys(intentKeywords) as TutorIntent[]) {
    if (intentKeywords[intent].some((kw) => q.includes(kw))) {
      return intent;
    }
  }
  return null;
}

function describeDataStructure(step: AlgorithmStep | null): string {
  if (!step) return 'No data structure state yet—run the algorithm to generate steps.';
  const ds = step.dataStructure;
  if (!ds || !ds.items) return 'No data structure items available.';
  if (ds.items.length === 0) return `${ds.type} is empty right now.`;
  const head = ds.items[0];
  switch (ds.type) {
    case 'queue':
      return `Front of queue is (${head.row},${head.col}) with g=${head.gCost ?? 'n/a'}.`;
    case 'stack':
      return `Top of stack is (${head.row},${head.col}) with g=${head.gCost ?? 'n/a'}.`;
    case 'priority-queue':
      return `Min-priority item is (${head.row},${head.col}) with f=${head.fCost ?? head.priority ?? 'n/a'}.`;
    default:
      return 'Data structure state unavailable.';
  }
}

function nextNodeHint(step: AlgorithmStep | null): string {
  if (!step || !step.dataStructure.items.length) return 'The frontier is empty; the algorithm may be complete or blocked.';
  const head = step.dataStructure.items[0];
  const label = step.dataStructure.type === 'stack' ? 'top' : 'front';
  return `Likely next expansion: (${head.row},${head.col}) from the ${label} of the ${step.dataStructure.type}.`;
}

export function generateAnswer(intent: TutorIntent, ctx: TutorContext): TutorAnswer {
  const { algorithm, step, stepIndex, isRunning, isPaused } = ctx;

  if (!step) {
    return {
      intent,
      title: 'Run the algorithm first',
      body: 'Start the algorithm to generate steps. I need the current step to explain decisions.',
    };
  }

  const dsNote = describeDataStructure(step);
  const currentNode = step.currentNode
    ? `Current node: (${step.currentNode.row},${step.currentNode.col}).`
    : 'Current node not set yet.';

  switch (intent) {
    case 'step-reasoning': {
      return {
        intent,
        title: 'Why this node?',
        body: `${currentNode} ${dsNote} The algorithm chooses from the frontier using its data structure (${step.dataStructure.type}).`,
        extra: ['Nodes already visited are skipped.', 'Frontier order is dictated by the data structure (queue/stack/priority).'],
      };
    }
    case 'next-step': {
      return {
        intent,
        title: 'Next step prediction',
        body: `${nextNodeHint(step)} Frontier size: ${step.dataStructure.items.length}. Visited: ${step.visited.length}.`,
        extra: isPaused
          ? ['Resume to see the next expansion.']
          : isRunning
          ? ['Let it run to watch the expansion.']
          : ['Press Run to continue stepping.'],
      };
    }
    case 'behavior': {
      return {
        intent,
        title: 'Algorithm behavior',
        body: behaviorSnippets[algorithm],
        extra: [currentNode, dsNote],
      };
    }
    case 'comparison': {
      return {
        intent,
        title: 'Comparison insight',
        body: comparisonSnippets[algorithm],
        extra: ['Different data structures change the exploration order.', 'Heuristics (A*) can reduce exploration vs Dijkstra.'],
      };
    }
    case 'mistakes': {
      return {
        intent,
        title: 'Common mistakes',
        body: 'Watch out for these frequent errors:',
        extra: mistakesByAlgorithm[algorithm],
      };
    }
    default:
      return {
        intent: 'fallback',
        title: 'Not sure',
        body: 'I can answer about the current step, next step, behavior, comparisons, or common mistakes.',
      };
  }
}
