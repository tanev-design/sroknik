<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';

  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    compact?: boolean;
    size?: Size;
    showTagline?: boolean;
  }

  let { compact = false, size = 'md', showTagline = true }: Props = $props();

  const dims: Record<Size, { box: string; svg: number; title: string; sub: string }> = {
    sm: { box: 'h-9 w-9', svg: 22, title: 'text-[14px]', sub: 'text-[10px]' },
    md: { box: 'h-11 w-11', svg: 26, title: 'text-[16px]', sub: 'text-xs' },
    lg: { box: 'h-14 w-14', svg: 32, title: 'text-[20px]', sub: 'text-sm' }
  };
  const d = $derived(dims[size]);
</script>

<div class="flex items-center gap-3">
  <div
    class="grid {d.box} shrink-0 place-items-center rounded-[12px] bg-accent text-white shadow-[0_8px_22px_color-mix(in_srgb,var(--color-accent)_30%,transparent)] ring-1 ring-[var(--color-accent-border)]"
    aria-hidden="true"
  >
    <svg
      width={d.svg}
      height={d.svg}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M9 15l2 2 4-4" />
    </svg>
  </div>
  {#if !compact}
    <div class="min-w-0">
      <p class="{d.title} font-semibold leading-tight tracking-tight text-text">
        {t.current.appName}
      </p>
      {#if showTagline}
        <p class="{d.sub} mt-0.5 leading-4 text-muted">{t.current.tagline}</p>
      {/if}
    </div>
  {/if}
</div>
