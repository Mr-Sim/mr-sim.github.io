import { Circle } from '../types';
import { Point } from '../../../types';
import { getDistance, getUnitVector } from '../utils/vectorMath';
import { PHYSICS_CONSTANTS as constants } from './constants';

function getOverlappingCirclesCount(circle: Circle, nearbyCircles: Circle[]): number {
  let count = 0;
  const totalRadius = circle.radius;
  
  for (const other of nearbyCircles) {
    if (other === circle) continue;
    const distance = getDistance(circle.position, other.position);
    if (distance < totalRadius+other.radius) {
      count++;
    }
  }
  
  return count;
}

export function calculateGravitationalForce(circle: Circle, other: Circle, nearbyCircles: Circle[]): Point {
  const distance = getDistance(circle.position, other.position);
  
  // Prevent extreme forces at very close distances
  if (distance < constants.MIN_DISTANCE) {
    return { x: 0, y: 0 };
  }


// Check for overlapping circles
  const overlappingCount = getOverlappingCirclesCount(circle, nearbyCircles);
  const totalCircles = nearbyCircles.length;
  const overlapRatio = overlappingCount / totalCircles;
  let blob = false;
  if(overlappingCount > 5){
    blob = true;
  }

  const g = blob ? -constants.G*0.1 : constants.G;
  // Calculate base gravitational force
  const forceMagnitude = g * (circle.mass * other.mass) / (distance * distance);
  const unitVector = getUnitVector(circle.position, other.position);
  
  
  
  // If more than 60% of nearby circles are overlapping, invert and amplify the force
  if (overlapRatio > 0.45) {
    const repulsionFactor = 50; // Amplify the repulsion force
    return {
      x: -unitVector.x * forceMagnitude * repulsionFactor,
      y: -unitVector.y * forceMagnitude * repulsionFactor
    };
  }
  
  return {
    x: unitVector.x * forceMagnitude,
    y: unitVector.y * forceMagnitude
  };
}