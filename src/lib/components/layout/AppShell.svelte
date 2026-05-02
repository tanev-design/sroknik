<script lang="ts">
  import type { Snippet } from 'svelte';
  import SideRail from './SideRail.svelte';

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<div class="app-wrapper flex min-h-[100svh] bg-bg text-text">
  <SideRail />
  <main
    class="mx-auto w-full max-w-[1080px] flex-1 px-4 pb-28 pt-5 md:px-10 md:pb-12 md:pt-10"
  >
    {@render children()}
  </main>
</div>
