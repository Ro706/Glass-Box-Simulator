import { Cell, AlgorithmStep, AlgorithmType, AlgorithmInfo } from '@/types/algorithm';
import { bfsGenerator } from './bfs';
import { dfsGenerator } from './dfs';
import { dijkstraGenerator } from './dijkstra';
import { astarGenerator } from './astar';

export function getAlgorithmGenerator(
  type: AlgorithmType,
  grid: Cell[][]
): Generator<AlgorithmStep> {
  switch (type) {
    case 'bfs':
      return bfsGenerator(grid);
    case 'dfs':
      return dfsGenerator(grid);
    case 'dijkstra':
      return dijkstraGenerator(grid);
    case 'astar':
      return astarGenerator(grid);
    default:
      return bfsGenerator(grid);
  }
}

export const algorithmInfo: Record<AlgorithmType, AlgorithmInfo> = {
  bfs: {
    name: 'Breadth-First Search',
    shortName: 'BFS',
    description: 'Explores all neighbors at the current depth before moving to nodes at the next depth level. Uses a queue (FIFO) data structure.',
    dataStructure: 'Queue',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    strengths: [
      'Guarantees shortest path in unweighted graphs',
      'Complete - will find solution if one exists',
      'Good for finding all nodes within a given distance',
    ],
    weaknesses: [
      'Uses more memory than DFS',
      'Not efficient for weighted graphs',
      'Explores uniformly in all directions',
    ],
    bestFor: 'Finding shortest path in unweighted graphs, level-order traversal',
    color: 'bg-cyan-500',
  },
  dfs: {
    name: 'Depth-First Search',
    shortName: 'DFS',
    description: 'Explores as far as possible along each branch before backtracking. Uses a stack (LIFO) data structure.',
    dataStructure: 'Stack',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    strengths: [
      'Memory efficient (only stores current path)',
      'Good for exploring all possibilities',
      'Natural for recursive problems',
    ],
    weaknesses: [
      'Does NOT guarantee shortest path',
      'Can get stuck in deep paths',
      'May not find optimal solution',
    ],
    bestFor: 'Maze generation, topological sorting, detecting cycles',
    color: 'bg-purple-500',
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    shortName: 'Dijkstra',
    description: 'Finds shortest path by always expanding the node with smallest known distance from start. Uses a priority queue.',
    dataStructure: 'Priority Queue',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    strengths: [
      'Guarantees shortest path in weighted graphs',
      'Works with any non-negative edge weights',
      'Optimal and complete',
    ],
    weaknesses: [
      'Slower than A* (no heuristic guidance)',
      'Explores in all directions',
      'Cannot handle negative weights',
    ],
    bestFor: 'Weighted graphs, network routing, GPS navigation',
    color: 'bg-amber-500',
  },
  astar: {
    name: 'A* Search Algorithm',
    shortName: 'A*',
    description: 'Combines Dijkstra with heuristics. Uses f = g + h where g is cost from start and h is estimated cost to goal.',
    dataStructure: 'Priority Queue',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    strengths: [
      'Optimal with admissible heuristic',
      'More efficient than Dijkstra (goal-directed)',
      'Best known algorithm for many pathfinding problems',
    ],
    weaknesses: [
      'Requires a good heuristic function',
      'Memory intensive',
      'Heuristic quality affects performance',
    ],
    bestFor: 'Game AI, robotics, any goal-directed pathfinding',
    color: 'bg-emerald-500',
  },
};

export { bfsGenerator, dfsGenerator, dijkstraGenerator, astarGenerator };
