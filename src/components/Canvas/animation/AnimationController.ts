import { Point, Square } from '../types';
import { getDelayedPosition } from '../utils/transition';
import { RotationController } from './RotationController';

export class AnimationController {
  private lastTime: number = 0;
  private readonly smoothing: number = 0.15;
  private readonly mouseInfluence: number = -0.2;
  private rotationController: RotationController;
  private frameCount: number = 0;
  private readonly updateInterval: number = 2;

  constructor(private squares: Square[]) {
    this.rotationController = new RotationController();
  }

  update(currentTime: number, center: Point, mouse: Point | null, isTracking: boolean) {
    this.frameCount++;
    if (this.frameCount % this.updateInterval !== 0) return;

    const deltaTime = this.lastTime ? (currentTime - this.lastTime) / 16 : 1;
    this.lastTime = currentTime;

    this.rotationController.update(this.squares, currentTime);

    const adjustedCenter = isTracking && mouse ? {
      x: center.x + (mouse.x - center.x) * this.mouseInfluence,
      y: center.y + (mouse.y - center.y) * this.mouseInfluence
    } : center;

    const totalSquares = this.squares.length;
    for (let i = 0; i < totalSquares; i++) {
      const square = this.squares[i];
      const t = i / totalSquares;
      
      const delay = t * t + 0.1;
      const targetPosition = isTracking && mouse ? {
        x: adjustedCenter.x + (mouse.x - adjustedCenter.x) * delay,
        y: adjustedCenter.y + (mouse.y - adjustedCenter.y) * delay
      } : adjustedCenter;

      square.position = getDelayedPosition(
        square.position,
        targetPosition,
        i,
        totalSquares,
        deltaTime,
        this.smoothing
      );
      square.targetPosition = targetPosition;
    }
  }
}