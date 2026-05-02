<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    subtitle?: string;
    /** Optional eyebrow shown above the title (uppercase tracked label). */
    eyebrow?: string;
    actions?: Snippet;
  }

  let { title, subtitle, eyebrow, actions }: Props = $props();
</script>

<header class="mb-6 flex items-end justify-between gap-4 pt-1 md:mb-8 md:pt-2">
  <div class="min-w-0">
    {#if eyebrow}
      <p class="eyebrow mb-1.5">{eyebrow}</p>
    {/if}
    <h1
      class="truncate text-[28px] font-semibold leading-tight tracking-tight text-text md:text-[40px]"
    >
      {title}
    </h1>
    {#if subtitle}
      <p class="mt-1 max-w-2xl text-sm text-muted md:text-base">{subtitle}</p>
    {/if}
  </div>
  {#if actions}
    <div class="shrink-0">
      {@render actions()}
    </div>
  {/if}
</header>
