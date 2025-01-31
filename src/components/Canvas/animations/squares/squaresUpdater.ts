import { Square, Point } from '../../types';
import { AnimationState } from '../base/BaseAnimation';
import { SQUARES_CONFIG as config } from '../config/squaresConfig';
import { getDelayedPosition } from '../../utils/transition';

export function updateSquares(
  squares: Square[],
  state: AnimationState,
  deltaTime: number
): void {
  const adjustedCenter = getAdjustedCenter(state);
  const totalSquares = squares.length;
  
  squares.forEach((square, index) => {
    if (!square) return;
    
    const targetPosition = calculateTargetPosition(
      index,
      totalSquares,
      adjustedCenter,
      state
    );
    
    square.position = getDelayedPosition(
      square.position,
      targetPosition,
      index,
      totalSquares,
      deltaTime,
      config.positionSmoothing
    );
    
    square.targetPosition = targetPosition;
  });
}

function getAdjustedCenter({ center, mouse, isTracking }: AnimationState): Point {
  if (!isTracking || !mouse) return center;
  
  return {
    x: center.x + (mouse.x - center.x) * config.mouseInfluence,
    y: center.y + (mouse.y - center.y) * config.mouseInfluence
  };
}

function calculateTargetPosition(
  index: number,
  total: number,
  targetCenter: Point,
  {center, mouse, isTracking }: AnimationState
): Point {
  if (!isTracking || !mouse) return targetCenter;
  
  const progress = index / total;
  const delay = progress * progress + config.minDelay;
  const displacedCenter = {
    x: targetCenter.x + ((mouse.x - center.x) * (0.02*index)),
    y: targetCenter.y + ((mouse.y - center.y) * (0.02*index)),
  };
  
  return {
    x: displacedCenter.x + (mouse.x - displacedCenter.x) * delay,
    y: displacedCenter.y + (mouse.y - displacedCenter.y) * delay
  };
}