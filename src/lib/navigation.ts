import type { NavigateFunction } from 'react-router-dom'

export function navigateBackOrFallback(
  navigate: NavigateFunction,
  fallbackPath: string,
  options?: { replace?: boolean }
) {
  if (typeof window === 'undefined') {
    navigate(fallbackPath, { replace: options?.replace ?? true })
    return
  }

  const hasHistory = window.history.length > 1

  let sameOriginReferrer = true
  if (document.referrer) {
    try {
      sameOriginReferrer = new URL(document.referrer).origin === window.location.origin
    } catch {
      sameOriginReferrer = false
    }
  }

  if (hasHistory && sameOriginReferrer) {
    navigate(-1)
    return
  }

  navigate(fallbackPath, { replace: options?.replace ?? true })
}
