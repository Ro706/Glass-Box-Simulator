import { describe, it, expect } from 'vitest';
import { bfsGenerator } from './bfs';
import { createGrid, createCell } from './utils';
import { Cell } from '@/types/algorithm';

describe('BFS Algorithm', () => {
  it('should find a path in a simple grid', () => {
    // 3x3 Grid
    // S . .
    // . . .
    // . . E
    const rows = 3;
    const cols = 3;
    const grid = createGrid(rows, cols);
    
    // Setup Start (0,0) and End (2,2)
    grid[0][0].type = 'start';
    grid[2][2].type = 'end';

    const generator = bfsGenerator(grid);
    let result = generator.next();
    let finalStep = result.value;

    // Run until done
    while (!result.done) {
      finalStep = result.value;
      result = generator.next();
    }
    // The generator might yield one last value when done is true, or the return value
    if (result.value) {
        finalStep = result.value;
    }

    expect(finalStep).toBeDefined();
    expect(finalStep.foundPath).toBe(true);
    expect(finalStep.isComplete).toBe(true);
    expect(finalStep.path.length).toBeGreaterThan(0);
    // Shortest path from (0,0) to (2,2) is 5 nodes: (0,0)->(0,1)->(0,2)->(1,2)->(2,2) or similar
    // Distance is 4 edges, 5 nodes.
    // However, the test grid has no walls, so it should be simple Manhattan distance?
    // BFS on unweighted grid = shortest path.
  });

  it('should avoid walls', () => {
    // 3x3 Grid
    // S W E
    // . W .
    // . . .
    // Path must go around the wall
    const rows = 3;
    const cols = 3;
    const grid = createGrid(rows, cols);

    grid[0][0].type = 'start';
    grid[0][2].type = 'end';
    
    // Wall at (0,1) and (1,1)
    grid[0][1].type = 'wall';
    grid[1][1].type = 'wall';

    const generator = bfsGenerator(grid);
    let result = generator.next();
    let finalStep = result.value;

    while (!result.done) {
        finalStep = result.value;
        result = generator.next();
    }
    if (result.value) finalStep = result.value;

    expect(finalStep.foundPath).toBe(true);
    // Path should look like: (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2) -> (1,2) -> (0,2)
    // Or similar.
    expect(finalStep.path.length).toBeGreaterThan(0);
  });

  it('should report failure when no path exists', () => {
    // 3x3 Grid
    // S W E
    // W W W
    // . . .
    const rows = 3;
    const cols = 3;
    const grid = createGrid(rows, cols);

    grid[0][0].type = 'start';
    grid[0][2].type = 'end';

    // Wall off the start
    grid[0][1].type = 'wall';
    grid[1][0].type = 'wall';
    grid[1][1].type = 'wall'; 

    const generator = bfsGenerator(grid);
    let result = generator.next();
    let finalStep = result.value;

    while (!result.done) {
        finalStep = result.value;
        result = generator.next();
    }
    if (result.value) finalStep = result.value;

    expect(finalStep.foundPath).toBe(false);
    expect(finalStep.isComplete).toBe(true);
    expect(finalStep.path.length).toBe(0);
  });
});
