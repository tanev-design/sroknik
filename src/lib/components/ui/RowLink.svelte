<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';

  interface Props {
    label: string;
    /** Optional trailing status text (e.g. "Скоро" or "Български"). */
    value?: string;
    /** Subtitle shown beneath label. */
    subtitle?: string;
    href?: string;
    onclick?: () => void;
    /** Hide chevron — useful for read-only display rows. */
    hideChevron?: boolean;
    /** Tone the value text. */
    tone?: 'default' | 'muted' | 'danger' | 'accent';
  }
  let {
    label,
    value,
    subtitle,
    href,
    onclick,
    hideChevron = false,
    tone = 'muted'
  }: Props = $props();

  const toneClass: Record<NonNullable<Props['tone']>, string> = {
    default: 'text-text',
    muted: 'text-muted',
    danger: 'text-[var(--color-danger)]',
    accent: 'text-accent'
  };

  const inner = `flex min-h-[56px] w-full items-center justify-between gap-4 px-4 py-3 hairline last:border-b-0 transition-colors hover:bg-bg`;
</script>

{#if href}
  <a {href} class={inner}>
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-medium text-text">{label}</span>
      {#if subtitle}
        <span class="mt-0.5 block text-xs text-muted">{subtitle}</span>
      {/if}
    </span>
    {#if value}
      <span class="text-sm {toneClass[tone]}">{value}</span>
    {/if}
    {#if !hideChevron}
      <ChevronRight size={16} class="text-muted" aria-hidden="true" />
    {/if}
  </a>
{:else if onclick}
  <button type="button" {onclick} class="{inner} text-left">
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-medium text-text">{label}</span>
      {#if subtitle}
        <span class="mt-0.5 block text-xs text-muted">{subtitle}</span>
      {/if}
    </span>
    {#if value}
      <span class="text-sm {toneClass[tone]}">{value}</span>
    {/if}
    {#if !hideChevron}
      <ChevronRight size={16} class="text-muted" aria-hidden="true" />
    {/if}
  </button>
{:else}
  <div class={inner}>
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-medium text-text">{label}</span>
      {#if subtitle}
        <span class="mt-0.5 block text-xs text-muted">{subtitle}</span>
      {/if}
    </span>
    {#if value}
      <span class="text-sm {toneClass[tone]}">{value}</span>
    {/if}
  </div>
{/if}
