import { Cell, AlgorithmStep, DataStructureItem } from '@/types/algorithm';
import { cloneGrid, getNeighbors, findCell, reconstructPath } from './utils';

class PriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getItems(): { element: T; priority: number }[] {
    return [...this.items];
  }
}

export function* dijkstraGenerator(initialGrid: Cell[][]): Generator<AlgorithmStep> {
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
      dataStructure: { type: 'priority-queue', items: [] },
      isComplete: true,
      foundPath: false,
    };
    return;
  }

  // Initialize
  const pq = new PriorityQueue<Cell>();
  const visited = new Set<string>();
  const frontier = new Set<string>();
  
  startCell.gCost = 0;
  pq.enqueue(startCell, 0);
  frontier.add(`${startCell.row},${startCell.col}`);

  yield {
    grid: cloneGrid(grid),
    currentNode: { row: startCell.row, col: startCell.col },
    frontier: [{ row: startCell.row, col: startCell.col }],
    visited: [],
    path: [],
    explanation: `🚀 Dijkstra's algorithm starts at node (${startCell.row}, ${startCell.col}). Uses a priority queue to always expand the node with the smallest distance from start.`,
    dataStructure: {
      type: 'priority-queue',
      items: [{ row: startCell.row, col: startCell.col, gCost: 0, priority: 0 }],
    },
    isComplete: false,
    foundPath: false,
  };

  while (!pq.isEmpty()) {
    const current = pq.dequeue()!;
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
        explanation: `🎉 Shortest path found! Dijkstra's algorithm guarantees the optimal path in weighted graphs. Path length: ${path.length - 1} steps. Nodes explored: ${visited.size}.`,
        dataStructure: {
          type: 'priority-queue',
          items: pq.getItems().map(i => ({
            row: i.element.row,
            col: i.element.col,
            gCost: i.element.gCost,
            priority: i.priority,
          })),
        },
        isComplete: true,
        foundPath: true,
      };
      return;
    }

    // Mark current for visualization
    grid[current.row][current.col].state = 'current';

    const pqItems: DataStructureItem[] = pq.getItems().map(i => ({
      row: i.element.row,
      col: i.element.col,
      gCost: i.element.gCost,
      priority: i.priority,
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
      explanation: `👁️ Extracted node (${current.row}, ${current.col}) with lowest distance g=${current.gCost}. This is the closest unvisited node to the start.`,
      dataStructure: { type: 'priority-queue', items: pqItems },
      isComplete: false,
      foundPath: false,
    };

    grid[current.row][current.col].state = 'visited';

    // Explore neighbors
    const neighbors = getNeighbors(grid, current.row, current.col);
    const updatedNeighbors: Cell[] = [];

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row},${neighbor.col}`;
      if (visited.has(neighborKey)) continue;

      const newGCost = current.gCost + 1; // Edge weight is 1 for uniform grid

      if (newGCost < neighbor.gCost) {
        neighbor.gCost = newGCost;
        neighbor.parent = { row: current.row, col: current.col };
        pq.enqueue(grid[neighbor.row][neighbor.col], newGCost);
        
        if (!frontier.has(neighborKey)) {
          frontier.add(neighborKey);
          grid[neighbor.row][neighbor.col].state = 'frontier';
        }
        updatedNeighbors.push(neighbor);
      }
    }

    if (updatedNeighbors.length > 0) {
      const neighborInfo = updatedNeighbors.map(n => `(${n.row}, ${n.col}) g=${n.gCost}`).join(', ');
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
        explanation: `➕ Updated ${updatedNeighbors.length} neighbor(s) in priority queue: ${neighborInfo}. Priority is based on distance from start (g-cost).`,
        dataStructure: {
          type: 'priority-queue',
          items: pq.getItems().map(i => ({
            row: i.element.row,
            col: i.element.col,
            gCost: i.element.gCost,
            priority: i.priority,
          })),
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
    explanation: `❌ No path exists! Dijkstra explored all ${visited.size} reachable nodes but couldn't find a path to the goal.`,
    dataStructure: { type: 'priority-queue', items: [] },
    isComplete: true,
    foundPath: false,
  };
}
