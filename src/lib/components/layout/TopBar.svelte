<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { ChevronLeft } from 'lucide-svelte';
  import type { Snippet } from 'svelte';
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    title: string;
    subtitle?: string;
    /** Optional eyebrow shown above the title (uppercase tracked label). */
    eyebrow?: string;
    actions?: Snippet;
  }

  let { title, subtitle, eyebrow, actions }: Props = $props();

  const backRoutes = [
    '/settings',
    '/plus',
    '/how-it-works',
    '/legal',
    '/privacy',
    '/terms',
    '/cookies',
    '/support',
    '/login'
  ];

  let canGoBack = $state(false);
  const routeWantsBack = $derived(
    backRoutes.some((route) => $page.url.pathname === route || $page.url.pathname.startsWith(`${route}/`))
  );

  $effect(() => {
    if (!browser) return;
    canGoBack = routeWantsBack && window.history.length > 1;
  });

  function goBack() {
    if (browser && window.history.length > 1) window.history.back();
  }
</script>

<header class="mb-6 flex items-end justify-between gap-4 pt-1 md:mb-8 md:pt-2">
  <div class="flex min-w-0 items-start gap-3">
    {#if canGoBack}
      <button
        type="button"
        onclick={goBack}
        aria-label={t.current.actions.back}
        class="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-text transition-[transform,opacity,border-color,background-color] duration-100 hover:border-[var(--color-border-strong)] hover:bg-elevated active:scale-[0.98] active:opacity-90"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
    {/if}
    <div class="min-w-0">
      {#if eyebrow}
        <p class="eyebrow mb-1.5">{eyebrow}</p>
      {/if}
      <h1
        class="truncate text-[clamp(28px,7vw,36px)] font-semibold leading-[1.14] tracking-normal text-text md:text-[clamp(36px,4vw,44px)]"
      >
        {title}
      </h1>
      {#if subtitle}
        <p class="mt-1 max-w-2xl text-sm leading-6 text-muted md:text-base md:leading-7">{subtitle}</p>
      {/if}
    </div>
  </div>
  {#if actions}
    <div class="shrink-0">
      {@render actions()}
    </div>
  {/if}
</header>
