<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import {
    readConsent,
    saveConsent,
    type CookieConsentState
  } from '$lib/consent';
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    onSaved?: (state: CookieConsentState) => void;
    compact?: boolean;
  }

  let { onSaved, compact = false }: Props = $props();

  let current = $state<CookieConsentState | null>(null);
  let analytics = $state(false);
  let marketing = $state(false);

  function apply(state: CookieConsentState | null): void {
    current = state;
    analytics = !!state?.analytics;
    marketing = !!state?.marketing;
  }

  onMount(() => {
    apply(readConsent());
    const onChange = (event: Event): void => {
      apply((event as CustomEvent<CookieConsentState>).detail);
    };
    window.addEventListener('consent:change', onChange);
    return () => window.removeEventListener('consent:change', onChange);
  });

  function save(): void {
    const state = saveConsent({ analytics, marketing });
    apply(state);
    onSaved?.(state);
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleString(t.language === 'bg' ? 'bg-BG' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }
</script>

<section class="flex flex-col gap-5">
  <div>
    <h2 class="{compact ? 'text-base' : 'text-xl'} font-semibold leading-tight text-text">
      {t.current.cookies.settings.title}
    </h2>
    <p class="mt-1 text-sm leading-6 text-muted">{t.current.cookies.settings.body}</p>
  </div>

  <div class="grid gap-3">
    <div class="rounded-[var(--radius-control)] border border-border bg-surface p-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-text">
            {t.current.cookies.banner.categoryNecessary}
          </p>
          <p class="mt-1 text-xs leading-5 text-muted">
            {t.current.cookies.settings.necessaryBody}
          </p>
        </div>
        <span
          class="inline-flex min-h-[32px] items-center rounded-full bg-accent-light px-3 text-xs font-medium text-accent"
        >
          {t.current.cookies.settings.locked}
        </span>
      </div>
    </div>

    <button
      type="button"
      role="switch"
      aria-checked={analytics}
      onclick={() => (analytics = !analytics)}
      class="flex min-h-[64px] items-center justify-between gap-4 rounded-[var(--radius-control)] border border-border bg-surface p-4 text-left transition-[border-color,background-color,transform] duration-150 active:scale-[0.98] hover:border-[var(--color-border-strong)]"
    >
      <span>
        <span class="block text-sm font-medium text-text">
          {t.current.cookies.banner.categoryAnalytics}
        </span>
        <span class="mt-1 block text-xs leading-5 text-muted">
          {t.current.cookies.settings.analyticsBody}
        </span>
      </span>
      <span
        class="relative inline-flex h-7 w-12 shrink-0 rounded-full border border-border bg-elevated transition-colors {analytics
          ? 'border-accent bg-accent'
          : ''}"
        aria-hidden="true"
      >
        <span
          class="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-surface shadow-sm transition-transform {analytics
            ? 'translate-x-5'
            : ''}"
        ></span>
      </span>
    </button>

    <button
      type="button"
      role="switch"
      aria-checked={marketing}
      onclick={() => (marketing = !marketing)}
      class="flex min-h-[64px] items-center justify-between gap-4 rounded-[var(--radius-control)] border border-border bg-surface p-4 text-left transition-[border-color,background-color,transform] duration-150 active:scale-[0.98] hover:border-[var(--color-border-strong)]"
    >
      <span>
        <span class="block text-sm font-medium text-text">
          {t.current.cookies.banner.categoryMarketing}
        </span>
        <span class="mt-1 block text-xs leading-5 text-muted">
          {t.current.cookies.settings.marketingBody}
        </span>
      </span>
      <span
        class="relative inline-flex h-7 w-12 shrink-0 rounded-full border border-border bg-elevated transition-colors {marketing
          ? 'border-accent bg-accent'
          : ''}"
        aria-hidden="true"
      >
        <span
          class="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-surface shadow-sm transition-transform {marketing
            ? 'translate-x-5'
            : ''}"
        ></span>
      </span>
    </button>
  </div>

  <div class="rounded-[var(--radius-control)] border border-border bg-elevated p-4">
    <p class="text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.cookies.settings.currentState}
    </p>
    {#if current}
      <dl class="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt class="text-muted">{t.current.cookies.banner.categoryAnalytics}</dt>
          <dd class="font-medium text-text">
            {current.analytics ? t.current.cookies.settings.enabled : t.current.cookies.settings.disabled}
          </dd>
        </div>
        <div>
          <dt class="text-muted">{t.current.cookies.banner.categoryMarketing}</dt>
          <dd class="font-medium text-text">
            {current.marketing ? t.current.cookies.settings.enabled : t.current.cookies.settings.disabled}
          </dd>
        </div>
      </dl>
      <p class="mt-3 text-xs text-muted">
        {t.current.cookies.settings.lastUpdated}: {formatDate(current.ts)}
      </p>
    {:else}
      <p class="mt-2 text-sm text-muted">{t.current.cookies.settings.notSet}</p>
    {/if}
  </div>

  <Button onclick={save} fullWidth={compact}>
    {t.current.cookies.banner.save}
  </Button>
</section>
