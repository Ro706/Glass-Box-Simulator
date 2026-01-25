import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { GitCompare, Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonRow {
  criteria: string;
  bfs: string | React.ReactNode;
  dfs: string | React.ReactNode;
  dijkstra: string | React.ReactNode;
  astar: string | React.ReactNode;
}

const CheckIcon = () => <Check className="h-4 w-4 text-green-500 inline" />;
const XIcon = () => <X className="h-4 w-4 text-red-500 inline" />;
const PartialIcon = () => <AlertCircle className="h-4 w-4 text-yellow-500 inline" />;

const comparisonData: ComparisonRow[] = [
  {
    criteria: 'Data Structure',
    bfs: 'Queue (FIFO)',
    dfs: 'Stack (LIFO) / Recursion',
    dijkstra: 'Priority Queue (Min-Heap)',
    astar: 'Priority Queue (Min-Heap)',
  },
  {
    criteria: 'Completeness',
    bfs: <><CheckIcon /> Yes - always finds solution</>,
    dfs: <><PartialIcon /> No - can get stuck in infinite loops</>,
    dijkstra: <><CheckIcon /> Yes - always finds solution</>,
    astar: <><CheckIcon /> Yes - always finds solution</>,
  },
  {
    criteria: 'Optimality (Shortest Path)',
    bfs: <><CheckIcon /> Yes (unweighted graphs)</>,
    dfs: <><XIcon /> No - finds A path, not shortest</>,
    dijkstra: <><CheckIcon /> Yes (weighted graphs)</>,
    astar: <><CheckIcon /> Yes (with admissible heuristic)</>,
  },
  {
    criteria: 'Time Complexity',
    bfs: 'O(V + E)',
    dfs: 'O(V + E)',
    dijkstra: 'O((V + E) log V)',
    astar: 'O(E) to O(b^d) worst case',
  },
  {
    criteria: 'Space Complexity',
    bfs: 'O(V) - stores all level nodes',
    dfs: 'O(h) - h is max depth',
    dijkstra: 'O(V)',
    astar: 'O(V)',
  },
  {
    criteria: 'Graph Type',
    bfs: 'Unweighted',
    dfs: 'Unweighted',
    dijkstra: 'Weighted (non-negative)',
    astar: 'Weighted (non-negative)',
  },
  {
    criteria: 'Heuristic Function',
    bfs: <><XIcon /> Not used</>,
    dfs: <><XIcon /> Not used</>,
    dijkstra: <><XIcon /> Not used</>,
    astar: <><CheckIcon /> Uses h(n) heuristic</>,
  },
  {
    criteria: 'Memory Usage',
    bfs: 'High - stores entire level',
    dfs: 'Low - only current path',
    dijkstra: 'Medium - stores distances',
    astar: 'Medium - stores f, g, h scores',
  },
  {
    criteria: 'Speed',
    bfs: 'Moderate',
    dfs: 'Fast (but not optimal)',
    dijkstra: 'Slow (explores all directions)',
    astar: 'Fast (guided by heuristic)',
  },
  {
    criteria: 'Exploration Pattern',
    bfs: 'Layer by layer (breadth)',
    dfs: 'Deep first, then backtrack',
    dijkstra: 'Expands closest nodes first',
    astar: 'Expands most promising nodes',
  },
  {
    criteria: 'Path Quality',
    bfs: 'Shortest (by hops)',
    dfs: 'Any path (often long)',
    dijkstra: 'Shortest (by weight)',
    astar: 'Shortest (by weight)',
  },
  {
    criteria: 'When to Use',
    bfs: 'Unweighted graphs, level-order',
    dfs: 'Maze solving, topological sort',
    dijkstra: 'Weighted graphs, unknown goal direction',
    astar: 'Weighted graphs, known goal location',
  },
  {
    criteria: 'Real-Time Suitability',
    bfs: <><PartialIcon /> Moderate - can be slow</>,
    dfs: <><CheckIcon /> Good - fast execution</>,
    dijkstra: <><XIcon /> Poor - explores too much</>,
    astar: <><CheckIcon /> Excellent - efficient & optimal</>,
  },
  {
    criteria: 'Handling Obstacles',
    bfs: <><CheckIcon /> Good - finds path around</>,
    dfs: <><PartialIcon /> Unpredictable path</>,
    dijkstra: <><CheckIcon /> Good - optimal path</>,
    astar: <><CheckIcon /> Excellent - smart navigation</>,
  },
  {
    criteria: 'Goal Known in Advance',
    bfs: 'Not required',
    dfs: 'Not required',
    dijkstra: 'Not required',
    astar: 'Required (for heuristic)',
  },
  {
    criteria: 'Duplicate Detection',
    bfs: 'Essential',
    dfs: 'Essential',
    dijkstra: 'Essential',
    astar: 'Essential',
  },
  {
    criteria: 'Common Mistakes',
    bfs: 'Forgetting to mark visited, using wrong data structure',
    dfs: 'Infinite loops, stack overflow in recursion',
    dijkstra: 'Using with negative weights, wrong priority',
    astar: 'Non-admissible heuristic, overestimating h(n)',
  },
  {
    criteria: 'Best For',
    bfs: 'Social networks, shortest path (unweighted)',
    dfs: 'Cycle detection, maze puzzles',
    dijkstra: 'GPS without direction info, network routing',
    astar: 'Game pathfinding, robotics, maps with goal',
  },
  {
    criteria: 'Exam Popularity',
    bfs: <Badge>Very High</Badge>,
    dfs: <Badge>Very High</Badge>,
    dijkstra: <Badge>High</Badge>,
    astar: <Badge>Medium</Badge>,
  },
  {
    criteria: 'Industry Usage',
    bfs: <Badge variant="outline">Common</Badge>,
    dfs: <Badge variant="outline">Common</Badge>,
    dijkstra: <Badge variant="outline">Very Common</Badge>,
    astar: <Badge variant="outline">Very Common</Badge>,
  },
];

export const AlgorithmComparison: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="h-5 w-5" />
          Algorithm Comparison Table
        </CardTitle>
        <CardDescription>
          Complete side-by-side comparison of BFS, DFS, Dijkstra, and A* algorithms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border">
          <div className="min-w-[800px]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card z-10 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold border-r bg-muted/50">Criteria</th>
                  <th className="text-center p-3 font-semibold border-r bg-cyan-500/10">BFS</th>
                  <th className="text-center p-3 font-semibold border-r bg-purple-500/10">DFS</th>
                  <th className="text-center p-3 font-semibold border-r bg-amber-500/10">Dijkstra</th>
                  <th className="text-center p-3 font-semibold bg-green-500/10">A*</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={cn('border-b', index % 2 === 0 && 'bg-muted/20')}
                  >
                    <td className="p-3 font-medium border-r bg-muted/30">{row.criteria}</td>
                    <td className="p-3 border-r text-center">{row.bfs}</td>
                    <td className="p-3 border-r text-center">{row.dfs}</td>
                    <td className="p-3 border-r text-center">{row.dijkstra}</td>
                    <td className="p-3 text-center">{row.astar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckIcon /> Supported/Yes
          </div>
          <div className="flex items-center gap-1">
            <XIcon /> Not Supported/No
          </div>
          <div className="flex items-center gap-1">
            <PartialIcon /> Partial/Conditional
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
