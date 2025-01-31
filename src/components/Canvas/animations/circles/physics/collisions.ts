import { Circle } from '../types';
import { PHYSICS_CONSTANTS as constants } from './constants';
import { 
  calculateCollisionNormal,
  calculateRelativeVelocity,
  calculateImpulse
} from './collisionMath';

export function resolveCollision(circle1: Circle, circle2: Circle, blob: boolean): void {
  // Calculate collision normal
  const normal = calculateCollisionNormal(circle1.position, circle2.position);
  
  // Calculate relative velocity
  const relativeVelocity = calculateRelativeVelocity(
    circle1.velocity,
    circle2.velocity,
    normal
  );
  
  // Only resolve if objects are moving towards each other
  if (relativeVelocity > 0) return;
  
  // Calculate impulse scalar
  let impulse = calculateImpulse(
    relativeVelocity,
    constants.ELASTICITY,
    circle1.mass,
    circle2.mass
  );

  if(blob){
    impulse *= 2;
  }

  // Apply impulse
  const impulseX = impulse * normal.x;
  const impulseY = impulse * normal.y;
  
  circle1.velocity.x += (impulseX / circle1.mass);
  circle1.velocity.y += (impulseY / circle1.mass);
  circle2.velocity.x -= (impulseX / circle2.mass);
  circle2.velocity.y -= (impulseY / circle2.mass);
  
  // Position correction to prevent sinking
  const penetrationDepth = (circle1.radius + circle2.radius) - 
    Math.sqrt(
      Math.pow(circle2.position.x - circle1.position.x, 2) +
      Math.pow(circle2.position.y - circle1.position.y, 2)
    );
  
  if (penetrationDepth > 0) {
    const percent = 0.2; // penetration resolution percentage
    const slop = 0.1; // allowed penetration
    const correction = Math.max(penetrationDepth - slop, 0) / (1/circle1.mass + 1/circle2.mass) * percent;
    
    const correctionX = normal.x * correction;
    const correctionY = normal.y * correction;
    
    circle1.position.x -= correctionX / circle1.mass;
    circle1.position.y -= correctionY / circle1.mass;
    circle2.position.x += correctionX / circle2.mass;
    circle2.position.y += correctionY / circle2.mass;
  }
}