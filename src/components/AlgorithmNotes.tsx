import React from 'react';
import { AlgorithmType } from '@/types/algorithm';
import { algorithmContent } from '@/lib/algorithmContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Workflow, Lightbulb, GraduationCap } from 'lucide-react';
import { Mermaid } from './Mermaid';

interface AlgorithmNotesProps {
  algorithm: AlgorithmType;
}

export const AlgorithmNotes: React.FC<AlgorithmNotesProps> = ({ algorithm }) => {
  const content = algorithmContent[algorithm];

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{content.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{content.definition}</p>
        </div>

        <Separator />

        {/* Pseudocode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Pseudocode
            </CardTitle>
            <CardDescription>Algorithm logic in plain language</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
              <code>{content.pseudocode}</code>
            </pre>
          </CardContent>
        </Card>

        {/* JavaScript Implementation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              JavaScript Implementation
            </CardTitle>
            <CardDescription>Production-ready code with comments</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
              <code className="language-javascript">{content.code}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Flow Diagram */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              Algorithm Flow
            </CardTitle>
            <CardDescription>Visual representation of the algorithm logic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/50 rounded-lg overflow-hidden">
              <Mermaid chart={content.flowDiagram} />
            </div>
          </CardContent>
        </Card>

        {/* Real-World Use Cases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Real-World Applications
            </CardTitle>
            <CardDescription>Where is this algorithm used in practice?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.realWorldUseCases.map((useCase, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <h4 className="font-semibold">{useCase.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                  {useCase.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Worked Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Worked Example
            </CardTitle>
            <CardDescription>{content.workedExample.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {content.workedExample.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <Badge variant="secondary" className="h-6 min-w-6 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <span className="text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
