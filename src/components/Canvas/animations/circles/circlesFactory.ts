import { Point } from '../../types';
import { Circle } from 'CirclesAnimation';
import { CIRCLES_CONFIG as config } from 'circlesConfig';

export function createCircles(canvasSize: number, center: Point): Circles[] {
  
  
  return Array.from({ length: config.count }, (_, index) => {
    const progress = index / config.count;
    const sizeReduction = Math.max(config.minSize, 1 - progress);
    const opacity = config.baseOpacity - progress * config.opacityReduction;
    
    return {
      size: baseSize * sizeReduction,
      position: { ...center },
      targetPosition: { ...center },
      rotation: 0,
      rotationSpeed: config.rotationSpeed * (1 + progress * config.rotationSpeedMultiplier),
      opacity, 
      1
    };
  });
}