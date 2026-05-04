import { browser } from '$app/environment';

export const CONSENT_KEY = 'sroknik.consent.v1';
export const CONSENT_VERSION = 1;

export interface CookieConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: string;
  version: 1;
}

export type CookieConsentChoice = Pick<CookieConsentState, 'analytics' | 'marketing'>;

export function createConsent(choice: CookieConsentChoice): CookieConsentState {
  return {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    ts: new Date().toISOString(),
    version: CONSENT_VERSION
  };
}

export function readConsent(): CookieConsentState | null {
  if (!browser) return null;
  const raw = localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    if (parsed.version !== CONSENT_VERSION || parsed.necessary !== true) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      ts: typeof parsed.ts === 'string' ? parsed.ts : new Date().toISOString(),
      version: CONSENT_VERSION
    };
  } catch {
    return null;
  }
}

export function saveConsent(choice: CookieConsentChoice): CookieConsentState {
  const state = createConsent(choice);
  if (browser) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent<CookieConsentState>('consent:change', { detail: state }));
  }
  return state;
}

export function acceptAllConsent(): CookieConsentState {
  return saveConsent({ analytics: true, marketing: true });
}

export function acceptNecessaryConsent(): CookieConsentState {
  return saveConsent({ analytics: false, marketing: false });
}
