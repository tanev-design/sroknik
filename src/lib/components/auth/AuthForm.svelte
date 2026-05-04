<script lang="ts">
  import Button from '$lib/components/shared/Button.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { Mail } from 'lucide-svelte';

  interface Props {
    redirectTo?: string;
    embedded?: boolean;
    onGuest?: () => void | Promise<void>;
    onSuccess?: () => void | Promise<void>;
  }

  let {
    redirectTo = '/settings',
    embedded = false,
    onGuest = undefined,
    onSuccess = undefined
  }: Props = $props();

  let mode = $state<'choose' | 'email-signin' | 'email-signup'>('choose');
  let email = $state('');
  let password = $state('');
  let busy = $state(false);
  let error = $state<string | null>(null);
  let info = $state<string | null>(null);

  async function withBusy(fn: () => Promise<{ ok: boolean; message?: string } | void>) {
    busy = true;
    error = null;
    info = null;
    try {
      const r = await fn();
      if (r && !r.ok) error = r.message ?? t.current.errors.generic;
    } catch (e) {
      error = (e as Error).message ?? t.current.errors.generic;
    } finally {
      busy = false;
    }
  }

  async function google() {
    await withBusy(() => authStore.signInWithGoogle(redirectTo));
  }

  async function github() {
    await withBusy(() => authStore.signInWithGitHub(redirectTo));
  }

  async function emailSignIn() {
    if (!email || !password) return;
    await withBusy(async () => {
      const r = await authStore.signInWithEmail(email, password);
      if (r.ok) await onSuccess?.();
      return r;
    });
  }

  async function emailSignUp() {
    if (!email || password.length < 6) {
      error = t.current.auth.weakPassword;
      return;
    }
    await withBusy(async () => {
      const r = await authStore.signUpWithEmail(email, password, redirectTo);
      if (r.ok) info = t.current.auth.confirmEmailHint;
      return r;
    });
  }

  async function guest() {
    await onGuest?.();
  }
</script>

<div class="{embedded ? '' : 'glass-card rounded-[var(--radius-card)] p-5 md:p-6'}">
  {#if authStore.unavailable}
    <p class="mb-4 rounded-[var(--radius-control)] border border-border bg-elevated p-3 text-xs text-muted">
      {t.current.auth.unavailable}
    </p>
  {/if}

  {#if mode === 'choose'}
    <div class="flex flex-col gap-2.5">
      <button
        type="button"
        disabled={busy || authStore.unavailable}
        onclick={google}
        class="inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2.5 rounded-[var(--radius-control)] border border-border bg-surface text-sm font-medium text-text transition-[transform,opacity,border-color,background-color] duration-100 hover:border-[var(--color-border-strong)] hover:bg-elevated active:scale-[0.98] active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.71-1.57 2.7-3.9 2.7-6.62z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A8.997 8.997 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.29-1.71V4.96H.96A8.997 8.997 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33z"/>
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A8.997 8.997 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
        </svg>
        {t.current.auth.google}
      </button>

      <button
        type="button"
        disabled={busy || authStore.unavailable}
        onclick={github}
        class="inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2.5 rounded-[var(--radius-control)] bg-[#1f2328] text-sm font-medium text-white transition-[transform,opacity,background-color] duration-100 hover:bg-[#2c333b] active:scale-[0.98] active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        {t.current.auth.github}
      </button>

      <button
        type="button"
        disabled={busy || authStore.unavailable}
        onclick={() => (mode = 'email-signin')}
        class="inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2.5 rounded-[var(--radius-control)] border border-border bg-surface text-sm font-medium text-text transition-[transform,opacity,border-color,background-color] duration-100 hover:border-[var(--color-border-strong)] hover:bg-elevated active:scale-[0.98] active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Mail size={16} aria-hidden="true" strokeWidth={1.8} />
        {t.current.auth.emailMode}
      </button>
    </div>

    <div class="my-4 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted">
      <span class="h-px flex-1 bg-border"></span>
      {t.current.auth.or}
      <span class="h-px flex-1 bg-border"></span>
    </div>

    <button
      type="button"
      onclick={guest}
      class="inline-flex h-11 min-h-[44px] w-full items-center justify-center rounded-[var(--radius-control)] bg-elevated text-sm font-medium text-text transition-[transform,opacity,background-color] duration-100 hover:bg-surface active:scale-[0.98] active:opacity-90"
    >
      {t.current.auth.continueWithoutLogin}
    </button>

    <p class="mt-3 text-center text-xs text-muted">{t.current.welcome.guestNote}</p>
  {:else}
    <form
      class="flex flex-col gap-3"
      onsubmit={(e) => {
        e.preventDefault();
        mode === 'email-signup' ? emailSignUp() : emailSignIn();
      }}
    >
      <label class="block">
        <span class="mb-1.5 block text-xs font-medium text-muted">
          {t.current.auth.emailField}
        </span>
        <input
          type="email"
          required
          autocomplete="email"
          bind:value={email}
          placeholder={t.current.auth.emailPlaceholder}
          class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-text placeholder:text-muted focus:border-[var(--color-border-strong)] focus:outline-none"
        />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-xs font-medium text-muted">
          {t.current.auth.passwordField}
        </span>
        <input
          type="password"
          required
          minlength={mode === 'email-signup' ? 6 : undefined}
          autocomplete={mode === 'email-signup' ? 'new-password' : 'current-password'}
          bind:value={password}
          placeholder={t.current.auth.passwordPlaceholder}
          class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-text placeholder:text-muted focus:border-[var(--color-border-strong)] focus:outline-none"
        />
      </label>

      {#if error}
        <p class="text-xs text-[var(--color-danger)]">{error}</p>
      {/if}
      {#if info}
        <p class="text-xs text-accent">{info}</p>
      {/if}

      <Button type="submit" fullWidth disabled={busy}>
        {busy
          ? t.current.actions.saving
          : mode === 'email-signup'
            ? t.current.auth.signUpMode
            : t.current.auth.emailMode}
      </Button>

      <button
        type="button"
        onclick={() => (mode = mode === 'email-signup' ? 'email-signin' : 'email-signup')}
        class="text-center text-xs text-muted underline-offset-2 hover:text-text hover:underline"
      >
        {mode === 'email-signup'
          ? t.current.auth.switchToSignIn
          : t.current.auth.switchToSignUp}
      </button>

      <button
        type="button"
        onclick={() => {
          mode = 'choose';
          error = null;
          info = null;
        }}
        class="text-center text-xs text-muted underline-offset-2 hover:text-text hover:underline"
      >
        {t.current.actions.cancel}
      </button>
    </form>
  {/if}
</div>
