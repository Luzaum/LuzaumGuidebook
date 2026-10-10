/** Preserve internal paths, query strings and hashes without accepting another origin. */
export function normalizeInternalRedirect(value: string | null | undefined, fallback = '/app'): string {
  const target = String(value || '').trim();
  if (!target.startsWith('/') || target.startsWith('//') || /[\\\u0000-\u001f\u007f]/.test(target)) return fallback;
  try {
    const url = new URL(target, 'https://vetius.invalid');
    const decodedPath = decodeURIComponent(url.pathname);
    if (url.origin !== 'https://vetius.invalid' || decodedPath.startsWith('//') || /[\\\u0000-\u001f\u007f]/.test(decodedPath)) return fallback;
    return target;
  } catch {
    return fallback;
  }
}
