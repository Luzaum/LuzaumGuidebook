export function debounce<T extends (...args: any[]) => void>(fn: T, delayMs: number) {
  let timeoutId: number | undefined
  return (...args: Parameters<T>) => {
    if (timeoutId) window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => fn(...args), delayMs)
  }
}
