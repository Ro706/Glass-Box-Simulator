import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Box, 
  Play, 
  Layers, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Search,
  Route,
  Zap
} from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-hero shadow-glow mb-4">
              <Box className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Algorithmic{' '}
              <span className="text-gradient">Glass Box</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Stop learning algorithms as black boxes. Watch BFS, DFS, Dijkstra, and A* 
              unfold step by step with real-time explanations.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/simulator">
                <Button size="lg" className="gap-2 bg-gradient-hero hover:opacity-90 text-white font-semibold px-8">
                  <Play className="h-5 w-5" />
                  Launch Simulator
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Turn Algorithms into Transparent Glass Boxes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gain deep intuition about how pathfinding algorithms work, 
              which one to choose, and why.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Layers className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-lg font-semibold">Live Data Structures</h3>
              <p className="text-sm text-muted-foreground">
                Watch queues, stacks, and priority queues update in real-time 
                as the algorithm progresses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold">Step-by-Step Explanations</h3>
              <p className="text-sm text-muted-foreground">
                Every step is narrated in plain English. Understand why each 
                node is chosen.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold">Node Inspection</h3>
              <p className="text-sm text-muted-foreground">
                Click any cell to see its g-cost, h-cost, f-cost, and parent node. 
                See why it was visited.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Route className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold">4 Algorithms</h3>
              <p className="text-sm text-muted-foreground">
                BFS, DFS, Dijkstra, and A* — each with unique characteristics 
                and use cases explained.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold">Interactive Grid</h3>
              <p className="text-sm text-muted-foreground">
                Draw walls, set start/end points, generate random mazes, 
                and control playback speed.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">Algorithm Summaries</h3>
              <p className="text-sm text-muted-foreground">
                Learn when to use each algorithm, their strengths, weaknesses, 
                and complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithms Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Compare Algorithms</h2>
            <p className="text-muted-foreground">
              Each algorithm has unique trade-offs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'BFS', color: 'bg-cyan-500', desc: 'Shortest path (unweighted)' },
              { name: 'DFS', color: 'bg-purple-500', desc: 'Memory efficient' },
              { name: 'Dijkstra', color: 'bg-amber-500', desc: 'Shortest path (weighted)' },
              { name: 'A*', color: 'bg-emerald-500', desc: 'Optimal + heuristic' },
            ].map((algo) => (
              <div key={algo.name} className="rounded-xl bg-card border border-border p-4 text-center">
                <div className={`w-12 h-12 rounded-lg ${algo.color} mx-auto mb-3 flex items-center justify-center text-white font-bold`}>
                  {algo.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{algo.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{algo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to See Inside?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Stop memorizing algorithms. Start understanding them.
          </p>
          <Link to="/simulator">
            <Button size="lg" variant="secondary" className="gap-2 font-semibold">
              <Play className="h-5 w-5" />
              Launch Simulator
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Algorithmic Glass Box — Built for education 🎓</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
