<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    subtitle?: string;
    action?: Snippet;
  }
  let { title, subtitle, action }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center md:py-20">
  <p class="text-[18px] font-medium text-text">{title}</p>
  {#if subtitle}
    <p class="max-w-sm text-sm text-muted">{subtitle}</p>
  {/if}
  {#if action}
    <div class="mt-3">
      {@render action()}
    </div>
  {/if}
</div>
