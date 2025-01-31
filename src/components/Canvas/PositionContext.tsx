import React, { createContext, useContext, useCallback, useState } from 'react';
import { Point } from './types';

interface PositionContextValue {
  position: Point;
  updatePosition: (position: Point) => void;
}

const PositionContext = createContext<PositionContextValue>({
  position: { x: 0, y: 0 },
  updatePosition: () => {}
});

export function PositionProvider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const updatePosition = useCallback((newPosition: Point) => {
    setPosition(newPosition);
  }, []);

  return (
    <PositionContext.Provider value={{ position, updatePosition }}>
      {children}
    </PositionContext.Provider>
  );
}

export const usePosition = () => useContext(PositionContext);