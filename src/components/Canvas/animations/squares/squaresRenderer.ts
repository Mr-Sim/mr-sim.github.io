import { Square, Point } from '../../types';

export function drawSquares(
  ctx: CanvasRenderingContext2D,
  squares: Square[]
): void {
  ctx.save();
  
  ctx.lineWidth = 2;
  
  squares.forEach((square) => {
    //if (!square || !isSquareVisible(ctx, square)) return;
    
    ctx.save();
    ctx.translate(square.position.x, square.position.y);
    ctx.rotate(square.rotation);
    
    ctx.strokeStyle = `rgba(255, 255, 255, ${square.opacity})`;
    const halfSize = square.size / 2;
    ctx.strokeRect(-halfSize, -halfSize, square.size, square.size);
    
    ctx.restore();
  });
  
  ctx.restore();
}

function isSquareVisible(ctx: CanvasRenderingContext2D, square: Square): boolean {
  if (!square || !square.size || !square.position) return false;
  return true;
  /*const margin = square.size * 2;
  const { width, height } = ctx.canvas;
  return (
    square.position.x + margin >= 0 &&
    square.position.x - margin <= width &&
    square.position.y + margin >= 0 &&
    square.position.y - margin <= height
  );*/
}