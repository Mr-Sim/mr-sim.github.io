import { Point } from '../types';
import { lerpPoint } from './interpolation';

export function getDelayedPosition(
  current: Point,
  target: Point,
  index: number,
  totalSquares: number,
  deltaTime: number,
  smoothing: number
): Point {
  // Calculate delay based on index (smaller squares have more delay)
  const progress = (0.9*index) / totalSquares;
  const baseDelay = Math.max(0.02, (1-progress)); // Ensures minimum responsiveness
  
  // Apply smoothing with delay
  const delayedSmoothing = smoothing * (baseDelay) * deltaTime;
  
  return lerpPoint(current, target, delayedSmoothing);
}