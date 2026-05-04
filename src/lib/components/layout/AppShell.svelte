<script lang="ts">
  import type { Snippet } from 'svelte';
  import SideRail from './SideRail.svelte';
  import MobileHeader from './MobileHeader.svelte';
  import PageFooter from './PageFooter.svelte';

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<div class="app-wrapper flex min-h-[var(--app-height,100svh)] bg-bg p-0 pt-[env(safe-area-inset-top)] text-text md:p-3 md:pt-3">
  <SideRail />
  <main
    class="app-panel mx-auto w-full flex-1 px-0 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] md:min-h-[calc(var(--app-height,100svh)-1.5rem)] md:max-w-[1500px] md:rounded-[24px] md:px-8 md:pb-[calc(env(safe-area-inset-bottom)+2.5rem)] md:pt-[calc(env(safe-area-inset-top)+2rem)] xl:px-10"
  >
    <MobileHeader />
    <div class="panel-content px-4 pt-5 md:px-0 md:pt-0">
      {@render children()}
      <PageFooter />
    </div>
  </main>
</div>
