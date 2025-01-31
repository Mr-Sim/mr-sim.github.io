private getRandomRotationDelta(): number {
    // Generate random angle between -135 and 135 degrees
    const angle = (Math.random() * 2 - 1) * 135;
    // Convert to radians
    return angle * (Math.PI / 180);
  }