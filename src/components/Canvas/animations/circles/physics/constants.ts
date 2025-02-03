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
  get ELASTICITY(){
    return isMobileDevice() ? 0.8 : 0.7;
  },
  
  // Reduced friction to maintain momentum
  FRICTION: 0.998, // 0.998
  
  // Reduced boundary elasticity for natural bounces
  get BOUNDARY_ELASTICITY() {
    return isMobileDevice() ? 0.5 : 1;
  },
  
  // Collision resolution
  get POSITION_CORRECTION_PERCENT() {
    return isMobileDevice() ? 0.25 : 0.2;
  },

  get ALLOWED_PENETRATION() {
    return isMobileDevice() ? 0.01 : 0.1;
  },

  // Force visualization threshold
  get FORCE_THRESHOLD() {
    return isMobileDevice() ? 0.05 : 0.01;
  } 
} as const;