function tokenEditDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function maximumTypoDistance(token: string): number {
  if (token.length >= 9) return 2;
  if (token.length >= 4) return 1;
  return 0;
}

export function fuzzyTokenScore(queryTokens: string[], candidateTokens: string[]): number | null {
  if (!queryTokens.length || !candidateTokens.length) return null;
  let total = 0;
  for (const queryToken of queryTokens) {
    if (candidateTokens.includes(queryToken)) continue;
    const limit = maximumTypoDistance(queryToken);
    let bestDistance = limit + 1;
    for (const candidateToken of candidateTokens) {
      if (Math.abs(queryToken.length - candidateToken.length) > limit) continue;
      bestDistance = Math.min(bestDistance, tokenEditDistance(queryToken, candidateToken));
    }
    if (bestDistance > limit) return null;
    total += bestDistance;
  }
  return total;
}
