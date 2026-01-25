import { Cell, AlgorithmStep, DataStructureItem } from '@/types/algorithm';
import { cloneGrid, getNeighbors, findCell, reconstructPath } from './utils';

export function* bfsGenerator(initialGrid: Cell[][]): Generator<AlgorithmStep> {
  const grid = cloneGrid(initialGrid);
  const startCell = findCell(grid, 'start');
  const endCell = findCell(grid, 'end');

  if (!startCell || !endCell) {
    yield {
      grid,
      currentNode: null,
      frontier: [],
      visited: [],
      path: [],
      explanation: '❌ Please set both start and end nodes.',
      dataStructure: { type: 'queue', items: [] },
      isComplete: true,
      foundPath: false,
    };
    return;
  }

  // Initialize
  const queue: Cell[] = [startCell];
  const visited = new Set<string>();
  const frontier = new Set<string>();
  
  startCell.gCost = 0;
  frontier.add(`${startCell.row},${startCell.col}`);

  yield {
    grid: cloneGrid(grid),
    currentNode: { row: startCell.row, col: startCell.col },
    frontier: [{ row: startCell.row, col: startCell.col }],
    visited: [],
    path: [],
    explanation: `🚀 BFS starts at node (${startCell.row}, ${startCell.col}). The queue contains the starting node. BFS explores all neighbors at the current depth before moving to the next level.`,
    dataStructure: {
      type: 'queue',
      items: [{ row: startCell.row, col: startCell.col, gCost: 0 }],
    },
    isComplete: false,
    foundPath: false,
  };

  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentKey = `${current.row},${current.col}`;

    if (visited.has(currentKey)) continue;

    visited.add(currentKey);
    frontier.delete(currentKey);
    grid[current.row][current.col].state = 'visited';

    // Check if we found the end
    if (current.type === 'end') {
      const path = reconstructPath(grid, current);
      for (const { row, col } of path) {
        grid[row][col].state = 'path';
      }

      yield {
        grid: cloneGrid(grid),
        currentNode: { row: current.row, col: current.col },
        frontier: Array.from(frontier).map(k => {
          const [r, c] = k.split(',').map(Number);
          return { row: r, col: c };
        }),
        visited: Array.from(visited).map(k => {
          const [r, c] = k.split(',').map(Number);
          return { row: r, col: c };
        }),
        path,
        explanation: `🎉 Path found! BFS guarantees the shortest path in unweighted graphs. Total path length: ${path.length - 1} steps. Nodes explored: ${visited.size}.`,
        dataStructure: {
          type: 'queue',
          items: queue.map(c => ({ row: c.row, col: c.col, gCost: c.gCost })),
        },
        isComplete: true,
        foundPath: true,
      };
      return;
    }

    // Mark current for visualization
    grid[current.row][current.col].state = 'current';

    // Prepare data structure items for visualization
    const queueItems: DataStructureItem[] = queue.map(c => ({
      row: c.row,
      col: c.col,
      gCost: c.gCost,
    }));

    yield {
      grid: cloneGrid(grid),
      currentNode: { row: current.row, col: current.col },
      frontier: Array.from(frontier).map(k => {
        const [r, c] = k.split(',').map(Number);
        return { row: r, col: c };
      }),
      visited: Array.from(visited).map(k => {
        const [r, c] = k.split(',').map(Number);
        return { row: r, col: c };
      }),
      path: [],
      explanation: `👁️ Dequeued node (${current.row}, ${current.col}) from the front of the queue. This node is at distance ${current.gCost} from start. Now exploring its neighbors...`,
      dataStructure: { type: 'queue', items: queueItems },
      isComplete: false,
      foundPath: false,
    };

    grid[current.row][current.col].state = 'visited';

    // Explore neighbors
    const neighbors = getNeighbors(grid, current.row, current.col);
    const newNeighbors: Cell[] = [];

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`;
      if (!visited.has(neighborKey) && !frontier.has(neighborKey)) {
        neighbor.gCost = current.gCost + 1;
        neighbor.parent = { row: current.row, col: current.col };
        queue.push(neighbor);
        frontier.add(neighborKey);
        grid[neighbor.row][neighbor.col].state = 'frontier';
        newNeighbors.push(neighbor);
      }
    }

    if (newNeighbors.length > 0) {
      const neighborCoords = newNeighbors.map(n => `(${n.row}, ${n.col})`).join(', ');
      yield {
        grid: cloneGrid(grid),
        currentNode: { row: current.row, col: current.col },
        frontier: Array.from(frontier).map(k => {
          const [r, c] = k.split(',').map(Number);
          return { row: r, col: c };
        }),
        visited: Array.from(visited).map(k => {
          const [r, c] = k.split(',').map(Number);
          return { row: r, col: c };
        }),
        path: [],
        explanation: `➕ Added ${newNeighbors.length} neighbor(s) to the queue: ${neighborCoords}. They're added to the back of the queue (FIFO order), ensuring level-by-level exploration.`,
        dataStructure: {
          type: 'queue',
          items: queue.map(c => ({ row: c.row, col: c.col, gCost: c.gCost })),
        },
        isComplete: false,
        foundPath: false,
      };
    }
  }

  // No path found
  yield {
    grid: cloneGrid(grid),
    currentNode: null,
    frontier: [],
    visited: Array.from(visited).map(k => {
      const [r, c] = k.split(',').map(Number);
      return { row: r, col: c };
    }),
    path: [],
    explanation: `❌ No path exists! BFS explored all ${visited.size} reachable nodes but couldn't find a path to the goal.`,
    dataStructure: { type: 'queue', items: [] },
    isComplete: true,
    foundPath: false,
  };
}
