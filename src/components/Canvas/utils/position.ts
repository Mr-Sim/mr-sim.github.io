import { Point } from '../types';

export function getCanvasCenter(width: number, height: number): Point {
  const dpr = window.devicePixelRatio || 1;
  return {
    x: width / (2 * dpr),
    y: height / (2 * dpr)
  };
}

export function getEffectiveDimensions(width: number, height: number): { width: number; height: number } {
  const dpr = window.devicePixelRatio || 1;
  return { 
    width: width / dpr,
    height: height / dpr 
  };
}

export function screenToCanvasPosition(screenX: number, screenY: number, canvas: HTMLCanvasElement): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: screenX - rect.left,
    y: screenY - rect.top
  };
}