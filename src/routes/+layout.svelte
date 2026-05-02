<script lang="ts">
  import '../app.css';
  import AppShell from '$lib/components/layout/AppShell.svelte';
  import BottomNav from '$lib/components/layout/BottomNav.svelte';
  import CookieNotice from '$lib/components/shared/CookieNotice.svelte';
  import Onboarding from '$lib/components/onboarding/Onboarding.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();

  const showOnboarding = $derived(
    settingsStore.loaded && !settingsStore.current.onboardingDone && $page.url.pathname === '/'
  );

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

<AppShell>
  {@render children()}
</AppShell>
<BottomNav />
<CookieNotice />

{#if showOnboarding}
  <Onboarding />
{/if}
