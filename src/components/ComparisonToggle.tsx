import React from 'react';
import { useComparisonStore } from '@/store/comparisonStore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Columns2 } from 'lucide-react';

export const ComparisonToggle: React.FC = () => {
  const { isComparisonMode, setComparisonMode } = useComparisonStore();

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="comparison-mode"
        checked={isComparisonMode}
        onCheckedChange={setComparisonMode}
      />
      <Label 
        htmlFor="comparison-mode" 
        className="flex items-center gap-1.5 text-sm cursor-pointer"
      >
        <Columns2 className="h-4 w-4" />
        Compare
      </Label>
    </div>
  );
};
