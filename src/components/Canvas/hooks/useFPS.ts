import { useState, useEffect, useRef } from 'react';

const FPS_UPDATE_INTERVAL = 100; // Update every 100ms instead of 1000ms

export function useFPS() {
  const [fps, setFPS] = useState(0);
  const frames = useRef(0);
  const lastTime = useRef(performance.now());
  const requestRef = useRef<number>();

  useEffect(() => {
    const updateFPS = () => {
      const currentTime = performance.now();
      frames.current++;

      if (currentTime >= lastTime.current + FPS_UPDATE_INTERVAL) {
        // Calculate FPS based on the shorter interval
        setFPS(Math.round(frames.current * 1000 / (currentTime - lastTime.current)));
        frames.current = 0;
        lastTime.current = currentTime;
      }

      requestRef.current = requestAnimationFrame(updateFPS);
    };

    requestRef.current = requestAnimationFrame(updateFPS);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return fps;
}