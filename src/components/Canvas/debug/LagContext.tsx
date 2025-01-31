import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface LagContextValue {
  lagValue: number;
  setLagValue: React.Dispatch<React.SetStateAction<number>>;
  isEnabled: boolean;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  simulateLag: () => void;
}

const LagContext = createContext<LagContextValue | null>(null);

export function LagProvider({ children }: { children: React.ReactNode }) {
  const [lagValue, setLagValue] = useState(0);
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

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    lagValue,
    setLagValue,
    isEnabled,
    setIsEnabled,
    simulateLag
  }), [lagValue, isEnabled, simulateLag]);

  return (
    <LagContext.Provider value={value}>
      {children}
    </LagContext.Provider>
  );
}

export function useLag() {
  const context = useContext(LagContext);
  if (!context) {
    throw new Error('useLag must be used within a LagProvider');
  }
  return context;
}