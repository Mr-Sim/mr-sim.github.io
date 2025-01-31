import { Square, Point } from './types';
import { AnimationController } from './animation/AnimationController';
import { getCanvasCenter } from './utils/position';

const controllers = new Map<Square[], AnimationController>();

export function createSquares(canvasSize: number): Square[] {
  const baseSize = canvasSize * Math.SQRT2;
  const center = getCanvasCenter(canvasSize, canvasSize);
  
  const squares: Square[] = Array.from({ length: 100 }, (_, index) => {
    const progress = index / 100;
    const sizeReductionFactor = (1-progress);
    const opacity = 0.5 - progress * 0.4;

    return {
      size: baseSize * sizeReductionFactor,
      position: { ...center },
      targetPosition: { ...center },
      rotation: 0,
      rotationSpeed: 0.1 * (1 + progress * 2) * (Math.PI / 180),
      opacity
    };
  });

  controllers.set(squares, new AnimationController(squares));
  return squares;
}

export function updateSquares(
  squares: Square[],
  center: Point,
  mouse: Point | null,
  isTracking: boolean
): void {
  const controller = controllers.get(squares);
  if (!controller) {
    controllers.set(squares, new AnimationController(squares));
    return;
  }
  
  controller.update(performance.now(), center, mouse, isTracking);
}

export function cleanupSquares(squares: Square[]): void {
  controllers.delete(squares);
}