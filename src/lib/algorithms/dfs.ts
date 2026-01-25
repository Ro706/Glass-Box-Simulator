import { Cell, AlgorithmStep, DataStructureItem } from '@/types/algorithm';
import { cloneGrid, getNeighbors, findCell, reconstructPath } from './utils';

export function* dfsGenerator(initialGrid: Cell[][]): Generator<AlgorithmStep> {
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
      dataStructure: { type: 'stack', items: [] },
      isComplete: true,
      foundPath: false,
    };
    return;
  }

  // Initialize
  const stack: Cell[] = [startCell];
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
    explanation: `🚀 DFS starts at node (${startCell.row}, ${startCell.col}). The stack contains the starting node. DFS explores as deep as possible before backtracking.`,
    dataStructure: {
      type: 'stack',
      items: [{ row: startCell.row, col: startCell.col, gCost: 0 }],
    },
    isComplete: false,
    foundPath: false,
  };

  while (stack.length > 0) {
    const current = stack.pop()!;
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
        explanation: `🎉 Path found! Note: DFS doesn't guarantee the shortest path. Path length: ${path.length - 1} steps. Nodes explored: ${visited.size}.`,
        dataStructure: {
          type: 'stack',
          items: stack.map(c => ({ row: c.row, col: c.col, gCost: c.gCost })),
        },
        isComplete: true,
        foundPath: true,
      };
      return;
    }

    // Mark current for visualization
    grid[current.row][current.col].state = 'current';

    const stackItems: DataStructureItem[] = stack.map(c => ({
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
      explanation: `👁️ Popped node (${current.row}, ${current.col}) from the top of the stack. DFS dives deep first, following a single path until it hits a dead end or finds the goal.`,
      dataStructure: { type: 'stack', items: stackItems },
      isComplete: false,
      foundPath: false,
    };

    grid[current.row][current.col].state = 'visited';

    // Explore neighbors (reverse order so we explore in natural order when popping)
    const neighbors = getNeighbors(grid, current.row, current.col).reverse();
    const newNeighbors: Cell[] = [];

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`;
      if (!visited.has(neighborKey) && !frontier.has(neighborKey)) {
        neighbor.gCost = current.gCost + 1;
        neighbor.parent = { row: current.row, col: current.col };
        stack.push(neighbor);
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
        explanation: `➕ Pushed ${newNeighbors.length} neighbor(s) onto the stack: ${neighborCoords}. The last pushed node will be explored first (LIFO order).`,
        dataStructure: {
          type: 'stack',
          items: stack.map(c => ({ row: c.row, col: c.col, gCost: c.gCost })),
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
    explanation: `❌ No path exists! DFS explored all ${visited.size} reachable nodes but couldn't find a path to the goal.`,
    dataStructure: { type: 'stack', items: [] },
    isComplete: true,
    foundPath: false,
  };
}
