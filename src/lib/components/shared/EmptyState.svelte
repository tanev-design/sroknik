<script lang="ts">
  import type { Snippet } from 'svelte';
  import EmptyIllustration from '$lib/components/ui/EmptyIllustration.svelte';

  type Variant = 'deadline' | 'document' | 'car' | 'person' | 'archive' | 'check';

  interface Props {
    title: string;
    subtitle?: string;
    illustration?: Variant;
    action?: Snippet;
  }
  let { title, subtitle, illustration = 'deadline', action }: Props = $props();
</script>

<div class="accent-panel flex min-h-[360px] flex-col items-center justify-center gap-3 rounded-[22px] px-6 py-14 text-center md:py-20">
  <div class="panel-content flex flex-col items-center gap-3">
    <EmptyIllustration variant={illustration} />
    <p class="mt-2 text-[20px] font-semibold text-text">{title}</p>
    {#if subtitle}
      <p class="max-w-sm text-sm text-muted">{subtitle}</p>
    {/if}
    {#if action}
      <div class="mt-3">
        {@render action()}
      </div>
    {/if}
  </div>
</div>
