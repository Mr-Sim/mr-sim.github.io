import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { useAnimationFrame } from './hooks/useAnimationFrame';
import { useMouseTracking } from './useMouseTracking';
import { CanvasBackgroundProps } from './types';
import { SquaresAnimation } from './animations/squares/SquaresAnimation';
import { CirclesAnimation } from './animations/circles/CirclesAnimation';
import { usePosition } from './PositionContext';
import { useMouse } from './MouseContext';
import { useFPS } from './hooks/useFPS';
import { useLag } from './debug/LagContext';
import { LagController } from './debug/LagController';

const MIN_FPS = 30; // Minimum acceptable FPS before frame skipping

export function CanvasBackground({ 
  type, 
  backgroundColor
}: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<SquaresAnimation | CirclesAnimation>();
  const lastFrameTime = useRef<number>(0);
  const frameSkipCount = useRef<number>(0);
  const { position: centerPosition } = usePosition();
  const { position: mousePosition, isTracking } = useMouse();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fps = useFPS();
  const debug = false;
  const { simulateLag } = useLag();

  const { setupCanvas } = useCanvasSetup(canvasRef);
  useMouseTracking(type === 'squares' || type === 'circles');

  // Memoize animation state to prevent unnecessary object creation
  const animationState = useMemo(() => ({
    time: performance.now(),
    deltaTime: 1,
    center: centerPosition,
    mouse: mousePosition,
    isTracking
  }), [centerPosition, mousePosition, isTracking]);

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 50);
    return () => clearTimeout(timeout);
  }, [type]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.cleanup();
        animationRef.current = undefined;
      }
    };
  }, [type]);

  const renderFrame = useCallback(() => {
    if (isTransitioning) return;
    
    const currentTime = performance.now();
    const deltaTime = lastFrameTime.current ? (currentTime - lastFrameTime.current) / 16 : 1;
    
    // Frame skipping logic
    if (fps < MIN_FPS) {
      frameSkipCount.current++;
      if (frameSkipCount.current % 2 !== 0) {
        return;
      }
    } else {
      frameSkipCount.current = 0;
    }

    const setup = setupCanvas();
    if (!setup) return;
    const { ctx, width, height } = setup;

    // Simulate lag at the start of each frame
    simulateLag();

    // Clear with background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Update animation state time
    animationState.time = currentTime;
    animationState.deltaTime = deltaTime;

    if (type === 'squares') {
      if (!animationRef.current || !(animationRef.current instanceof SquaresAnimation)) {
        if (animationRef.current) {
          animationRef.current.cleanup();
        }
        animationRef.current = new SquaresAnimation(Math.max(width, height));
      }
    } else if (type === 'circles') {
      if (!animationRef.current || !(animationRef.current instanceof CirclesAnimation)) {
        if (animationRef.current) {
          animationRef.current.cleanup();
        }
        animationRef.current = new CirclesAnimation(width, height);
      }
    }

    if (animationRef.current) {
      animationRef.current.update(animationState);
      animationRef.current.render(ctx);
    }

    // Draw FPS counter
    if(debug){
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '12px monospace';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`FPS: ${fps}`, 10, height - 10);
      ctx.restore();
    }

    lastFrameTime.current = currentTime;
  }, [backgroundColor, animationState, setupCanvas, type, isTransitioning, fps, simulateLag]);

  useAnimationFrame(renderFrame);

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          imageRendering: 'pixelated',
          zIndex: 0,
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 150ms ease-in-out',
          willChange: 'transform' // Optimize for animations
        }}
      />
      {/*
      <LagController />
      */}

    </>
  );
}