import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { normalizeInternalRedirect } from '../lib/internalRedirect'

export default function AuthCallback() {
  const nav = useNavigate()
  const location = useLocation()

  const nextPath = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const target = params.get('next') || '/consulta-vet'
    return normalizeInternalRedirect(target)
  }, [location.search])

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const hashParams = new URLSearchParams(window.location.hash.slice(1))
        const authError = params.get('error_description') || params.get('error') || hashParams.get('error_description') || hashParams.get('error')
        if (authError) throw new Error(authError)
        const code = params.get('code')
        // The browser client detects OAuth codes and fragments during initialization.
        // Wait for that initialization before attempting a manual PKCE exchange.
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        let session = data.session
        if (!session && code) {
          const result = await supabase.auth.exchangeCodeForSession(code)
          if (result.error) throw result.error
          session = result.data.session
        }
        if (!alive) return

        if (session) {
          nav(nextPath, { replace: true })
        } else {
          nav(`/login?next=${encodeURIComponent(nextPath)}`, { replace: true })
        }
      } catch (error) {
        if (!alive) return
        const message = error instanceof Error ? error.message : 'Não foi possível concluir o acesso. Tente novamente.'
        nav(`/login?next=${encodeURIComponent(nextPath)}&error_description=${encodeURIComponent(message)}`, { replace: true })
      }
    })()

    return () => {
      alive = false
    }
  }, [nav, nextPath])

  return <div className="p-6">Finalizando autenticação...</div>
}
