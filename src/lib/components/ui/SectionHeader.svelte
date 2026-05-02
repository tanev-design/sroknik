<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label: string;
    /** Optional trailing meta text shown right-aligned in the same row. */
    meta?: string;
    /** Optional trailing snippet (e.g. a "show more" toggle). */
    trailing?: Snippet;
  }
  let { label, meta, trailing }: Props = $props();
</script>

<div class="mb-3 mt-1 flex items-baseline justify-between gap-3">
  <h2 class="eyebrow">{label}</h2>
  {#if trailing}
    <div class="flex items-center text-xs text-muted">
      {@render trailing()}
    </div>
  {:else if meta}
    <span class="text-xs text-muted">{meta}</span>
  {/if}
</div>
