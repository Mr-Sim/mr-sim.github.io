import { PHYSICS_CONSTANTS } from './physics/constants';
import { getResponsiveCount } from '../../utils/deviceDetection';
import { isMobileDevice } from '../../utils/deviceDetection';

const BASE_COUNT = 25;

export const CIRCLES_CONFIG = {
  // Physics
  ...PHYSICS_CONSTANTS,
  
  // Circles
  get count() {
    return getResponsiveCount(BASE_COUNT);
  },
  get maxInitialVelocity() {
    return isMobileDevice() ? 1.2 : 4.5;
  },
  get minRadius() {
    return window.innerWidth <= 768 ? 3 : 10;
  },
  get maxRadius() {
    return window.innerWidth <= 768 ? 10 : 45;
  },
  get spawnRadius() {
    return isMobileDevice() ? 0.4 : 0.4; // 0.5 = double radius for mobile
  },
  
  // Colors
  baseColor: { r: 255, g: 255, b: 255 },
  opacity: 0.8,

  get lineThickness(){
    return isMobileDevice() ?  0.02 : 2;
  },

  get MAX_SPEED() { return isMobileDevice() ? 10 : 50; },
  
  // Boundaries
  boundaryMode: 'bounce' as const,
  
  // Performance
  updateInterval: 1
} as const;