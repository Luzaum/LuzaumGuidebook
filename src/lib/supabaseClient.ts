import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// DEV only: expose the client in the console for quick manual checks.
if (import.meta.env.DEV) {
  ;(window as any).supabase = supabase
  console.log('[DEV] window.supabase exposed')
}
