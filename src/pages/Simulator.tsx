import React from 'react';
import { GridCanvas } from '@/components/GridCanvas';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { PlaybackControls } from '@/components/PlaybackControls';
import { GridControls } from '@/components/GridControls';
import { DataStructureViewer } from '@/components/DataStructureViewer';
import { ExplanationPanel } from '@/components/ExplanationPanel';
import { MetricsDisplay } from '@/components/MetricsDisplay';
import { NodeInspector } from '@/components/NodeInspector';
import { AlgorithmSummary } from '@/components/AlgorithmSummary';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { ComparisonToggle } from '@/components/ComparisonToggle';
import { AlgorithmNotes } from '@/components/AlgorithmNotes';
import { AlgorithmComparison } from '@/components/AlgorithmComparison';
import { SolveProblems } from '@/components/SolveProblems';
import { AlgorithmTutor } from '@/components/AlgorithmTutor';
import { DSANotes } from '@/components/DSANotes';
import { useSimulatorStore } from '@/store/simulatorStore';
import { useComparisonStore } from '@/store/comparisonStore';
import { useMobileGrid } from '@/hooks/useMobileGrid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Box, 
  Play,
  BookOpen,
  Settings,
  Layers,
  Info,
  GraduationCap,
  Code2,
  GitCompare,
  BookMarked
} from 'lucide-react';

const Simulator: React.FC = () => {
  useMobileGrid();
  const { loadDemoGrid, runAlgorithm, algorithm } = useSimulatorStore();
  const { isComparisonMode, runComparison, setBaseGrid } = useComparisonStore();
  const { grid } = useSimulatorStore();
  const [activeView, setActiveView] = React.useState<'simulator' | 'dsa-notes' | 'information' | 'practice' | 'compare'>('simulator');

  const handleRunDemo = () => {
    loadDemoGrid();
    setTimeout(() => {
      if (isComparisonMode) {
        setBaseGrid(grid);
        runComparison();
      } else {
        runAlgorithm();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shrink-0">
                <Box className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  Algorithmic Glass Box
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  See inside pathfinding algorithms
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              {!isComparisonMode && activeView === 'simulator' && <AlgorithmSelector />}
              
              {activeView === 'simulator' && <ComparisonToggle />}
              
              {activeView === 'simulator' && (
                <Button 
                  onClick={handleRunDemo} 
                  variant="outline" 
                  size="sm"
                  className="gap-2 shrink-0"
                >
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">Run Demo</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation Panel */}
          <aside className="lg:col-span-2">
            <div className="rounded-xl bg-card border border-border p-2 space-y-2 sticky top-24">
              <Button
                variant={activeView === 'simulator' ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('simulator')}
              >
                <Play className="h-4 w-4" />
                Simulator
              </Button>
              <Button
                variant={activeView === 'dsa-notes' ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('dsa-notes')}
              >
                <BookMarked className="h-4 w-4" />
                DSA Notes
              </Button>
              <Button
                variant={activeView === 'information' ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('information')}
              >
                <GraduationCap className="h-4 w-4" />
                Information
              </Button>
              <Button
                variant={activeView === 'practice' ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('practice')}
              >
                <Code2 className="h-4 w-4" />
                Practice
              </Button>
              <Button
                variant={activeView === 'compare' ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('compare')}
              >
                <GitCompare className="h-4 w-4" />
                Compare
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-10">
            {/* Full Page Views */}
            {activeView === 'dsa-notes' && (
              <div className="rounded-xl bg-card border border-border">
                <DSANotes />
              </div>
            )}

            {activeView === 'information' && (
              <div className="rounded-xl bg-card border border-border">
                <AlgorithmNotes algorithm={algorithm} />
              </div>
            )}

            {activeView === 'practice' && (
              <div className="rounded-xl bg-card border border-border">
                <SolveProblems algorithm={algorithm} />
              </div>
            )}

            {activeView === 'compare' && (
              <div className="space-y-6">
                <AlgorithmComparison />
              </div>
            )}

            {/* Simulator View */}
            {activeView === 'simulator' && (
              <>
                {isComparisonMode ? (
          /* Comparison Mode Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar - Grid Controls only */}
            <aside className="lg:col-span-2 space-y-6">
              <div className="rounded-xl bg-card border border-border p-4">
                <GridControls />
              </div>
            </aside>

            {/* Center - Comparison View */}
            <section className="lg:col-span-10">
              <div className="rounded-xl bg-card border border-border p-4">
                <ComparisonPanel />
              </div>
            </section>
          </div>
        ) : (
          /* Single Algorithm Mode Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar - Controls */}
            <aside className="lg:col-span-3 space-y-6">
              <div className="rounded-xl bg-card border border-border p-4">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Controls
                </h2>
                <PlaybackControls />
              </div>

              <div className="rounded-xl bg-card border border-border p-4">
                <GridControls />
              </div>
            </aside>

            {/* Center - Grid visualization */}
            <section className="lg:col-span-6">
              <div className="space-y-4">
                <GridCanvas />
                <MetricsDisplay />
              </div>
            </section>

            {/* Right sidebar - Information panels */}
            <aside className="lg:col-span-3">
              <Tabs defaultValue="explanation" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="explanation" className="text-xs gap-1">
                    <BookOpen className="h-3 w-3" />
                    Steps
                  </TabsTrigger>
                  <TabsTrigger value="data" className="text-xs gap-1">
                    <Layers className="h-3 w-3" />
                    Data
                  </TabsTrigger>
                  <TabsTrigger value="info" className="text-xs gap-1">
                    <Info className="h-3 w-3" />
                    Info
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="explanation" className="mt-4 space-y-4">
                  <ExplanationPanel />
                  <div className="rounded-xl bg-card border border-border p-4">
                    <h3 className="font-medium mb-3 text-sm">Node Inspector</h3>
                    <NodeInspector />
                  </div>
                </TabsContent>

                <TabsContent value="data" className="mt-4">
                  <div className="rounded-xl bg-card border border-border p-4">
                    <h3 className="font-medium mb-3 text-sm flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Data Structure
                    </h3>
                    <DataStructureViewer />
                  </div>
                </TabsContent>

                <TabsContent value="info" className="mt-4">
                  <div className="rounded-xl bg-card border border-border p-4">
                    <AlgorithmSummary />
                  </div>
                </TabsContent>
              </Tabs>
            </aside>
          </div>
        )}
              </>
            )}
          </div>
        </div>
        <AlgorithmTutor />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>
            Built for education — Turn algorithms into transparent glass boxes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Simulator;
