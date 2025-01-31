import { Circle } from '../types';
import { PHYSICS_CONSTANTS as constants } from './constants';

export function handleBoundaries(circle: Circle, width: number, height: number): void {
  // Handle horizontal boundaries
  if (circle.position.x - circle.radius < 0) {
    circle.position.x = circle.radius;
    circle.velocity.x *= -constants.BOUNDARY_ELASTICITY;
  } else if (circle.position.x + circle.radius > width) {
    circle.position.x = width - circle.radius;
    circle.velocity.x *= -constants.BOUNDARY_ELASTICITY;
  }

  // Handle vertical boundaries
  if (circle.position.y - circle.radius < 0) {
    circle.position.y = circle.radius;
    circle.velocity.y *= -constants.BOUNDARY_ELASTICITY;
  } else if (circle.position.y + circle.radius > height) {
    circle.position.y = height - circle.radius;
    circle.velocity.y *= -constants.BOUNDARY_ELASTICITY;
  }
}