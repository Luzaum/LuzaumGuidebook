/// <reference types="vite/client" />

// Declaração de tipos para imports de imagens
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

// Tipagem para Unicorn Studio
declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean
    }
  }
  const UnicornStudio: {
    init: () => void
  }
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_RX_MEDIA_BUCKET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {}
