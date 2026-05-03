import { supabase } from '$lib/db/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export type AuthResult = { ok: true } | { ok: false; message: string };

class AuthStore {
  user: User | null = $state(null);
  session: Session | null = $state(null);
  loading: boolean = $state(true);
  /** True when Supabase env vars are not configured. The app falls back to guest mode. */
  unavailable: boolean = $state(false);

  constructor() {
    if (typeof window !== 'undefined' && supabase) {
      this.init();
    } else {
      this.unavailable = !supabase;
      this.loading = false;
    }
  }

  async init() {
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();
    this.session = session;
    this.user = session?.user ?? null;
    this.loading = false;

    supabase.auth.onAuthStateChange((_event, session) => {
      this.session = session;
      this.user = session?.user ?? null;
      this.loading = false;
    });
  }

  async signInWithGoogle(): Promise<AuthResult> {
    if (!supabase) return { ok: false, message: 'auth-unavailable' };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/settings' }
    });
    return resultFromError(error);
  }

  async signInWithGitHub(): Promise<AuthResult> {
    if (!supabase) return { ok: false, message: 'auth-unavailable' };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin + '/settings' }
    });
    return resultFromError(error);
  }

  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    if (!supabase) return { ok: false, message: 'auth-unavailable' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return resultFromError(error);
  }

  async signUpWithEmail(email: string, password: string): Promise<AuthResult> {
    if (!supabase) return { ok: false, message: 'auth-unavailable' };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + '/settings' }
    });
    return resultFromError(error);
  }

  async signOut(): Promise<void> {
    if (!supabase) return;
    await supabase.auth.signOut();
  }
}

function resultFromError(error: AuthError | null): AuthResult {
  if (!error) return { ok: true };
  return { ok: false, message: error.message };
}

export const authStore = new AuthStore();
