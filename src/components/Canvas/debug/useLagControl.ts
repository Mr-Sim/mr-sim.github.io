import { useState, useCallback } from 'react';

export function useLagControl() {
  const [lagValue, setLagValue] = useState(50);
  const [isEnabled, setIsEnabled] = useState(true);

  const simulateLag = useCallback(() => {
    if (!isEnabled || lagValue === 0) return;

    // Calculate delay in milliseconds (exponential scaling)
    const delay = Math.pow(1.15, lagValue);
    
    // Create actual frame delay using busy waiting
    const start = performance.now();
    while (performance.now() - start < delay) {
      // Busy wait to block the main thread
      // This will actually delay the frame
      const dummy = Math.random() * Math.random();
      if (dummy === Infinity) break; // Prevent optimization
    }
  }, [lagValue, isEnabled]);

  return {
    lagValue,
    setLagValue,
    isEnabled,
    setIsEnabled,
    simulateLag
  };
}