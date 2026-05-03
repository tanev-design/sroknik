import { supabase } from '$lib/db/supabase';
import type { User, Session } from '@supabase/supabase-js';

class AuthStore {
  user: User | null = $state(null);
  session: Session | null = $state(null);
  loading: boolean = $state(true);

  constructor() {
    if (typeof window !== 'undefined' && supabase) {
      this.init();
    } else {
      this.loading = false;
    }
  }

  async init() {
    if (!supabase) return;

    // Get initial session
    const { data: { session } } = await supabase.auth.getSession();
    this.session = session;
    this.user = session?.user ?? null;
    this.loading = false;

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      this.session = session;
      this.user = session?.user ?? null;
      this.loading = false;
    });
  }

  async signInWithGoogle() {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/settings'
      }
    });
  }

  async signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }
}

export const authStore = new AuthStore();
