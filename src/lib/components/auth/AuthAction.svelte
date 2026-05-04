<script lang="ts">
  import { page } from '$app/stores';
  import { loginHref } from '$lib/auth-redirect';
  import { authStore } from '$lib/stores/auth.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { LogIn, User } from 'lucide-svelte';

  interface Props {
    variant?: 'mobile' | 'rail' | 'inline';
  }

  let { variant = 'inline' }: Props = $props();
  const nextPath = $derived(`${$page.url.pathname}${$page.url.search}`);
  const href = $derived(loginHref(nextPath));

  const base =
    'inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-control)] text-sm font-medium transition-[background-color,border-color,color,transform,opacity] duration-100 active:scale-[0.98] active:opacity-90';
</script>

{#if authStore.user}
  <a
    href="/settings"
    class="{base} {variant === 'rail'
      ? 'h-11 w-full justify-center border border-border bg-surface px-3 text-text hover:border-[var(--color-border-strong)] hover:bg-elevated lg:justify-start'
      : variant === 'mobile'
        ? 'h-11 rounded-full border border-border bg-surface px-3 text-xs text-text hover:border-[var(--color-border-strong)]'
        : 'h-11 border border-border bg-surface px-4 text-text hover:border-[var(--color-border-strong)] hover:bg-elevated'}"
    aria-label={t.current.settings.account}
  >
    <User size={variant === 'mobile' ? 14 : 16} aria-hidden="true" strokeWidth={1.8} />
    <span class="{variant === 'rail' ? 'hidden lg:inline lg:max-w-[172px]' : 'max-w-[118px]'} truncate">
      {authStore.user.email ?? t.current.settings.account}
    </span>
  </a>
{:else}
  <a
    {href}
    class="{base} {variant === 'rail'
      ? 'h-11 w-full justify-center border border-[var(--color-accent-border)] bg-accent-light px-3 text-accent hover:bg-accent-light/70 lg:justify-start'
      : variant === 'mobile'
        ? 'h-11 rounded-full border border-border bg-surface px-3 text-xs text-text hover:border-[var(--color-border-strong)]'
        : 'h-11 border border-border bg-surface px-4 text-text hover:border-[var(--color-border-strong)] hover:bg-elevated'}"
  >
    <LogIn size={variant === 'mobile' ? 14 : 16} aria-hidden="true" strokeWidth={1.8} />
    <span class={variant === 'rail' ? 'hidden lg:inline' : ''}>{t.current.auth.signIn}</span>
  </a>
{/if}
