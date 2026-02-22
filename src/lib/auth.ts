import { supabase } from './supabaseClient'

function resolveAppBaseUrl() {
  const explicitAppUrl = String(import.meta.env.VITE_PUBLIC_APP_URL || '').trim()
  if (explicitAppUrl) return explicitAppUrl

  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return 'https://vetius.netlify.app'
}

function resolveAppUrl(pathname: string) {
  return new URL(pathname, resolveAppBaseUrl()).toString()
}

function resolveAuthCallbackUrl(nextPath?: string) {
  const explicitUrl = String(
    import.meta.env.VITE_SUPABASE_AUTH_REDIRECT_TO ||
      import.meta.env.VITE_AUTH_REDIRECT_TO ||
      ''
  ).trim()

  const fallbackBase = resolveAppUrl('/auth/callback')

  const callbackUrl = new URL(explicitUrl || fallbackBase)

  if (nextPath && nextPath.trim()) {
    callbackUrl.searchParams.set('next', nextPath.trim())
  }

  return callbackUrl.toString()
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: resolveAuthCallbackUrl('/app'),
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signInWithGoogle(nextPath = '/app') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: resolveAuthCallbackUrl(nextPath),
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function requestPasswordReset(email: string, nextPath = '/login') {
  const redirectPath = nextPath.startsWith('/') ? nextPath : '/login'
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: resolveAppUrl('/reset-password') + `?next=${encodeURIComponent(redirectPath)}`,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    throw error
  }

  return data.session
}
