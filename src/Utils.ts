export function randomInInterval(start: number, end: number): number {
  return start + Math.floor(Math.random() * (end - start + 1));
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
