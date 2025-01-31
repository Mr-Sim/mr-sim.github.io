import { isMobileDevice } from '../../../utils/deviceDetection';

export const PHYSICS_CONSTANTS = {
  // Gravity constant adjusted for mobile
  get G() {
    return isMobileDevice() ? 10 : 100; // Half the gravity on mobile
  },
  
  // Minimum distance increased for mobile
  get MIN_DISTANCE() {
    return isMobileDevice() ? 10 : 20;
  },
  
  // High elasticity for bouncy collisions
  ELASTICITY: 0.7,
  
  // Reduced friction to maintain momentum
  FRICTION: 0.998, // 0.998
  
  // Reduced boundary elasticity for natural bounces
  BOUNDARY_ELASTICITY: 1.1,
  
  // Collision resolution
  POSITION_CORRECTION_PERCENT: 0.2,
  ALLOWED_PENETRATION: 0.01,

  // Force visualization threshold
  get FORCE_THRESHOLD() {
    return isMobileDevice() ? 0.05 : 0.01;
  } 
} as const;