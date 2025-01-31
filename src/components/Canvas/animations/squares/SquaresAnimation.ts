import { BaseAnimation, AnimationState } from '../base/BaseAnimation';
import { Square, Point } from '../../types';
import { SQUARES_CONFIG as config } from '../config/squaresConfig';
import { updateSquares } from './squaresUpdater';
import { drawSquares } from './squaresRenderer';
import { getCanvasCenter } from '../../utils/position';
import { easeInOutQuad } from '../../utils/easings';

export class SquaresAnimation extends BaseAnimation {
  private squares: Square[] = [];
  private targetRotation: number = 0;
  private lastRotationUpdate: number = -4500;
  private initializationProgress: number = 0;
  private isInitializing: boolean = true;
  private center: Point;
  private canvasSize: number;
  private baseSize: number;
  private fadeStartTimes: number[] = [];
  private readonly FADE_DURATION = 600; // Duration in milliseconds
  
  constructor(canvasSize: number) {
    super();
    this.canvasSize = canvasSize;
    this.center = getCanvasCenter(canvasSize, canvasSize);
    this.baseSize = this.canvasSize * config.baseSize;
    // Initialize squares array with nulls
    this.squares = new Array(config.count).fill(null);
    this.fadeStartTimes = new Array(config.count).fill(0);
  }
  
  private initializeNextSquare(): void {
    if (this.initializationProgress >= config.count) {
      this.isInitializing = false;
      return;
    }
    
    const i = this.initializationProgress;
    const progress = i / config.count;
    
    // Optimized size calculation
    const normalizedProgress = progress * config.sizeReduction.factor;
    const reduction = Math.pow(normalizedProgress, config.sizeReduction.power);
    const size = Math.max(this.baseSize * (1 - reduction), this.baseSize * config.minSize);
    
    // Calculate initial position with a much gentler spiral pattern
    const angle = (i / config.count) * Math.PI * 0.5;
    const maxRadius = Math.min(this.canvasSize * 0.5, size);
    const spiralRadius = Math.pow(progress, 1.5) * maxRadius;
    
    const randomOffset = (Math.random() - 0.5) * size * 0.1;
    const position = {
      x: this.center.x + Math.cos(angle) * (spiralRadius + randomOffset),
      y: this.center.y + Math.sin(angle) * (spiralRadius + randomOffset)
    };
    
    const lerpFactor = 0.8;
    position.x = position.x * (1 - lerpFactor) + this.center.x * lerpFactor;
    position.y = position.y * (1 - lerpFactor) + this.center.y * lerpFactor;
    
    // Store the target opacity but start at 0
    const targetOpacity = config.baseOpacity - progress * config.opacityReduction;
    
    this.squares[i] = {
      size,
      position: { ...position },
      targetPosition: { ...this.center },
      rotation: angle * 0.25,
      rotationSpeed: config.rotationSpeed * (1 + progress * config.rotationSpeedMultiplier),
      opacity: 0, // Start with 0 opacity
      targetOpacity // Store target opacity for fade-in
    };
    
    // Record the fade start time for this square
    this.fadeStartTimes[i] = performance.now();
    
    this.initializationProgress++;
  }
  
  private updateFadeIn(currentTime: number): void {
    this.squares.forEach((square, index) => {
      if (!square || !square.targetOpacity) return;
      
      const fadeStartTime = this.fadeStartTimes[index];
      const elapsed = currentTime - fadeStartTime;
      const progress = Math.min(elapsed / this.FADE_DURATION, 1);
      
      // Use easeInOutQuad for smoother fade-in
      const easedProgress = easeInOutQuad(progress);
      square.opacity = easedProgress * square.targetOpacity;
    });
  }
  
  private getRandomRotationDelta(): number {
    const angle = (Math.random() * 2 - 1) * 135;
    return angle * (Math.PI / 180);
  }
  
  update(state: AnimationState): void {
    if (!this.shouldUpdate(config.updateInterval)) return;
    
    // Update fade-in effect
    this.updateFadeIn(state.time);
    
    // Handle initialization - one square per frame
    if (this.isInitializing) {
      this.initializeNextSquare();
      // Only update initialized squares
      const initializedSquares = this.squares.filter(Boolean);
      this.updateSquares(initializedSquares, state);
      return;
    }
    
    // Normal update for all squares
    this.updateSquares(this.squares, state);
  }
  
  private updateSquares(squares: Square[], state: AnimationState): void {
    const deltaTime = this.calculateDeltaTime(state.time);
    
    // Update rotation
    if (state.time - this.lastRotationUpdate > config.rotationUpdateInterval) {
      const rotationDelta = this.getRandomRotationDelta();
      this.targetRotation += rotationDelta;
      this.lastRotationUpdate = state.time;
    }
    
    // Update squares
    squares.forEach((square, index) => {
      if (!square) return;
      
      const progress = index / squares.length;
      const speedFactor = 1 + progress * 2;
      
      const rotationDiff = this.targetRotation * speedFactor - square.rotation;
      
      const elapsed = Math.min(state.time - this.lastRotationUpdate, config.rotationUpdateInterval);
      const t = elapsed / (config.rotationUpdateInterval * 2.2);
      
      const easeAmount = easeInOutQuad(t) * 0.1;
      square.rotation += rotationDiff * easeAmount;
    });
    
    updateSquares(squares, state, deltaTime);
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    // Only render initialized squares
    const squares = this.isInitializing 
      ? this.squares.filter(Boolean)
      : this.squares;
      
    drawSquares(ctx, squares);
  }
  
  cleanup(): void {
    this.squares = [];
    this.fadeStartTimes = [];
    this.isInitializing = true;
    this.initializationProgress = 0;
  }
}