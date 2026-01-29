import React, { useRef, useEffect, useCallback, useLayoutEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getModuleByRoute } from '../modules/registry'
import { Button } from '../components/ui/button'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useTheme } from '../utils/theme'

export function ModuleIframe() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme } = useTheme()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerH, setHeaderH] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const module = getModuleByRoute(location.pathname)

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Medir altura do header
  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderH(headerRef.current.offsetHeight)
      }
    }
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [])

  // Extrair origin do iframeUrl
  const getIframeOrigin = useCallback((url: string): string => {
    try {
      return new URL(url).origin
    } catch {
      return window.location.origin
    }
  }, [])

  // Enviar tema para o iframe
  const sendThemeToIframe = useCallback(() => {
    if (!iframeRef.current || !module?.iframeUrl) return

    const iframeOrigin = getIframeOrigin(module.iframeUrl)
    const iframeWindow = iframeRef.current.contentWindow

    if (iframeWindow) {
      iframeWindow.postMessage(
        {
          type: 'VETIUS_THEME',
          theme: theme,
        },
        iframeOrigin
      )
    }
  }, [theme, module?.iframeUrl, getIframeOrigin])

  // Enviar tema quando o iframe carregar
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !module?.iframeUrl) return

    const handleLoad = () => {
      // Pequeno delay para garantir que o iframe está pronto
      setTimeout(() => {
        sendThemeToIframe()
      }, 100)
    }

    iframe.addEventListener('load', handleLoad)
    return () => {
      iframe.removeEventListener('load', handleLoad)
    }
  }, [module?.iframeUrl, sendThemeToIframe])

  // Enviar tema sempre que o tema mudar
  useEffect(() => {
    sendThemeToIframe()
  }, [sendThemeToIframe])

  if (!module || !module.iframeUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Módulo não encontrado</h2>
          <Button onClick={() => navigate('/')}>Voltar ao Hub</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <div
        ref={headerRef}
        className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>
            <h1 className="text-base sm:text-xl font-semibold truncate">{module.title}</h1>
          </div>
          {module.iframeUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(module.iframeUrl, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 flex-shrink-0"
              title="Abrir em tela cheia"
            >
              <ExternalLink className="h-4 w-4" />
              <span className={isMobile ? 'inline' : 'hidden sm:inline'}>Tela cheia</span>
            </Button>
          )}
        </div>
      </div>
      <main className="flex-1 min-h-0 overflow-hidden p-0 sm:p-6">
        <div
          className={`mx-auto w-full max-w-7xl h-full overflow-hidden ${isMobile
              ? 'rounded-none border-0'
              : 'rounded-xl border border-border/50'
            }`}
          style={{
            height: headerH > 0 ? `calc(100dvh - ${headerH}px)` : '100dvh'
          }}
        >
          <iframe
            ref={iframeRef}
            src={module.iframeUrl}
            title={module.title}
            className="h-full w-full border-0 overflow-hidden"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </main>
    </div>
  )
}
