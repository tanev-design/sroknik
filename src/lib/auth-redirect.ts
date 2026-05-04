const DEFAULT_AUTH_REDIRECT = '/settings';
const LOCAL_ORIGIN = 'https://sroknik.local';

export function sanitizeAuthRedirect(
  value: string | null | undefined,
  fallback = DEFAULT_AUTH_REDIRECT
): string {
  if (!value) return fallback;

  try {
    const url = new URL(value, LOCAL_ORIGIN);
    if (url.origin !== LOCAL_ORIGIN) return fallback;

    const path = `${url.pathname}${url.search}${url.hash}`;
    if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/login')) {
      return fallback;
    }

    return path;
  } catch {
    return fallback;
  }
}

export function loginHref(nextPath: string | null | undefined): string {
  return `/login?next=${encodeURIComponent(sanitizeAuthRedirect(nextPath, '/settings'))}`;
}

export function absoluteAuthRedirect(nextPath: string | null | undefined): string {
  if (typeof window === 'undefined') return sanitizeAuthRedirect(nextPath);
  return `${window.location.origin}${sanitizeAuthRedirect(nextPath)}`;
}
