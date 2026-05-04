<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import {
    acceptAllConsent,
    acceptNecessaryConsent,
    readConsent
  } from '$lib/consent';
  import { t } from '$lib/copy/i18n.svelte';
  import Button from './Button.svelte';
  import CookieSettings from './CookieSettings.svelte';

  let visible = $state(false);
  let customize = $state(false);
  let mounted = $state(false);

  onMount(() => {
    visible = readConsent() === null;
    // double-rAF: paint once, then reveal — no flash, smooth slide-up
    requestAnimationFrame(() => requestAnimationFrame(() => (mounted = true)));
  });

  function acceptAll(): void {
    acceptAllConsent();
    dismiss();
  }

  function necessaryOnly(): void {
    acceptNecessaryConsent();
    dismiss();
  }

  function dismiss(): void {
    mounted = false;
    setTimeout(() => {
      visible = false;
      customize = false;
    }, 220);
  }

  function onSaved(): void {
    dismiss();
  }
</script>

{#if browser && visible}
  <aside
    role="region"
    aria-label={t.current.cookies.banner.title}
    class="cookie-banner fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[1040px] border-t border-border bg-surface/95 p-4 shadow-[0_-12px_40px_rgba(26,25,23,0.10)] backdrop-blur-md md:inset-x-5 md:bottom-5 md:rounded-[var(--radius-card)] md:border md:p-4 md:shadow-[0_18px_60px_rgba(26,25,23,0.14)]"
    style="padding-bottom: max(env(safe-area-inset-bottom), 1rem); transform: translateY({mounted ? '0' : '110%'}); opacity: {mounted ? 1 : 0}; transition: transform 240ms cubic-bezier(.2,.8,.2,1), opacity 200ms ease;"
  >
    {#if customize}
      <CookieSettings compact {onSaved} />
      <button
        type="button"
        onclick={() => (customize = false)}
        class="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-[var(--radius-control)] text-sm font-medium text-muted hover:text-text"
      >
        ←
        {t.current.cookies.banner.title}
      </button>
    {:else}
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-text">{t.current.cookies.banner.title}</p>
          <p class="mt-1 max-w-3xl text-sm leading-5 text-muted">
            {t.current.cookies.banner.body}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-2 md:flex md:shrink-0 md:items-center md:gap-2">
          <Button size="sm" onclick={acceptAll} fullWidth>
            {t.current.cookies.banner.acceptAll}
          </Button>
          <Button size="sm" variant="secondary" onclick={necessaryOnly} fullWidth>
            {t.current.cookies.banner.necessaryOnly}
          </Button>
          <Button size="sm" variant="ghost" onclick={() => (customize = true)} fullWidth>
            {t.current.cookies.banner.customize}
          </Button>
          <a
            href="/cookies"
            class="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-control)] px-3 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t.current.cookies.learnMore}
          </a>
        </div>
      </div>
    {/if}
  </aside>
{/if}
