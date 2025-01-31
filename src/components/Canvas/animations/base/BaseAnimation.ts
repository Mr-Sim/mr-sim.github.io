import { Point } from '../../types';

export interface AnimationState {
  time: number;
  deltaTime: number;
  center: Point;
  mouse: Point | null;
  isTracking: boolean;
}

export abstract class BaseAnimation {
  protected frameCount: number = 0;
  protected lastTime: number = 0;
  
  protected calculateDeltaTime(currentTime: number): number {
    const deltaTime = this.lastTime ? (currentTime - this.lastTime) / 16 : 1;
    this.lastTime = currentTime;
    return deltaTime;
  }
  
  protected shouldUpdate(interval: number): boolean {
    this.frameCount++;
    return this.frameCount % interval === 0;
  }
  
  abstract update(state: AnimationState): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract cleanup(): void;
}