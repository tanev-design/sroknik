<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    message: string;
  }
  let { message }: Props = $props();
</script>

<aside
  role="note"
  class="flex items-center justify-between gap-4 rounded-[var(--radius-control)] border border-[var(--color-accent-border)] bg-accent-light/60 px-4 py-3 text-sm text-text"
>
  <p>{message}</p>
  <a
    href="/plus"
    class="shrink-0 text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-accent"
  >
    {t.current.planLimit.cta} →
  </a>
</aside>
