import React, { useCallback, useEffect, useRef } from 'react'
import { useTheme } from '../utils/theme'

const CRIVET_STUDIO_URL = '/apps/crivet/index.html'

export function Crivet() {
  const { theme } = useTheme()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const sendThemeToIframe = useCallback(() => {
    const iframeWindow = iframeRef.current?.contentWindow
    if (!iframeWindow) return

    iframeWindow.postMessage(
      {
        type: 'VETIUS_THEME',
        theme,
      },
      window.location.origin,
    )
  }, [theme])

  useEffect(() => {
    sendThemeToIframe()
  }, [sendThemeToIframe])

  return (
    <div className="flex h-full min-h-0 w-full flex-1 overflow-hidden bg-background">
      <iframe
        ref={iframeRef}
        src={CRIVET_STUDIO_URL}
        title="CRI VET"
        className="h-full min-h-0 w-full min-w-0 flex-1 overflow-hidden border-0 bg-background"
        allow="clipboard-read; clipboard-write"
        onLoad={sendThemeToIframe}
      />
    </div>
  )
}
