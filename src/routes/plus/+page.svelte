<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { deadlinesStore } from '$lib/stores/deadlines.svelte';
  import { carsStore } from '$lib/stores/cars.svelte';
  import { peopleStore } from '$lib/stores/people.svelte';
  import { settingsRepo, type ActivateErrorCode } from '$lib/db/repositories/settings';
  import { t } from '$lib/copy/i18n.svelte';
  import { toast } from '$lib/stores/toast.svelte';
  import { Check, Download, ExternalLink, Lock, Shield, Zap } from 'lucide-svelte';

  const isPlus = $derived(
    settingsStore.current.plan === 'plus' || !!settingsStore.current.plusActivated
  );
  const keyHint = $derived(settingsStore.current.plusLicenseKeyHint ?? null);
  const subStatus = $derived(settingsStore.current.plusSubscriptionStatus ?? null);
  const periodEnd = $derived(settingsStore.current.plusCurrentPeriodEnd ?? null);
  const priceId = $derived(settingsStore.current.plusPriceId ?? null);

  let licenseKey = $state('');
  let activating = $state(false);
  let errorCode = $state<ActivateErrorCode | null>(null);

  const usage = $derived({
    deadlines: deadlinesStore.active.length,
    cars: carsStore.all.length,
    people: peopleStore.all.length
  });

  // Stripe configuration injected at build time.
  const pricingTableId = import.meta.env.VITE_STRIPE_PRICING_TABLE_ID as string | undefined;
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
  const portalUrl = import.meta.env.VITE_STRIPE_PORTAL_URL as string | undefined;
  const monthlyPriceId = import.meta.env.VITE_STRIPE_PRICE_MONTHLY as string | undefined;
  const yearlyPriceId = import.meta.env.VITE_STRIPE_PRICE_YEARLY as string | undefined;

  // Load Stripe pricing-table script once when the embed is configured.
  let pricingTableLoaded = $state(false);
  onMount(() => {
    if (!pricingTableId || !publishableKey) return;
    const existing = document.querySelector(
      'script[src="https://js.stripe.com/v3/pricing-table.js"]'
    );
    if (existing) {
      pricingTableLoaded = true;
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://js.stripe.com/v3/pricing-table.js';
    s.async = true;
    s.onload = () => {
      pricingTableLoaded = true;
    };
    document.head.appendChild(s);
  });

  const planLabel = $derived.by(() => {
    if (priceId && yearlyPriceId && priceId === yearlyPriceId) return t.current.plusV2.planYearly;
    if (priceId && monthlyPriceId && priceId === monthlyPriceId) return t.current.plusV2.planMonthly;
    return t.current.plusV2.planActive;
  });

  const renewalLabel = $derived.by(() => {
    if (!periodEnd) return null;
    const d = new Date(periodEnd);
    return d.toLocaleDateString(settingsStore.current.locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  async function activate(): Promise<void> {
    if (!licenseKey.trim()) return;
    activating = true;
    errorCode = null;
    const res = await settingsRepo.activatePlus(licenseKey);
    activating = false;
    if (res.ok) {
      licenseKey = '';
      toast.success(t.current.plusV2.activeTitle);
    } else {
      errorCode = res.error ?? 'server_error';
    }
  }

  const errorMessage = $derived.by(() => {
    if (!errorCode) return '';
    const map = t.current.plusV2.activateErrors;
    switch (errorCode) {
      case 'invalid_format':
      case 'invalid_key':
        return map.invalidFormat;
      case 'not_found':
        return map.notFound;
      case 'revoked':
        return map.revoked;
      case 'inactive':
        return map.inactive;
      case 'too_many_activations':
        return map.tooManyActivations;
      case 'rate_limited':
        return map.rateLimited;
      case 'network_error':
        return map.networkError;
      case 'misconfigured':
      case 'server_error':
      default:
        return map.serverError;
    }
  });
</script>

<svelte:head>
  <title>{t.current.plusV2.eyebrow} — {t.current.plusV2.headline}</title>
</svelte:head>

<TopBar title={t.current.plus.title} subtitle={t.current.plusV2.subscriptionLabel} />

<div class="mx-auto flex max-w-2xl flex-col gap-6">
  <!-- Intro -->
  <section class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Zap size={18} class="text-accent" aria-hidden="true" />
      <span class="eyebrow">{t.current.plusV2.eyebrow}</span>
    </div>
    <h1 class="text-2xl font-semibold text-text">{t.current.plusV2.headline}</h1>
    <p class="text-sm leading-relaxed text-muted md:text-base">
      {t.current.plusV2.lede}
    </p>
  </section>

  {#if isPlus}
    <!-- Already activated -->
    <div class="accent-panel rounded-[var(--radius-card)] p-5">
      <div class="panel-content flex items-start gap-3">
        <div class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
          <Check size={20} class="text-accent" aria-hidden="true" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-medium text-text">{t.current.plusV2.activeTitle}</p>
          <p class="mt-0.5 text-sm text-muted">{planLabel}</p>
          {#if subStatus === 'past_due'}
            <p class="mt-2 text-sm text-[var(--color-danger)]">
              {t.current.plusV2.pastDueNotice}
            </p>
          {:else if subStatus === 'canceled'}
            <p class="mt-2 text-sm text-muted">
              {t.current.plusV2.canceledNotice}{#if renewalLabel}
                {' '}{t.current.plusV2.activeUntil(renewalLabel)}
              {/if}
            </p>
          {:else if renewalLabel}
            <p class="mt-2 text-sm text-muted">
              {t.current.plusV2.renewsOn(renewalLabel)}
            </p>
          {/if}
          {#if keyHint}
            <p class="mt-2 text-sm text-muted">
              {t.current.plusV2.activeKeyLabel}: <span class="font-mono">····{keyHint}</span>
            </p>
          {/if}
        </div>
      </div>

      {#if portalUrl}
        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] border border-border bg-bg px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-bg/60"
        >
          {t.current.plusV2.manageCta}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      {/if}
    </div>
  {:else}
    <!-- Purchase -->
    <div class="glass-card rounded-[var(--radius-card)] p-5">
      <div class="mb-4 flex items-baseline justify-between gap-4">
        <div>
          <p class="text-lg font-semibold text-text">{t.current.plus.title}</p>
          <p class="text-sm text-muted">{t.current.plusV2.subscriptionLabel}</p>
        </div>
      </div>

      {#if pricingTableId && publishableKey && pricingTableLoaded}
        {@html `<stripe-pricing-table pricing-table-id="${pricingTableId}" publishable-key="${publishableKey}"></stripe-pricing-table>`}
      {:else if pricingTableId && publishableKey}
        <div class="py-8 text-center text-sm text-muted">{t.current.plusV2.loadingCheckout}</div>
      {:else}
        <button
          type="button"
          disabled
          class="mb-3 block w-full cursor-not-allowed rounded-[var(--radius-control)] bg-accent/40 px-4 py-3 text-center text-sm font-medium text-white"
        >
          {t.current.plus.upgradeComingSoon}
        </button>
      {/if}

      <p class="mt-3 text-center text-xs text-muted">
        {t.current.plusV2.stripeNote}
      </p>
    </div>

    <!-- Activate key -->
    <div class="glass-card rounded-[var(--radius-card)] p-5">
      <p class="mb-3 text-sm font-medium text-text">{t.current.plusV2.haveKey}</p>
      <div class="flex gap-2">
        <input
          data-testid="plus-key-input"
          bind:value={licenseKey}
          placeholder={t.current.plusV2.keyPlaceholder}
          class="h-11 flex-1 rounded-[var(--radius-control)] border border-border bg-bg px-3 font-mono text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
          onkeydown={(e) => {
            if (e.key === 'Enter') void activate();
          }}
        />
        <button
          data-testid="plus-activate-button"
          type="button"
          onclick={() => void activate()}
          disabled={activating || !licenseKey.trim()}
          class="rounded-[var(--radius-control)] bg-accent px-4 text-sm font-medium text-white transition-opacity hover:bg-accent/90 disabled:opacity-50"
        >
          {activating ? t.current.plusV2.activating : t.current.plusV2.activateCta}
        </button>
      </div>
      {#if errorMessage}
        <p class="mt-2 text-xs text-[var(--color-danger)]">{errorMessage}</p>
      {/if}
    </div>
  {/if}

  <!-- Comparison table -->
  <section>
    <p class="mb-3 eyebrow">{t.current.plusV2.comparisonTitle}</p>
    <div class="glass-card overflow-hidden rounded-[var(--radius-card)]">
      <div
        class="grid grid-cols-3 border-b border-border px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted"
      >
        <span></span>
        <span class="text-center">{t.current.plusV2.colFree}</span>
        <span class="text-center text-accent">{t.current.plusV2.colPlus}</span>
      </div>
      {#each t.current.plusV2.rows as row, i (i)}
        <div
          class="grid grid-cols-3 border-b border-border px-4 py-3 text-sm last:border-0 {i %
            2 ===
          0
            ? 'bg-bg/20'
            : ''}"
        >
          <span class="text-text">{row.label}</span>
          <span class="text-center text-muted tabular-nums">{row.free}</span>
          <span
            class="text-center font-medium tabular-nums {row.plus === row.free
              ? 'text-muted'
              : 'text-accent'}"
          >
            {row.plus}
          </span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Trust signals -->
  <section class="grid grid-cols-1 gap-3 md:grid-cols-3">
    <div class="glass-card flex items-start gap-3 rounded-[var(--radius-card)] p-4">
      <Shield size={18} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <p class="text-sm font-medium text-text">{t.current.plusV2.trust.dataYoursTitle}</p>
        <p class="mt-1 text-xs leading-relaxed text-muted">
          {t.current.plusV2.trust.dataYoursBody}
        </p>
      </div>
    </div>
    <div class="glass-card flex items-start gap-3 rounded-[var(--radius-card)] p-4">
      <Download size={18} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <p class="text-sm font-medium text-text">{t.current.plusV2.trust.cancelTitle}</p>
        <p class="mt-1 text-xs leading-relaxed text-muted">
          {t.current.plusV2.trust.cancelBody}
        </p>
      </div>
    </div>
    <div class="glass-card flex items-start gap-3 rounded-[var(--radius-card)] p-4">
      <Lock size={18} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <p class="text-sm font-medium text-text">{t.current.plusV2.trust.noRiskTitle}</p>
        <p class="mt-1 text-xs leading-relaxed text-muted">
          {t.current.plusV2.trust.noRiskBody}
        </p>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section>
    <p class="mb-3 eyebrow">{t.current.plusV2.faqTitle}</p>
    <div class="flex flex-col gap-3">
      {#each t.current.plusV2.faq as faq, i (i)}
        <div class="border-b border-border pb-3 last:border-0">
          <p class="mb-1 text-sm font-medium text-text">{faq.q}</p>
          <p class="text-sm leading-relaxed text-muted">{faq.a}</p>
        </div>
      {/each}
    </div>
  </section>

  {#if !isPlus}
    <p class="text-center text-xs text-muted">
      Активни: {usage.deadlines} срока · {usage.cars} коли · {usage.people} хора
    </p>
  {/if}
</div>
