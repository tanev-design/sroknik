<script lang="ts">
  import Logo from '$lib/components/brand/Logo.svelte';
  import AuthAction from '$lib/components/auth/AuthAction.svelte';
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

  <AuthAction variant="mobile" />
</header>
