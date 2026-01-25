import { Cell, AlgorithmStep, DataStructureItem } from '@/types/algorithm';
import { cloneGrid, getNeighbors, findCell, reconstructPath, manhattanDistance } from './utils';

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

export function* astarGenerator(initialGrid: Cell[][]): Generator<AlgorithmStep> {
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
  startCell.hCost = manhattanDistance(startCell.row, startCell.col, endCell.row, endCell.col);
  startCell.fCost = startCell.gCost + startCell.hCost;
  pq.enqueue(startCell, startCell.fCost);
  frontier.add(`${startCell.row},${startCell.col}`);

  yield {
    grid: cloneGrid(grid),
    currentNode: { row: startCell.row, col: startCell.col },
    frontier: [{ row: startCell.row, col: startCell.col }],
    visited: [],
    path: [],
    explanation: `🚀 A* starts at node (${startCell.row}, ${startCell.col}). Uses f = g + h where g is distance from start and h is heuristic (Manhattan distance) to goal. h=${startCell.hCost}, f=${startCell.fCost}.`,
    dataStructure: {
      type: 'priority-queue',
      items: [{
        row: startCell.row,
        col: startCell.col,
        gCost: 0,
        hCost: startCell.hCost,
        fCost: startCell.fCost,
        priority: startCell.fCost,
      }],
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
        explanation: `🎉 Optimal path found! A* is both complete and optimal (with admissible heuristic). Path length: ${path.length - 1} steps. Nodes explored: ${visited.size}. A* typically explores fewer nodes than Dijkstra!`,
        dataStructure: {
          type: 'priority-queue',
          items: pq.getItems().map(i => ({
            row: i.element.row,
            col: i.element.col,
            gCost: i.element.gCost,
            hCost: i.element.hCost,
            fCost: i.element.fCost,
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
      hCost: i.element.hCost,
      fCost: i.element.fCost,
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
      explanation: `👁️ Extracted node (${current.row}, ${current.col}) with lowest f=${current.fCost} (g=${current.gCost} + h=${current.hCost}). The heuristic guides us toward the goal!`,
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

      const newGCost = current.gCost + 1;

      if (newGCost < neighbor.gCost) {
        neighbor.gCost = newGCost;
        neighbor.hCost = manhattanDistance(neighbor.row, neighbor.col, endCell.row, endCell.col);
        neighbor.fCost = neighbor.gCost + neighbor.hCost;
        neighbor.parent = { row: current.row, col: current.col };
        
        grid[neighbor.row][neighbor.col].gCost = neighbor.gCost;
        grid[neighbor.row][neighbor.col].hCost = neighbor.hCost;
        grid[neighbor.row][neighbor.col].fCost = neighbor.fCost;
        
        pq.enqueue(grid[neighbor.row][neighbor.col], neighbor.fCost);
        
        if (!frontier.has(neighborKey)) {
          frontier.add(neighborKey);
          grid[neighbor.row][neighbor.col].state = 'frontier';
        }
        updatedNeighbors.push(neighbor);
      }
    }

    if (updatedNeighbors.length > 0) {
      const neighborInfo = updatedNeighbors.map(n => 
        `(${n.row}, ${n.col}) f=${n.fCost}`
      ).join(', ');
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
        explanation: `➕ Updated ${updatedNeighbors.length} neighbor(s): ${neighborInfo}. A* prioritizes nodes that seem closest to the goal (lowest f = g + h).`,
        dataStructure: {
          type: 'priority-queue',
          items: pq.getItems().map(i => ({
            row: i.element.row,
            col: i.element.col,
            gCost: i.element.gCost,
            hCost: i.element.hCost,
            fCost: i.element.fCost,
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
    explanation: `❌ No path exists! A* explored all ${visited.size} reachable nodes but couldn't find a path to the goal.`,
    dataStructure: { type: 'priority-queue', items: [] },
    isComplete: true,
    foundPath: false,
  };
}
