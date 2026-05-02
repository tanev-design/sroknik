<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';
</script>

<a
  href={t.current.signature.href}
  target="_blank"
  rel="noopener noreferrer"
  class="mt-10 block text-center font-mono text-[11px] tracking-wide text-muted transition-colors hover:text-text-soft"
>
  {t.current.signature.line}
</a>
