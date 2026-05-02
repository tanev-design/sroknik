<script lang="ts">
  import type { Snippet } from 'svelte';
  import SideRail from './SideRail.svelte';

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<div class="app-wrapper flex min-h-[100svh] bg-bg p-0 text-text md:p-3">
  <SideRail />
  <main
    class="app-panel mx-auto w-full flex-1 px-4 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] pt-5 md:min-h-[calc(100svh-1.5rem)] md:max-w-[1500px] md:rounded-[24px] md:px-8 md:pb-10 md:pt-8 xl:px-10"
  >
    <div class="panel-content">
      {@render children()}
    </div>
  </main>
</div>
