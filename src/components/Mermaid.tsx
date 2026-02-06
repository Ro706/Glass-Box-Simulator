import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

interface MermaidProps {
  chart: string;
}

let idCount = 0;

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const id = useRef(`mermaid-${idCount++}`);
  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    });
  }, [isDark]);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart) return;
      
      try {
        setError(null);
        // We need to re-initialize because theme might have changed
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'inherit',
        });
        
        const { svg } = await mermaid.render(id.current, chart);
        setSvg(svg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram');
      }
    };

    renderChart();
  }, [chart, isDark]);

  if (error) {
    return (
      <div className="text-destructive text-sm p-4 bg-destructive/10 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div 
      className="flex justify-center w-full overflow-x-auto p-4 bg-white/5 rounded-lg"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};
