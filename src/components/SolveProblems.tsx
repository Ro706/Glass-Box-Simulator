import React, { useState, useMemo } from 'react';
import { AlgorithmType } from '@/types/algorithm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { ExternalLink, Code2, Trophy, Search, Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  leetcodeDatabase,
  getDifficultyColor,
  getDifficultyIcon,
  getDifficultyValue,
  LeetCodeProblem,
} from '@/lib/leetcodeProblems';

interface SolveProblemsProps {
  algorithm: AlgorithmType;
}

export const SolveProblems: React.FC<SolveProblemsProps> = ({ algorithm }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Easy']));

  const allProblems = useMemo(() => {
    const problems = leetcodeDatabase[algorithm];
    return Object.entries(problems).flatMap(([, problemList]) => problemList);
  }, [algorithm]);

  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [allProblems, searchQuery, selectedDifficulty]);

  const groupedProblems = useMemo(() => {
    const grouped: Record<string, LeetCodeProblem[]> = {
      Easy: [],
      Medium: [],
      Hard: [],
    };

    filteredProblems.forEach((problem) => {
      grouped[problem.difficulty].push(problem);
    });

    // Sort by difficulty within each group and by acceptance
    Object.keys(grouped).forEach((difficulty) => {
      grouped[difficulty].sort((a, b) => b.acceptance - a.acceptance);
    });

    return grouped;
  }, [filteredProblems]);

  const toggleCategory = (category: string) => {
    const newCategories = new Set(expandedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setExpandedCategories(newCategories);
  };

  const statsCount = {
    Easy: groupedProblems.Easy.length,
    Medium: groupedProblems.Medium.length,
    Hard: groupedProblems.Hard.length,
  };

  const totalProblems = Object.values(statsCount).reduce((a, b) => a + b, 0);

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-7 w-7" />
            LeetCode Practice
          </h2>
          <p className="text-muted-foreground">
            {totalProblems} curated problems to master {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems by title, description, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', showFilters && 'transform rotate-180')}
              />
            </Button>

            {/* Difficulty Filter Buttons */}
            {showFilters && (
              <div className="flex gap-2 ml-auto">
                {(['All', 'Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={cn(
                      selectedDifficulty === difficulty && [
                        difficulty === 'Easy' && 'bg-green-600 hover:bg-green-700',
                        difficulty === 'Medium' && 'bg-yellow-600 hover:bg-yellow-700',
                        difficulty === 'Hard' && 'bg-red-600 hover:bg-red-700',
                      ]
                    )}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>🟢 {statsCount.Easy} Easy</span>
            <span>🟡 {statsCount.Medium} Medium</span>
            <span>🔴 {statsCount.Hard} Hard</span>
          </div>
        </div>

        {/* Problems by Difficulty */}
        {['Easy', 'Medium', 'Hard'].map((difficulty) => {
          const problems = groupedProblems[difficulty as keyof typeof groupedProblems];
          if (problems.length === 0) return null;

          const isExpanded = expandedCategories.has(difficulty);

          return (
            <Card key={difficulty} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => toggleCategory(difficulty)}
              >
                <CardTitle className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <span>{getDifficultyIcon(difficulty as any)}</span>
                    <Code2 className="h-5 w-5" />
                    {difficulty} Level Problems
                  </div>
                  <ChevronDown
                    className={cn('h-5 w-5 transition-transform', isExpanded && 'transform rotate-180')}
                  />
                </CardTitle>
                <CardDescription>
                  {problems.length} problem{problems.length !== 1 ? 's' : ''} • Avg acceptance:{' '}
                  {(problems.reduce((sum, p) => sum + p.acceptance, 0) / problems.length).toFixed(1)}%
                </CardDescription>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-3">
                  {problems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-start gap-2">
                          <span className="text-lg flex-shrink-0">{getDifficultyIcon(problem.difficulty)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 justify-between mb-1">
                              <h4 className="font-semibold text-base break-words">{problem.title}</h4>
                              <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                                #{problem.id}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{problem.description}</p>
                          </div>
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <Badge
                            variant="outline"
                            className={cn('text-xs', getDifficultyColor(problem.difficulty))}
                          >
                            {problem.difficulty}
                          </Badge>

                          {/* Acceptance Rate */}
                          <Badge variant="secondary" className="text-xs">
                            {problem.acceptance}% accepted
                          </Badge>

                          {/* Topics */}
                          {problem.topics.slice(0, 2).map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs bg-blue-500/10">
                              {topic}
                            </Badge>
                          ))}
                          {problem.topics.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{problem.topics.length - 2}</span>
                          )}
                        </div>
                      </div>

                      {/* Solve Button */}
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2 flex-shrink-0"
                        onClick={() => window.open(problem.url, '_blank', 'noopener,noreferrer')}
                      >
                        Solve
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          );
        })}

        {/* Empty State */}
        {totalProblems === 0 && (
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-2">No problems found matching your filters</p>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pro Tips */}
        <Card className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>💡</span>
              Problem-Solving Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">When to use {algorithm.toUpperCase()}:</h4>
                {algorithm === 'bfs' && (
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Finding shortest path in unweighted graphs</li>
                    <li>Level-order tree traversal</li>
                    <li>Multi-source shortest path</li>
                  </ul>
                )}
                {algorithm === 'dfs' && (
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Tree/graph traversal (any path)</li>
                    <li>Detecting cycles</li>
                    <li>Topological sorting</li>
                  </ul>
                )}
                {algorithm === 'dijkstra' && (
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Weighted graphs with non-negative weights</li>
                    <li>Single-source shortest path</li>
                    <li>Network optimization</li>
                  </ul>
                )}
                {algorithm === 'astar' && (
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Pathfinding with good heuristic available</li>
                    <li>Game AI and navigation</li>
                    <li>More efficient than Dijkstra with admissible heuristic</li>
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">General Tips:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Always identify the graph structure first</li>
                  <li>Consider time & space complexity</li>
                  <li>Start with Easy problems for warmup</li>
                  <li>Practice explaining your approach</li>
                  <li>Test edge cases before submitting</li>
                  <li>Review solutions after solving</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Stats */}
        <Card className="bg-muted/50 border-muted">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{statsCount.Easy}</div>
                <div className="text-xs text-muted-foreground mt-1">Easy Problems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{statsCount.Medium}</div>
                <div className="text-xs text-muted-foreground mt-1">Medium Problems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{statsCount.Hard}</div>
                <div className="text-xs text-muted-foreground mt-1">Hard Problems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalProblems}</div>
                <div className="text-xs text-muted-foreground mt-1">Total Problems</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
