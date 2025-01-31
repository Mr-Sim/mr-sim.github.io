export function adjustColor(color: string, amount: number): string {
  // Remove the '#' if present
  const hex = color.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust each component
  const adjustComponent = (c: number) => {
    const newC = Math.max(0, Math.min(255, c + amount));
    const hex = newC.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  // Combine adjusted components
  return '#' + adjustComponent(r) + adjustComponent(g) + adjustComponent(b);
}