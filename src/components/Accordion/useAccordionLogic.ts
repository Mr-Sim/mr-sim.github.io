import { useState, useCallback } from 'react';

export function useAccordionLogic(totalSections: number) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    if (index === expandedIndex) {
      setPreviousIndex(expandedIndex);
      
      const topIndex = expandedIndex - 1;
      const bottomIndex = expandedIndex + 1;
      
      // Case 1: Previously closed section is just above current
      if (previousIndex === topIndex) {
        // Open bottom section if it exists, otherwise open top section
        if (bottomIndex < totalSections) {
          setExpandedIndex(bottomIndex);
        } else if (topIndex >= 0) {
          setExpandedIndex(topIndex);
        }
      }
      // Case 2: No section above current
      else if (topIndex < 0) {
        // Open bottom section if it exists
        if (bottomIndex < totalSections) {
          setExpandedIndex(bottomIndex);
        }
      }
      // Case 3: No section below current
      else if (bottomIndex >= totalSections) {
        // Open top section
        setExpandedIndex(topIndex);
      }
      // Case 4: Default behavior - open top section
      else {
        setExpandedIndex(topIndex);
      }
    } else {
      setPreviousIndex(expandedIndex);
      setExpandedIndex(index);
    }
  }, [expandedIndex, previousIndex, totalSections]);

  return {
    expandedIndex,
    handleToggle
  };
}