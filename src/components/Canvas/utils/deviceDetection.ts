export function isMobileDevice(): boolean {
  return window.innerWidth <= 768;
}

export function getResponsiveCount(baseCount: number): number {
  return isMobileDevice() ? Math.floor(baseCount / 2.5) : baseCount;
}