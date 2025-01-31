import { useCallback, useEffect, useRef, RefObject } from 'react';

interface CanvasSetupOptions {
  devicePixelRatio?: number;
}

export function useCanvasSetup(
  canvasRef: RefObject<HTMLCanvasElement>,
  options: CanvasSetupOptions = {}
) {
  const { devicePixelRatio = window.devicePixelRatio || 1 } = options;
  const resizeTimeoutRef = useRef<number>();
  const lastDimensions = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      willReadFrequently: false
    });
    if (!ctx) return null;

    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    // Only resize if dimensions actually changed
    if (width !== lastDimensions.current.width || 
        height !== lastDimensions.current.height) {
      
      lastDimensions.current = { width, height };
      
      // Set physical pixel dimensions
      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      
      // Reset transform
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    return { ctx, width, height };
  }, [devicePixelRatio]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        window.cancelAnimationFrame(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = window.requestAnimationFrame(() => {
        setupCanvas();
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        window.cancelAnimationFrame(resizeTimeoutRef.current);
      }
    };
  }, [setupCanvas]);

  return { setupCanvas };
}