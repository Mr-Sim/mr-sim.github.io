import { Point } from '../../types';
import { isMobileDevice } from '../../utils/deviceDetection';

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
    const finalDeltaTime = isMobileDevice() ? deltaTime*0.1 : deltaTime*0.8;
    return finalDeltaTime;
  }
  
  protected shouldUpdate(interval: number): boolean {
    this.frameCount++;
    return this.frameCount % interval === 0;
  }
  
  abstract update(state: AnimationState): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract cleanup(): void;
}