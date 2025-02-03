import { BaseAnimation, AnimationState } from '../base/BaseAnimation';
import { Circle } from './types';
import { Point } from '../../types';
import { CIRCLES_CONFIG as config } from './circlesConfig';
import { calculateGravitationalForce } from './physics/forces';
import { resolveCollision } from './physics/collisions';
import { handleBoundaries } from './physics/boundaries';
import { getCanvasCenter, getEffectiveDimensions } from '../../utils/position';
import { isMobileDevice } from '../../utils/deviceDetection';



function limitVelocity(velocity : Point, maxSpeed : number) {
  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  if (speed > maxSpeed) {
    const scale = maxSpeed / speed;
    velocity.x *= scale;
    velocity.y *= scale;
  }
  return velocity;
}

export class CirclesAnimation extends BaseAnimation {
  private circles: Circle[] = [];
  private effectiveWidth: number;
  private effectiveHeight: number;
  private center: Point;
  private forceLines: Array<{ from: Circle, to: Circle, strength: number }> = [];
  
  constructor(private width: number, private height: number) {
    super();
    const dims = getEffectiveDimensions(width, height);
    this.effectiveWidth = dims.width;
    this.effectiveHeight = dims.height;
    this.center = getCanvasCenter(width, height);
    this.initializeCircles();
  }

  private initializeCircles(): void {
    const radius = Math.min(this.effectiveWidth, this.effectiveHeight) * config.spawnRadius;
    const count = config.count;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = this.center.x + Math.cos(angle) * radius;
      const y = this.center.y + Math.sin(angle) * radius;
      
      const speed = config.maxInitialVelocity;
      const tangentialAngle = angle + Math.PI / 2;
      
      this.circles.push({
        position: { x, y },
        velocity: { 
          x: Math.cos(tangentialAngle) * speed,
          y: Math.sin(tangentialAngle) * speed
        },
        radius: config.minRadius + (config.maxRadius - config.minRadius) * Math.random(),
        mass: 1 + Math.random() * 2,
        color: `rgba(255, 255, 255, ${config.opacity})`,
        targetOpacity: config.opacity,
        repultion: 1
      });
    }
  }

  update(state: AnimationState): void {
    if (!this.shouldUpdate(config.updateInterval)) return;
    
    const dtFactor = isMobileDevice() ? 0.1 : 0.8;
    const deltaTime = this.calculateDeltaTime(state.time) * dtFactor;
    this.forceLines = [];

    // Update center position based on mouse
    const targetCenter = state.isTracking && state.mouse ? {
      x: this.center.x + (state.mouse.x - this.center.x) * 0.1,
      y: this.center.y + (state.mouse.y - this.center.y) * 0.1
    } : this.center;

    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      let maxForce = 0;
      let strongestInteraction: Circle | null = null;

      //revert repultion
      const factor = isMobileDevice() ? 0.05 : 0.005;
      circle.repultion = circle.repultion < 1 ? circle.repultion+(factor*deltaTime) : 1;

      // Get nearby circles for overlap detection
      const nearbyCircles = this.circles.filter((_, index) => index !== i);

      // Apply gravitational forces
      for (let j = i + 1; j < this.circles.length; j++) {
        const other = this.circles[j];
        const force = calculateGravitationalForce(circle, other, nearbyCircles);
        const forceMagnitude = Math.sqrt(force.x * force.x + force.y * force.y);
        
        // Track strongest force for this circle
        if (forceMagnitude > maxForce) {
          maxForce = forceMagnitude;
          strongestInteraction = other;
        }
        
        // Apply force with deltaTime scaling
        const scaledForce = {
          x: force.x * deltaTime * circle.repultion,
          y: force.y * deltaTime * circle.repultion
        };

        circle.velocity.x += scaledForce.x / circle.mass;
        circle.velocity.y += scaledForce.y / circle.mass;
        other.velocity.x -= scaledForce.x / other.mass;
        other.velocity.y -= scaledForce.y / other.mass;
        
        // Check for collisions
        const dx = other.position.x - circle.position.x;
        const dy = other.position.y - circle.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < circle.radius + other.radius) {
          resolveCollision(circle, other);
        }
        
        circle.velocity = limitVelocity(circle.velocity, config.MAX_SPEED)
        other.velocity = limitVelocity(other.velocity, config.MAX_SPEED)
      }

      // If the force is significant, add a line
      if (strongestInteraction && maxForce > config.FORCE_THRESHOLD) {
        this.forceLines.push({
          from: circle,
          to: strongestInteraction,
          strength: maxForce
        });
      }

      // Apply friction
      circle.velocity.x *= config.FRICTION;
      circle.velocity.y *= config.FRICTION;

      // Update position with deltaTime scaling
      circle.position.x += circle.velocity.x * deltaTime;
      circle.position.y += circle.velocity.y * deltaTime;

      // Handle boundaries
      handleBoundaries(circle, this.effectiveWidth, this.effectiveHeight);

      // Apply center attraction
      const dx = targetCenter.x - circle.position.x;
      const dy = targetCenter.y - circle.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const attraction = 0.000005 * deltaTime;
        circle.velocity.x += (dx * Math.pow(distance, 2) * (1-circle.repultion)) * Math.pow(attraction, 2);
        circle.velocity.y += (dy * Math.pow(distance, 2) * (1-circle.repultion)) * Math.pow(attraction, 2);
      }

    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);

    // Draw force lines first (under the circles)
    this.forceLines.forEach(line => {
      const normalizedStrength = Math.min(line.strength / (config.FORCE_THRESHOLD * 2), 1);
      ctx.beginPath();
      ctx.moveTo(line.from.position.x, line.from.position.y);
      ctx.lineTo(line.to.position.x, line.to.position.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${normalizedStrength * 0.3})`;
      ctx.lineWidth = normalizedStrength * 2;
      ctx.stroke();
    });

    // Draw circles
    this.circles.forEach(circle => {
      ctx.beginPath();
      ctx.arc(
        circle.position.x,
        circle.position.y,
        circle.radius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = circle.color;
      ctx.fill();
    });

    ctx.restore();
  }

  cleanup(): void {
    this.circles = [];
    this.forceLines = [];
  }
}