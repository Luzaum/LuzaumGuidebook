export function getEnv(key: string): string | undefined {
  // Prefer Vite import.meta.env
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viteEnv = (import.meta as any).env && (import.meta as any).env[key];
  if (typeof viteEnv === 'string' && viteEnv.length > 0) return viteEnv;

  // Meta tag fallback: <meta name="VITE_APPS_SCRIPT_URL" content="..." />
  if (typeof document !== 'undefined') {
    const meta = document.querySelector(`meta[name="${key}"]`) as HTMLMetaElement | null;
    if (meta?.content) return meta.content;
  }

  // Global window fallback: window[key]
  if (typeof window !== 'undefined' && (window as any)[key]) return (window as any)[key];

  // LocalStorage fallback
  try {
    const v = localStorage.getItem(key);
    if (v) return v;
  } catch {}

  return undefined;
}


