<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';
  import { WifiOff } from 'lucide-svelte';
</script>

<div class="accent-panel flex min-h-[70dvh] flex-col items-center justify-center gap-4 rounded-[24px] p-6 text-center">
  <WifiOff size={40} class="text-muted" aria-hidden="true" strokeWidth={1.5} />
  <h1 class="text-xl font-semibold text-text">{t.current.offline.title}</h1>
  <p class="max-w-sm text-sm text-muted">{t.current.offline.subtitle}</p>
</div>
