import { AlgorithmType } from '@/types/algorithm';

export interface AlgorithmContent {
  name: string;
  definition: string;
  pseudocode: string;
  code: string;
  flowDiagram: string;
  realWorldUseCases: {
    title: string;
    description: string;
  }[];
  workedExample: {
    description: string;
    steps: string[];
  };
}

export const algorithmContent: Record<AlgorithmType, AlgorithmContent> = {
  bfs: {
    name: 'Breadth-First Search (BFS)',
    definition:
      'Breadth-First Search is a graph traversal algorithm that explores all vertices at the current depth level before moving to vertices at the next depth level. It uses a queue data structure (FIFO - First In First Out) to keep track of vertices to visit. BFS guarantees finding the shortest path in unweighted graphs.',
    pseudocode: `function BFS(graph, start, goal):
    create a queue Q
    mark start as visited
    Q.enqueue(start)
    
    while Q is not empty:
        current = Q.dequeue()
        
        if current == goal:
            return path
        
        for each neighbor of current:
            if neighbor not visited:
                mark neighbor as visited
                neighbor.parent = current
                Q.enqueue(neighbor)
    
    return "No path found"`,
    code: `// BFS Implementation in JavaScript
function bfs(graph, start, goal) {
  const queue = [start];           // Initialize queue with start node
  const visited = new Set([start]); // Track visited nodes
  const parent = new Map();        // Track path
  
  while (queue.length > 0) {
    const current = queue.shift(); // Dequeue (FIFO)
    
    // Check if we reached the goal
    if (current === goal) {
      return reconstructPath(parent, start, goal);
    }
    
    // Explore all neighbors
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);       // Mark as visited
        parent.set(neighbor, current); // Track parent
        queue.push(neighbor);        // Enqueue neighbor
      }
    }
  }
  
  return null; // No path found
}

// Reconstruct path from start to goal
function reconstructPath(parent, start, goal) {
  const path = [];
  let current = goal;
  
  while (current !== start) {
    path.unshift(current);
    current = parent.get(current);
  }
  path.unshift(start);
  
  return path;
}`,
    flowDiagram: `graph TD
    A[Start] --> B[Add start node to queue]
    B --> C[Mark start as visited]
    C --> D{Queue empty?}
    D -->|Yes| E[No path found]
    D -->|No| F[Dequeue current node]
    F --> G{Current == Goal?}
    G -->|Yes| H[Return path]
    G -->|No| I[Get all neighbors]
    I --> J{For each neighbor}
    J --> K{Visited?}
    K -->|No| L[Mark visited]
    L --> M[Set parent]
    M --> N[Enqueue neighbor]
    N --> J
    K -->|Yes| J
    J -->|Done| D`,
    realWorldUseCases: [
      {
        title: 'Social Network Friend Suggestions',
        description:
          "BFS is used to find connections in social networks. Finding '2nd-degree connections' or 'People You May Know' is essentially BFS with depth 2. Starting from your profile, BFS explores immediate friends (level 1), then friends of friends (level 2), finding shortest connection paths.",
      },
      {
        title: 'GPS Navigation & Maps',
        description:
          "In unweighted road networks, BFS finds the shortest path by number of roads. Google Maps uses variants of BFS for finding routes. It's also used in peer-to-peer networks to discover nodes and in web crawlers to index pages level by level.",
      },
    ],
    workedExample: {
      description: 'Finding shortest path in a 3x3 grid from (0,0) to (2,2)',
      steps: [
        'Start: Queue = [(0,0)], Visited = {(0,0)}',
        'Dequeue (0,0): Add neighbors (0,1) and (1,0) → Queue = [(0,1), (1,0)]',
        'Dequeue (0,1): Add neighbor (1,1) → Queue = [(1,0), (1,1)]',
        'Dequeue (1,0): Neighbor (1,1) already queued → Queue = [(1,1)]',
        'Dequeue (1,1): Add neighbors (1,2) and (2,1) → Queue = [(1,2), (2,1)]',
        'Dequeue (1,2): Add neighbor (2,2) → Queue = [(2,1), (2,2)]',
        'Dequeue (2,1): Neighbor (2,2) already queued → Queue = [(2,2)]',
        'Dequeue (2,2): Goal reached! Path: (0,0) → (0,1) → (1,1) → (1,2) → (2,2)',
      ],
    },
  },
  dfs: {
    name: 'Depth-First Search (DFS)',
    definition:
      'Depth-First Search is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack data structure (LIFO - Last In First Out) or recursion to keep track of vertices. DFS is memory-efficient but does NOT guarantee the shortest path.',
    pseudocode: `function DFS(graph, start, goal):
    create a stack S
    mark start as visited
    S.push(start)
    
    while S is not empty:
        current = S.pop()
        
        if current == goal:
            return path
        
        for each neighbor of current:
            if neighbor not visited:
                mark neighbor as visited
                neighbor.parent = current
                S.push(neighbor)
    
    return "No path found"
    
// Recursive version:
function DFS_Recursive(current, goal, visited):
    if current == goal:
        return path
    
    mark current as visited
    
    for each neighbor of current:
        if neighbor not visited:
            if DFS_Recursive(neighbor, goal, visited):
                return path
    
    return null`,
    code: `// DFS Implementation (Iterative) in JavaScript
function dfs(graph, start, goal) {
  const stack = [start];           // Initialize stack with start node
  const visited = new Set([start]); // Track visited nodes
  const parent = new Map();        // Track path
  
  while (stack.length > 0) {
    const current = stack.pop();   // Pop (LIFO)
    
    // Check if we reached the goal
    if (current === goal) {
      return reconstructPath(parent, start, goal);
    }
    
    // Explore all neighbors
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);       // Mark as visited
        parent.set(neighbor, current); // Track parent
        stack.push(neighbor);        // Push neighbor to stack
      }
    }
  }
  
  return null; // No path found
}

// DFS Recursive Implementation
function dfsRecursive(graph, current, goal, visited = new Set(), parent = new Map()) {
  visited.add(current);
  
  if (current === goal) {
    return reconstructPath(parent, current, goal);
  }
  
  for (const neighbor of graph[current]) {
    if (!visited.has(neighbor)) {
      parent.set(neighbor, current);
      const result = dfsRecursive(graph, neighbor, goal, visited, parent);
      if (result) return result;
    }
  }
  
  return null;
}`,
    flowDiagram: `graph TD
    A[Start] --> B[Push start node to stack]
    B --> C[Mark start as visited]
    C --> D{Stack empty?}
    D -->|Yes| E[No path found]
    D -->|No| F[Pop current node]
    F --> G{Current == Goal?}
    G -->|Yes| H[Return path]
    G -->|No| I[Get all neighbors]
    I --> J{For each neighbor}
    J --> K{Visited?}
    K -->|No| L[Mark visited]
    L --> M[Set parent]
    M --> N[Push to stack]
    N --> J
    K -->|Yes| J
    J -->|Done| D`,
    realWorldUseCases: [
      {
        title: 'Maze Solving & Game AI',
        description:
          'DFS is perfect for exploring all possible paths in maze-solving games. It\'s used in puzzle games like Sudoku solvers, where you try one possibility, go deep, backtrack if wrong. Chess engines use DFS variants to explore move sequences.',
      },
      {
        title: 'Topological Sorting & Dependency Resolution',
        description:
          'DFS is used to detect cycles in task scheduling and resolve dependencies. Package managers (npm, pip) use DFS to determine installation order. Compilers use DFS for detecting circular dependencies in module imports.',
      },
    ],
    workedExample: {
      description: 'DFS traversal in a 3x3 grid from (0,0) to (2,2)',
      steps: [
        'Start: Stack = [(0,0)], Visited = {(0,0)}',
        'Pop (0,0): Push neighbors (1,0) and (0,1) → Stack = [(1,0), (0,1)]',
        'Pop (0,1): Push neighbor (0,2) → Stack = [(1,0), (0,2)]',
        'Pop (0,2): Push neighbor (1,2) → Stack = [(1,0), (1,2)]',
        'Pop (1,2): Push neighbor (2,2) → Stack = [(1,0), (2,2)]',
        'Pop (2,2): Goal reached! Path might be: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)',
        'Note: DFS found A path, but NOT necessarily the shortest!',
      ],
    },
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    definition:
      "Dijkstra's algorithm finds the shortest path in weighted graphs with non-negative edge weights. It uses a priority queue (min-heap) to always expand the node with the smallest known distance from the start. Dijkstra guarantees the optimal shortest path in weighted graphs.",
    pseudocode: `function Dijkstra(graph, start, goal):
    create a priority queue PQ
    distance[start] = 0
    distance[all other nodes] = infinity
    PQ.enqueue(start, 0)
    
    while PQ is not empty:
        current = PQ.dequeue() // Node with min distance
        
        if current == goal:
            return path
        
        for each neighbor of current:
            newDistance = distance[current] + weight(current, neighbor)
            
            if newDistance < distance[neighbor]:
                distance[neighbor] = newDistance
                parent[neighbor] = current
                PQ.enqueue(neighbor, newDistance)
    
    return "No path found"`,
    code: `// Dijkstra's Algorithm Implementation in JavaScript
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element, priority) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }
  
  dequeue() {
    return this.items.shift()?.element;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

function dijkstra(graph, start, goal) {
  const distances = {};      // Shortest distance to each node
  const parent = {};         // Track path
  const pq = new PriorityQueue();
  const visited = new Set();
  
  // Initialize distances
  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    if (current === goal) {
      return reconstructPath(parent, start, goal);
    }
    
    // Explore neighbors
    for (const neighbor of graph[current]) {
      const newDistance = distances[current] + neighbor.weight;
      
      // Relaxation: found shorter path
      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        parent[neighbor.node] = current;
        pq.enqueue(neighbor.node, newDistance);
      }
    }
  }
  
  return null; // No path found
}`,
    flowDiagram: `graph TD
    A[Start] --> B[Set start distance = 0]
    B --> C[All other distances = ∞]
    C --> D[Add start to priority queue]
    D --> E{Queue empty?}
    E -->|Yes| F[No path found]
    E -->|No| G[Dequeue node with min distance]
    G --> H{Already visited?}
    H -->|Yes| E
    H -->|No| I[Mark as visited]
    I --> J{Current == Goal?}
    J -->|Yes| K[Return shortest path]
    J -->|No| L{For each neighbor}
    L --> M[Calculate new distance]
    M --> N{New distance < old?}
    N -->|Yes| O[Update distance]
    O --> P[Update parent]
    P --> Q[Add to priority queue]
    Q --> L
    N -->|No| L
    L -->|Done| E`,
    realWorldUseCases: [
      {
        title: 'GPS & Navigation Systems',
        description:
          "Dijkstra's algorithm is the foundation of route-finding in Google Maps, Waze, and car navigation systems. Roads have different lengths (weights), and Dijkstra finds the shortest distance route. Variants consider traffic, tolls, and road types as weights.",
      },
      {
        title: 'Network Routing Protocols',
        description:
          "Used in OSPF (Open Shortest Path First) internet routing protocol. Routers use Dijkstra to find the most efficient path for data packets across networks. It's also used in telecommunication networks to minimize call connection costs.",
      },
    ],
    workedExample: {
      description: 'Finding shortest path in weighted graph from A to E',
      steps: [
        'Initialize: dist[A]=0, dist[all others]=∞, PQ=[(A,0)]',
        'Process A: Update neighbors → dist[B]=4, dist[C]=2, PQ=[(C,2),(B,4)]',
        'Process C (min dist): Update neighbors → dist[D]=5, dist[B]=3, PQ=[(B,3),(B,4),(D,5)]',
        'Process B (dist=3): Update neighbors → dist[D]=4, PQ=[(D,4),(D,5)]',
        'Process D (dist=4): Update neighbor → dist[E]=7, PQ=[(D,5),(E,7)]',
        'Process D again (already visited, skip): PQ=[(E,7)]',
        'Process E: Goal reached! Shortest path: A→C→B→D→E with total cost = 7',
      ],
    },
  },
  astar: {
    name: 'A* (A-Star) Algorithm',
    definition:
      'A* is an informed search algorithm that finds the shortest path using both actual distance from start (g-cost) and estimated distance to goal (h-cost via heuristic). It combines Dijkstra\'s optimality with greedy best-first search\'s efficiency. A* uses f(n) = g(n) + h(n) to prioritize nodes, guaranteeing the shortest path when using an admissible heuristic.',
    pseudocode: `function AStar(graph, start, goal):
    create a priority queue PQ
    gScore[start] = 0
    fScore[start] = heuristic(start, goal)
    PQ.enqueue(start, fScore[start])
    
    while PQ is not empty:
        current = PQ.dequeue() // Node with min f-score
        
        if current == goal:
            return path
        
        for each neighbor of current:
            tentativeG = gScore[current] + distance(current, neighbor)
            
            if tentativeG < gScore[neighbor]:
                parent[neighbor] = current
                gScore[neighbor] = tentativeG
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)
                PQ.enqueue(neighbor, fScore[neighbor])
    
    return "No path found"

// Common heuristics:
function manhattanDistance(node, goal):
    return |node.x - goal.x| + |node.y - goal.y|

function euclideanDistance(node, goal):
    return sqrt((node.x - goal.x)² + (node.y - goal.y)²)`,
    code: `// A* Algorithm Implementation in JavaScript
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element, priority) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }
  
  dequeue() {
    return this.items.shift()?.element;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

// Manhattan distance heuristic for grid
function heuristic(node, goal) {
  return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}

function aStar(graph, start, goal) {
  const gScore = {};         // Actual cost from start
  const fScore = {};         // f = g + h (total estimated cost)
  const parent = {};         // Track path
  const pq = new PriorityQueue();
  const visited = new Set();
  
  // Initialize scores
  for (const node in graph) {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  }
  
  gScore[start] = 0;
  fScore[start] = heuristic(start, goal);
  pq.enqueue(start, fScore[start]);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    if (current === goal) {
      return reconstructPath(parent, start, goal);
    }
    
    // Explore neighbors
    for (const neighbor of graph[current]) {
      const tentativeG = gScore[current] + neighbor.weight;
      
      // Found better path to neighbor
      if (tentativeG < gScore[neighbor.node]) {
        parent[neighbor.node] = current;
        gScore[neighbor.node] = tentativeG;
        fScore[neighbor.node] = gScore[neighbor.node] + 
                                 heuristic(neighbor.node, goal);
        pq.enqueue(neighbor.node, fScore[neighbor.node]);
      }
    }
  }
  
  return null; // No path found
}`,
    flowDiagram: `graph TD
    A[Start] --> B[Set g-score start = 0]
    B --> C[Calculate f = g + h for start]
    C --> D[Add start to priority queue]
    D --> E{Queue empty?}
    E -->|Yes| F[No path found]
    E -->|No| G[Dequeue node with min f-score]
    G --> H{Already visited?}
    H -->|Yes| E
    H -->|No| I[Mark as visited]
    I --> J{Current == Goal?}
    J -->|Yes| K[Return optimal path]
    J -->|No| L{For each neighbor}
    L --> M[Calculate tentative g-score]
    M --> N{Tentative g < old g?}
    N -->|Yes| O[Update g-score]
    O --> P[Calculate f = g + h]
    P --> Q[Update parent]
    Q --> R[Add to priority queue]
    R --> L
    N -->|No| L
    L -->|Done| E`,
    realWorldUseCases: [
      {
        title: 'Video Game Pathfinding',
        description:
          'A* is the industry standard for game AI pathfinding. NPCs in games like StarCraft, League of Legends, and RPGs use A* to navigate around obstacles efficiently. It balances speed and accuracy, making real-time pathfinding possible for hundreds of units.',
      },
      {
        title: 'Robotics & Autonomous Vehicles',
        description:
          'Self-driving cars and drones use A* for real-time path planning. Robots in warehouses (Amazon fulfillment centers) use A* to navigate between shelves. The heuristic guides the robot toward the goal while avoiding dynamic obstacles.',
      },
    ],
    workedExample: {
      description: 'A* pathfinding in grid from (0,0) to (4,4) with Manhattan heuristic',
      steps: [
        'Start (0,0): g=0, h=8, f=8, PQ=[(0,0):8]',
        'Expand (0,0): Add (0,1):g=1,h=7,f=8 and (1,0):g=1,h=7,f=8',
        'Expand (0,1) or (1,0): Both have f=8, choose one → Add neighbors',
        'Continue: A* prioritizes nodes with lower f-scores',
        'When reaching (3,4): g=7, h=1, f=8',
        'Finally (4,4): g=8, h=0, f=8 → Goal!',
        'Optimal path found: (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(4,2)→(4,3)→(4,4)',
        'A* explored fewer nodes than Dijkstra by using heuristic guidance!',
      ],
    },
  },
};
