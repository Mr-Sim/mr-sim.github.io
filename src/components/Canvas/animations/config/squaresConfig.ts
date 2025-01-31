import { getResponsiveCount } from '../../utils/deviceDetection';
import { isMobileDevice } from '../../utils/deviceDetection';

const BASE_COUNT = 110;

export const SQUARES_CONFIG = {
  // Square generation
  get count() {
    return isMobileDevice() ? 40 : 110 ;
  },
  get baseSize() {
    return isMobileDevice() ? 1.4 : 1.2;
  },
  minSize: 0, // Minimum size as a percentage of baseSize
  
  // Size reduction
  sizeReduction: {
    factor: 1.1,    // Controls the range of the reduction (1.0 = full range)
    power: 0.5      // Controls the curve (1.0 = linear, >1.0 = exponential)
  },
  
  // Appearance
  baseOpacity: 0.4,
  opacityReduction: 0.2,
  strokeWidth: 2,
  
  // Animation
  rotationSpeed: 0.1,
  rotationSpeedMultiplier: 3,
  mouseInfluence: -0.23, // Reduced from -0.23 to -0.1 for subtler movement
  positionSmoothing: 0.08, // Reduced from 0.15 to 0.08 for smoother transitions
  
  // Performance
  updateInterval: 2,
  cullingMargin: 2,
  
  // Transition
  minDelay: 0.05, 
  delayMultiplier: 0.9,
  
  // Rotation updates
  rotationUpdateInterval: 15000,
  maxRotationChange: 0,
} as const;