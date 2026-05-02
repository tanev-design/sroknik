<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    compact?: boolean;
  }
  let { compact = false }: Props = $props();
</script>

{#if compact}
  <p class="text-xs text-muted">{t.current.privacy.localOnly}</p>
{:else}
  <ul class="flex flex-col gap-1.5 text-sm text-text-soft">
    <li>{t.current.privacy.noProfile}</li>
    <li>{t.current.privacy.noEGN}</li>
    <li>{t.current.privacy.noBankData}</li>
    <li class="font-medium text-text">{t.current.privacy.localOnly}</li>
  </ul>
{/if}
