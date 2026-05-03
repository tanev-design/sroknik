<script lang="ts">
  import Logo from '$lib/components/brand/Logo.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { LogIn, User } from 'lucide-svelte';
  import { t } from '$lib/copy/i18n.svelte';
</script>

<header
  class="flex items-center justify-between gap-3 border-b border-border bg-surface/40 px-4 py-3 md:hidden"
>
  <a
    href="/welcome"
    class="-m-1 flex items-center gap-2.5 rounded-[12px] p-1 transition-colors hover:bg-elevated"
    aria-label={t.current.nav.welcome}
  >
    <Logo size="sm" showTagline={false} />
  </a>

  <a
    href={authStore.user ? '/settings' : '/welcome'}
    class="inline-flex h-9 min-h-[36px] items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-medium text-text transition-colors hover:border-[var(--color-border-strong)]"
    aria-label={authStore.user ? t.current.settings.title : t.current.auth.signIn}
  >
    {#if authStore.user}
      <User size={14} aria-hidden="true" strokeWidth={1.8} />
      <span class="max-w-[100px] truncate">{authStore.user.email ?? t.current.settings.account}</span>
    {:else}
      <LogIn size={14} aria-hidden="true" strokeWidth={1.8} />
      <span>{t.current.auth.signIn}</span>
    {/if}
  </a>
</header>
