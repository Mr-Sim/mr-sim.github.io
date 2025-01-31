export type AnimationType = 'squares' | 'circles' | 'none';

export interface AnimationInfo {
  type: AnimationType;
  name: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Vector {
  a: Point;
  b: Point;
}

export interface CanvasBackgroundProps {
  type: AnimationType;
  backgroundColor: string;
}

export interface Square {
  size: number;
  position: Point;
  targetPosition: Point;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  targetOpacity?: number; // Added for fade-in effect
}