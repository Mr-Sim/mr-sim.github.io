import { Square, Point } from '../../types';
import { SQUARES_CONFIG as config } from '../config/squaresConfig';

export function createSquares(canvasSize: number, center: Point): Square[] {
  const baseSize = canvasSize * config.baseSize;
  
  return Array.from({ length: config.count }, (_, index) => {
    const progress = index / config.count;
    
    // Improved size reduction calculation
    const normalizedProgress = progress * config.sizeReduction.factor;
    const reduction = Math.pow(normalizedProgress, config.sizeReduction.power);
    const size = baseSize * (1 - reduction);
    
    // Ensure size doesn't go below minimum
    const finalSize = Math.max(baseSize * config.minSize, size);
    
    const opacity = config.baseOpacity - progress * config.opacityReduction;
    
    return {
      size: finalSize,
      position: { ...center },
      targetPosition: { ...center },
      rotation: 0,
      rotationSpeed: config.rotationSpeed * (1 + progress * config.rotationSpeedMultiplier),
      opacity
    };
  });
}