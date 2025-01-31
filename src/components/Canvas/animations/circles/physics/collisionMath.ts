import { Point } from '../../../types';

// Separate collision math utilities for reusability
export function calculateCollisionNormal(p1: Point, p2: Point): Point {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return {
    x: dx / distance,
    y: dy / distance
  };
}

export function calculateRelativeVelocity(v1: Point, v2: Point, normal: Point): number {
  return (v1.x - v2.x) * normal.x + (v1.y - v2.y) * normal.y;
}

export function calculateImpulse(
  relativeVelocity: number,
  elasticity: number,
  mass1: number,
  mass2: number
): number {
  const velocityAlongNormal = relativeVelocity;
  return (-(1 + elasticity) * velocityAlongNormal) / (1/mass1 + 1/mass2);
}