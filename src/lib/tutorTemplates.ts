import { AlgorithmStep, AlgorithmType } from '@/types/algorithm';

export type TutorIntent =
  | 'step-reasoning'
  | 'next-step'
  | 'behavior'
  | 'comparison'
  | 'mistakes'
  | 'frontier-state'
  | 'stop-condition'
  | 'heuristics'
  | 'visited-rules'
  | 'wall-interaction';

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
  'step-reasoning': ['why', 'selected', 'choose', 'chose', 'neighbor', 'reason'],
  'next-step': ['next', 'predict', 'will happen', 'expand'],
  behavior: ['why is', 'better', 'optimal', 'path', 'guarantee'],
  comparison: ['different', 'faster', 'compare', 'versus', 'vs'],
  mistakes: ['mistake', 'common', 'error', 'pitfall'],
  'frontier-state': ['frontier', 'order', 'data structure', 'queue', 'stack', 'priority'],
  'stop-condition': ['stop', 'finish', 'end', 'complete', 'when will'],
  heuristics: ['heuristic', 'guiding', 'h-cost', 'manhattan'],
  'visited-rules': ['visited', 'marked', 'already seen'],
  'wall-interaction': ['wall', 'obstacle', 'add', 'remove', 'change grid'],
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
  
  // First try exact matches for suggested questions
  const allSuggested = [
    'bfs', 'dfs', 'dijkstra', 'astar'
  ].flatMap(alg => suggestedQuestions(alg as AlgorithmType).map(sq => sq.question.toLowerCase()));
  
  if (q.includes('why was this node selected')) return 'step-reasoning';
  if (q.includes('which node will be expanded next')) return 'next-step';
  if (q.includes('path optimal')) return 'behavior';
  if (q.includes('behave differently') || q.includes('vs') || q.includes('versus')) return 'comparison';
  if (q.includes('mistakes')) return 'mistakes';
  if (q.includes('frontier') || q.includes('ordered') || q.includes('data structure')) return 'frontier-state';
  if (q.includes('stop') || q.includes('finish')) return 'stop-condition';
  if (q.includes('heuristic')) return 'heuristics';
  if (q.includes('visited')) return 'visited-rules';
  if (q.includes('wall')) return 'wall-interaction';
  if (q.includes('neighbor')) return 'step-reasoning';
  if (q.includes('priority')) return 'frontier-state';

  // Fallback to keyword matching if it's very likely an algorithm question
  const algoKeywords = ['algorithm', 'node', 'grid', 'search', 'path', 'bfs', 'dfs', 'dijkstra', 'astar'];
  const isAlgoRelated = algoKeywords.some(kw => q.includes(kw));
  
  if (isAlgoRelated) {
    for (const intent of Object.keys(intentKeywords) as TutorIntent[]) {
      if (intentKeywords[intent].some((kw) => q.includes(kw))) {
        return intent;
      }
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
      const fVal = head.fCost ?? head.priority;
      return `Min-priority item is (${head.row},${head.col}) with ${head.fCost !== undefined ? 'f' : 'priority'}=${fVal ?? 'n/a'}.`;
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
        body: `${currentNode} ${dsNote} The algorithm chooses from the frontier using its data structure (${step.dataStructure.type}). In ${algorithm.toUpperCase()}, this choice follows specific rules (e.g., FIFO for BFS, LIFO for DFS, or lowest cost for Dijkstra/A*).`,
        extra: ['Nodes already visited are skipped.', 'Neighbors are enqueued if they are not walls and not yet visited.'],
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
        extra: [currentNode, dsNote, 'Optimality depends on the algorithm and grid weights.'],
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
        body: 'Watch out for these frequent errors when implementing this algorithm:',
        extra: mistakesByAlgorithm[algorithm],
      };
    }
    case 'frontier-state': {
      return {
        intent,
        title: 'Frontier Status',
        body: `The frontier is currently managed by a ${step.dataStructure.type}. ${dsNote}`,
        extra: [
          `BFS uses a Queue (FIFO).`,
          `DFS uses a Stack (LIFO).`,
          `Dijkstra/A* use a Priority Queue (Lowest cost first).`
        ],
      };
    }
    case 'stop-condition': {
      return {
        intent,
        title: 'When will it stop?',
        body: 'The algorithm stops when the goal node is reached or the frontier becomes empty (no path found).',
        extra: ['Reaching the goal triggers path reconstruction.', 'Empty frontier means the goal is unreachable from the start.'],
      };
    }
    case 'heuristics': {
      return {
        intent,
        title: 'Heuristics & Guidance',
        body: algorithm === 'astar' 
          ? 'A* uses Manhattan distance (typically) as a heuristic to estimate the remaining cost to the goal. This guides it to expand nodes that look promising.'
          : 'This algorithm does not use heuristics; it explores based on actual distance or search order.',
        extra: algorithm === 'astar' ? ['f = g + h', 'Admissible heuristics never overestimate.'] : [],
      };
    }
    case 'visited-rules': {
      return {
        intent,
        title: 'Visited vs Frontier',
        body: 'A node is in the frontier when it is "seen" but not yet "explored". Once it is explored, it is moved to the visited set.',
        extra: ['Visited nodes are usually colored differently on the grid.', 'Nodes in the visited set will not be added to the frontier again.'],
      };
    }
    case 'wall-interaction': {
      return {
        intent,
        title: 'Walls and Obstacles',
        body: 'Walls block the algorithm. When the algorithm checks neighbors, it skips any node marked as a wall.',
        extra: ['Adding a wall during execution might invalidate the current frontier.', 'Removing a wall could open a shorter path.'],
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

