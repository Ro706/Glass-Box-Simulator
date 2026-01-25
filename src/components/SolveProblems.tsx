import React from 'react';
import { AlgorithmType } from '@/types/algorithm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Code2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Problem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  description: string;
}

interface AlgorithmProblems {
  [key: string]: Problem[];
}

const leetcodeProblems: Record<AlgorithmType, AlgorithmProblems> = {
  bfs: {
    Basic: [
      {
        title: 'Number of Islands',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/number-of-islands/',
        description: 'Count connected components using BFS traversal',
      },
      {
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        description: 'Classic BFS on tree - visit level by level',
      },
      {
        title: 'Shortest Path in Binary Matrix',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
        description: 'Find shortest path in grid using BFS',
      },
    ],
    Medium: [
      {
        title: 'Rotting Oranges',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/rotting-oranges/',
        description: 'Multi-source BFS - find minimum time for all oranges to rot',
      },
      {
        title: 'Word Ladder',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/word-ladder/',
        description: 'Transform word using BFS to find shortest transformation',
      },
      {
        title: 'Open the Lock',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/open-the-lock/',
        description: 'BFS on state space to find minimum moves',
      },
    ],
    Hard: [
      {
        title: 'Shortest Path in Grid with Obstacles Elimination',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/',
        description: 'BFS with state tracking - can eliminate K obstacles',
      },
      {
        title: 'Cut Off Trees for Golf Event',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/cut-off-trees-for-golf-event/',
        description: 'Multiple BFS searches to find path between trees',
      },
      {
        title: 'Minimum Moves to Reach Target with Rotations',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations/',
        description: 'Complex BFS with multiple states (rotation + position)',
      },
    ],
  },
  dfs: {
    Basic: [
      {
        title: 'Max Area of Island',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/max-area-of-island/',
        description: 'Find largest connected component using DFS',
      },
      {
        title: 'Flood Fill',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/flood-fill/',
        description: 'Classic DFS application - fill connected region',
      },
      {
        title: 'Path Sum',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/path-sum/',
        description: 'DFS on binary tree to find root-to-leaf path',
      },
    ],
    Medium: [
      {
        title: 'Course Schedule',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/course-schedule/',
        description: 'Detect cycle in directed graph using DFS',
      },
      {
        title: 'Number of Provinces',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/number-of-provinces/',
        description: 'Find connected components in adjacency matrix',
      },
      {
        title: 'Clone Graph',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/clone-graph/',
        description: 'Deep clone graph using DFS traversal',
      },
    ],
    Hard: [
      {
        title: 'Critical Connections in a Network',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/critical-connections-in-a-network/',
        description: 'Find bridges in graph using Tarjan\'s algorithm (DFS-based)',
      },
      {
        title: 'Longest Increasing Path in Matrix',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/',
        description: 'DFS with memoization to find longest path',
      },
      {
        title: 'Word Search II',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/word-search-ii/',
        description: 'DFS + Trie for efficient word searching in grid',
      },
    ],
  },
  dijkstra: {
    Basic: [
      {
        title: 'Path with Maximum Probability',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/path-with-maximum-probability/',
        description: 'Modified Dijkstra for probability maximization',
      },
      {
        title: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
        description: 'Dijkstra with constraint on number of stops',
      },
    ],
    Medium: [
      {
        title: 'Network Delay Time',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/network-delay-time/',
        description: 'Classic Dijkstra - find time for signal to reach all nodes',
      },
      {
        title: 'Path with Minimum Effort',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/path-with-minimum-effort/',
        description: 'Modified Dijkstra minimizing maximum edge weight',
      },
      {
        title: 'Swim in Rising Water',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/swim-in-rising-water/',
        description: 'Binary search + Dijkstra or pure Dijkstra variant',
      },
    ],
    Hard: [
      {
        title: 'Minimum Cost to Reach Destination in Time',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/',
        description: 'Dijkstra with time constraint on paths',
      },
      {
        title: 'Minimum Cost to Make at Least One Valid Path',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/',
        description: 'Modified Dijkstra with directional costs',
      },
      {
        title: 'Reachable Nodes In Subdivided Graph',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/reachable-nodes-in-subdivided-graph/',
        description: 'Complex Dijkstra on weighted graph with subdivisions',
      },
    ],
  },
  astar: {
    Basic: [
      {
        title: 'Shortest Path in Binary Matrix',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
        description: 'Can be solved optimally with A* using Manhattan/Euclidean heuristic',
      },
      {
        title: 'Minimum Knight Moves',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/minimum-knight-moves/',
        description: 'A* with Chebyshev distance heuristic for knight movement',
      },
    ],
    Medium: [
      {
        title: 'Shortest Path in Grid with Obstacles Elimination',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/',
        description: 'A* is faster than BFS here with good heuristic',
      },
      {
        title: 'Sliding Puzzle',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/sliding-puzzle/',
        description: 'A* with Manhattan distance heuristic for puzzle states',
      },
      {
        title: 'Escape a Large Maze',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/escape-a-large-maze/',
        description: 'A* or bidirectional BFS for large grid pathfinding',
      },
    ],
    Hard: [
      {
        title: 'Shortest Path to Get All Keys',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/shortest-path-to-get-all-keys/',
        description: 'A* with state space search (position + keys collected)',
      },
      {
        title: 'Minimum Moves to Move a Box',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location/',
        description: 'A* on complex state space (player + box positions)',
      },
      {
        title: 'Cut Off Trees for Golf Event',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/cut-off-trees-for-golf-event/',
        description: 'Multiple A* searches more efficient than BFS',
      },
    ],
  },
};

const getDifficultyColor = (difficulty: Problem['difficulty']) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
    case 'Medium':
      return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    case 'Hard':
      return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
  }
};

const getDifficultyIcon = (difficulty: Problem['difficulty']) => {
  switch (difficulty) {
    case 'Easy':
      return '🟢';
    case 'Medium':
      return '🟡';
    case 'Hard':
      return '🔴';
  }
};

interface SolveProblemsProps {
  algorithm: AlgorithmType;
}

export const SolveProblems: React.FC<SolveProblemsProps> = ({ algorithm }) => {
  const problems = leetcodeProblems[algorithm];

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6 p-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-7 w-7" />
            Practice Problems
          </h2>
          <p className="text-muted-foreground">
            Apply your knowledge with these curated LeetCode problems
          </p>
        </div>

        {Object.entries(problems).map(([category, problemList]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                {category} Level
              </CardTitle>
              <CardDescription>
                {problemList.length} problem{problemList.length !== 1 ? 's' : ''} to master
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {problemList.map((problem, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{getDifficultyIcon(problem.difficulty)}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{problem.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {problem.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn('text-xs', getDifficultyColor(problem.difficulty))}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-2 flex-shrink-0"
                      onClick={() => window.open(problem.url, '_blank', 'noopener,noreferrer')}
                    >
                      Solve Now
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-semibold mb-2">Pro Tips for Problem Solving</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Always visualize the problem as a graph first</li>
                  <li>Identify if you need shortest path (BFS/Dijkstra/A*) or just any path (DFS)</li>
                  <li>Check if weights matter (Dijkstra/A*) or not (BFS/DFS)</li>
                  <li>Practice explaining your approach before coding</li>
                  <li>Test with small examples and edge cases</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
