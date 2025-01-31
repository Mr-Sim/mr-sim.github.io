import { Point } from '../../types';

export interface Circle {
  position: Point;
  velocity: Point;
  radius: number;
  mass: number;
  color: string;
  targetOpacity?: number;
  repultion: number;
}

export interface CollisionEvent {
  circle1: Circle;
  circle2: Circle;
  collisionPoint: Point;
}