import { useEffect, useRef } from 'react';
import { useMouse } from './MouseContext';
import { throttle } from './utils/throttle';
import { Point } from './types';

const MOUSE_UPDATE_INTERVAL = 16; // ~60fps
const POSITION_THRESHOLD = 1; // Minimum movement threshold

export function useMouseTracking(isEnabled: boolean) {
  const { updatePosition, setTracking } = useMouse();
  const lastPosition = useRef<Point>({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!isEnabled) {
      setTracking(false);
      return;
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const newPosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };

        // Only update if movement exceeds threshold
        const dx = newPosition.x - lastPosition.current.x;
        const dy = newPosition.y - lastPosition.current.y;
        if (Math.abs(dx) > POSITION_THRESHOLD || Math.abs(dy) > POSITION_THRESHOLD) {
          lastPosition.current = newPosition;
          updatePosition(newPosition);
          setTracking(true);
        }
      });
    }, MOUSE_UPDATE_INTERVAL);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      setTracking(false);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isEnabled, updatePosition, setTracking]);
}