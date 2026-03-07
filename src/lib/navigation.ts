import type { NavigateFunction } from 'react-router-dom'

const DEFAULT_FALLBACK = '/hub'

export function goBackSafely(
  navigate: NavigateFunction,
  fallbackPath: string = DEFAULT_FALLBACK
) {
  if (typeof window === 'undefined') {
    navigate(fallbackPath, { replace: true })
    return
  }

  const hasBrowserHistory = window.history.length > 1
  const historyIndex = (window.history.state as { idx?: number } | null)?.idx ?? 0
  const hasInAppHistory = historyIndex > 0
  let hasSameOriginReferrer = false
  if (document.referrer) {
    try {
      hasSameOriginReferrer = new URL(document.referrer).origin === window.location.origin
    } catch {
      hasSameOriginReferrer = false
    }
  }

  if ((hasInAppHistory || hasSameOriginReferrer) && hasBrowserHistory) {
    navigate(-1)
    return
  }

  navigate(fallbackPath, { replace: true })
}
