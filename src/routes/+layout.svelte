<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import AppShell from '$lib/components/layout/AppShell.svelte';
  import BottomNav from '$lib/components/layout/BottomNav.svelte';
  import CookieBanner from '$lib/components/shared/CookieBanner.svelte';
  import DbErrorBoundary from '$lib/components/shared/DbErrorBoundary.svelte';
  import ToastContainer from '$lib/components/ui/ToastContainer.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { goto, onNavigate } from '$app/navigation';
  import type { Snippet } from 'svelte';

  // Cross-route fade via View Transitions API. Browsers without support
  // (Firefox, older Safari) fall through to a normal navigation.
  onNavigate((navigation) => {
    if (!browser) return;
    const doc = document as Document & {
      startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> };
    };
    if (typeof doc.startViewTransition !== 'function') return;
    return new Promise((resolve) => {
      doc.startViewTransition!(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();

  let didFirstVisitRedirect = $state(false);

  onMount(() => {
    let resizeTimer: number | undefined;

    const setAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    const scheduleHeight = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setAppHeight, 120);
    };

    setAppHeight();
    window.addEventListener('resize', scheduleHeight, { passive: true });
    window.addEventListener('orientationchange', scheduleHeight, { passive: true });

    const coarseTouch =
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    let normalizer: { kill?: () => void } | undefined;
    let idleId: number | undefined;
    let scrollTimer: number | undefined;

    if (coarseTouch) {
      const loadScrollNormalizer = () => {
        void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollModule]) => {
          const gsap = gsapModule.default;
          const ScrollTrigger = scrollModule.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);
          const normalizeScroll = ScrollTrigger.normalizeScroll as unknown as (vars: {
            allowNestedScroll: boolean;
            syncTouch: boolean;
          }) => { kill?: () => void };
          normalizer = normalizeScroll({ allowNestedScroll: true, syncTouch: false });
        });
      };
      const w = window as Window & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (w.requestIdleCallback) {
        idleId = w.requestIdleCallback(loadScrollNormalizer, { timeout: 1600 });
      } else {
        scrollTimer = window.setTimeout(loadScrollNormalizer, 900);
      }
    }

    return () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (scrollTimer) window.clearTimeout(scrollTimer);
      if (idleId && 'cancelIdleCallback' in window) {
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
      }
      window.removeEventListener('resize', scheduleHeight);
      window.removeEventListener('orientationchange', scheduleHeight);
      normalizer?.kill?.();
    };
  });

  $effect(() => {
    if (!browser || didFirstVisitRedirect) return;
    if (
      settingsStore.loaded &&
      !settingsStore.current.onboardingDone &&
      $page.url.pathname === '/'
    ) {
      didFirstVisitRedirect = true;
      settingsStore.update({ onboardingDone: true });
      goto('/welcome', { replaceState: true });
    }
  });

  $effect(() => {
    if (!browser) return;
    const theme = settingsStore.current.theme;
    const root = document.documentElement;
    const apply = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && prefersDark));
    };
    apply();
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  });
</script>

<DbErrorBoundary>
  <AppShell>
    {@render children()}
  </AppShell>
  <BottomNav />
  <CookieBanner />
  <ToastContainer />
</DbErrorBoundary>
