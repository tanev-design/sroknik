<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    compact?: boolean;
  }

  let { compact = false }: Props = $props();
</script>

<div class="flex items-center gap-3">
  <div
    class="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[14px] border border-[var(--color-accent-border)] bg-[linear-gradient(135deg,var(--color-accent)_0%,#123f29_100%)] text-[18px] font-semibold text-white shadow-[0_10px_28px_rgba(30,92,58,0.24)]"
    aria-hidden="true"
  >
    <span class="absolute left-2 top-2 h-1 w-1 rounded-full bg-white/70"></span>
    <span class="absolute right-2 top-2 h-1 w-1 rounded-full bg-white/70"></span>
    <span class="absolute bottom-2 left-2 right-2 h-px bg-white/20"></span>
    С
  </div>
  {#if !compact}
    <div class="min-w-0">
      <p class="text-[16px] font-semibold leading-tight tracking-tight text-text">{t.current.appName}</p>
      <p class="mt-0.5 text-xs leading-4 text-muted">{t.current.tagline}</p>
    </div>
  {/if}
</div>
