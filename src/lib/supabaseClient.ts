import { createClient } from '@supabase/supabase-js'

const PLACEHOLDER_SUPABASE_URL = 'https://placeholder.local.supabase.co'
const PLACEHOLDER_SUPABASE_ANON_KEY = 'public-anon-key'

function readSupabaseConfig() {
  const url = String(import.meta.env.VITE_SUPABASE_URL || '').trim()
  const anonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()
  const looksConfigured =
    Boolean(url && anonKey) &&
    !url.includes('your-project-id') &&
    anonKey !== 'sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  return {
    url: looksConfigured ? url : PLACEHOLDER_SUPABASE_URL,
    anonKey: looksConfigured ? anonKey : PLACEHOLDER_SUPABASE_ANON_KEY,
    isConfigured: looksConfigured,
  }
}

const config = readSupabaseConfig()

export const isSupabaseConfigured = config.isConfigured

export const supabase = createClient(config.url, config.anonKey)

// DEV only: expose the client in the console for quick manual checks.
if (import.meta.env.DEV) {
  ;(window as any).supabase = supabase
  if (!config.isConfigured) {
    console.warn(
      '[DEV] Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local.',
    )
  } else {
    console.log('[DEV] window.supabase exposed')
  }
}
