import React, { createContext, useContext, useCallback, useState } from 'react';
import { Point } from './types';

interface MouseContextState {
  position: Point;
  isTracking: boolean;
}

interface MouseContextValue extends MouseContextState {
  updatePosition: (position: Point) => void;
  setTracking: (isTracking: boolean) => void;
}

const MouseContext = createContext<MouseContextValue>({
  position: { x: 0, y: 0 },
  isTracking: false,
  updatePosition: () => {},
  setTracking: () => {}
});

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MouseContextState>({
    position: { x: 0, y: 0 },
    isTracking: false
  });

  const updatePosition = useCallback((position: Point) => {
    setState(prev => ({ ...prev, position }));
  }, []);

  const setTracking = useCallback((isTracking: boolean) => {
    setState(prev => ({ ...prev, isTracking }));
  }, []);

  const value = {
    ...state,
    updatePosition,
    setTracking
  };

  return (
    <MouseContext.Provider value={value}>
      {children}
    </MouseContext.Provider>
  );
}

export const useMouse = () => useContext(MouseContext);