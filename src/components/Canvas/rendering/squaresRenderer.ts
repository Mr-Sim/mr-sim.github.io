import { Square, Point } from '../types';

export function drawSquares(
  ctx: CanvasRenderingContext2D,
  squares: Square[],
  mousePosition: Point | null
): void {
  ctx.save();
  
  const dpr = window.devicePixelRatio || 1;
  ctx.scale(1/dpr, 1/dpr);
  
  ctx.lineWidth = 2 * dpr;
  
  squares.forEach((square) => {
    if (!isSquareVisible(ctx, square)) return;
    
    ctx.save();
    ctx.translate(square.position.x * dpr, square.position.y * dpr);
    ctx.rotate(square.rotation);
    
    ctx.strokeStyle = `rgba(255, 255, 255, ${square.opacity})`;
    const halfSize = (square.size * dpr) / 2;
    ctx.strokeRect(-halfSize, -halfSize, square.size * dpr, square.size * dpr);
    
    ctx.restore();
  });
  
  ctx.restore();
}

function isSquareVisible(ctx: CanvasRenderingContext2D, square: Square): boolean {
  const margin = square.size * 2;
  const { width, height } = ctx.canvas;
  const dpr = window.devicePixelRatio || 1;
  
  return (
    square.position.x * dpr + margin >= 0 &&
    square.position.x * dpr - margin <= width &&
    square.position.y * dpr + margin >= 0 &&
    square.position.y * dpr - margin <= height
  );
}