import React, { useRef, useEffect, useCallback } from 'react'
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
  const module = getModuleByRoute(location.pathname)

  // Extrair origin do iframeUrl
  const getIframeOrigin = useCallback((url: string): string => {
    try {
      return new URL(url).origin
    } catch {
      return url
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
    <div className="min-h-screen flex flex-col bg-background">
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto w-full max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-xl font-semibold">{module.title}</h1>
          </div>
          {module.iframeUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(module.iframeUrl, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2"
              title="Abrir em nova aba"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Abrir em nova aba</span>
            </Button>
          )}
        </div>
      </div>
      <main className="flex-grow p-6">
        <div className="mx-auto w-full max-w-7xl h-[calc(100vh-120px)] rounded-xl overflow-hidden border border-border/50">
          <iframe
            ref={iframeRef}
            src={module.iframeUrl}
            title={module.title}
            className="h-full w-full border-0"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </main>
    </div>
  )
}
