import { useEffect } from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';

export const useMobileGrid = () => {
  const { setGridSize, gridSize } = useSimulatorStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // If mobile and grid is default large size, resize it
      if (width < 640) {
         // Mobile: 15 rows, 10 cols fits better
         if (gridSize.cols > 15) {
             setGridSize(15, 12);
         }
      } else if (width < 1024) {
          // Tablet
          if (gridSize.cols > 20) {
              setGridSize(15, 20);
          }
      }
    };

    // Run once on mount
    handleResize();

    // Optional: We could listen to resize, but resetting the grid 
    // destructive to user progress, so maybe just on load is safer.
  }, []); // Empty dependency array to run only on mount
};
