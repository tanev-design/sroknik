<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import {
    settingsRepo,
    type ActivateErrorCode
  } from '$lib/db/repositories/settings';
  import { t } from '$lib/copy/i18n.svelte';
  import { toast } from '$lib/stores/toast.svelte';
  import {
    Check,
    CreditCard,
    Download,
    ExternalLink,
    Infinity,
    Loader2,
    Lock,
    Shield,
    Smartphone,
    UsersRound,
    Zap
  } from 'lucide-svelte';

  const isPlus = $derived(
    settingsStore.current.plan === 'plus' || !!settingsStore.current.plusActivated
  );
  const subStatus = $derived(settingsStore.current.plusSubscriptionStatus ?? null);
  const periodEnd = $derived(settingsStore.current.plusCurrentPeriodEnd ?? null);
  const priceId = $derived(settingsStore.current.plusPriceId ?? null);

  // Stripe configuration. Publishable key and pricing-table id are PUBLIC
  // by Stripe design (they cannot move money, only tokenize cards) — safe to
  // ship as defaults. Env vars override for staging/test mode.
  const pricingTableId =
    (import.meta.env.VITE_STRIPE_PRICING_TABLE_ID as string | undefined) ||
    'prctbl_1TT7h84K33DXvpEKjoLQLcLK';
  const publishableKey =
    (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined) ||
    'pk_live_51TEdTM4K33DXvpEKkpYCHv6PuQiAWwxotcTaWHzqfClnNiyV5NaBsPaVFg17LCCQ38ZUkP7LpeOUA1T1NOeVbL8M00zGLAMh7T';
  const portalUrl =
    (import.meta.env.VITE_STRIPE_PORTAL_URL as string | undefined) ||
    'https://billing.stripe.com/p/login/00w28k3LMcWGf6X9vP5ZC00';
  const monthlyPriceId =
    (import.meta.env.VITE_STRIPE_PRICE_MONTHLY as string | undefined) ||
    'price_1TT64f4K33DXvpEKgll5pvhb';
  const yearlyPriceId =
    (import.meta.env.VITE_STRIPE_PRICE_YEARLY as string | undefined) ||
    'price_1TT64f4K33DXvpEKQ5B5H3oI';

  // Load Stripe pricing-table script. The custom element upgrades in place
  // whenever the script finishes — no need to gate rendering on load state.
  onMount(() => {
    if (!document.querySelector('script[src="https://js.stripe.com/v3/pricing-table.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://js.stripe.com/v3/pricing-table.js';
      s.async = true;
      document.head.appendChild(s);
    }

    // Auto-activation after Stripe Checkout success. Stripe substitutes
    // {CHECKOUT_SESSION_ID} in the pricing-table success URL → arrives here.
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) void autoActivate(sessionId);
  });

  let autoState = $state<'idle' | 'working' | 'failed'>('idle');
  let licenseKey = $state('');
  let activateState = $state<'idle' | 'working'>('idle');
  let activateError = $state<string | null>(null);

  async function autoActivate(sessionId: string): Promise<void> {
    if (settingsStore.current.plusActivated) {
      cleanUrl();
      return;
    }
    autoState = 'working';
    const key = await settingsRepo.lookupBySession(sessionId);
    if (!key) {
      autoState = 'failed';
      return;
    }
    const res = await settingsRepo.activatePlus(key);
    if (res.ok) {
      autoState = 'idle';
      toast.success(t.current.plusV2.activeTitle);
      cleanUrl();
    } else {
      autoState = 'failed';
    }
  }

  function cleanUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('session_id');
    window.history.replaceState({}, '', url.toString());
  }

  async function activateManual(): Promise<void> {
    activateState = 'working';
    activateError = null;
    const res = await settingsRepo.activatePlus(licenseKey);
    activateState = 'idle';

    if (res.ok) {
      toast.success(t.current.plusV2.activeTitle);
      licenseKey = '';
      return;
    }

    activateError = errorMessage(res.error);
  }

  function errorMessage(code: ActivateErrorCode | undefined): string {
    const errors = t.current.plusV2.activateErrors;
    if (code === 'invalid_format') return errors.invalidFormat;
    if (code === 'not_found' || code === 'invalid_key') return errors.notFound;
    if (code === 'revoked') return errors.revoked;
    if (code === 'inactive') return errors.inactive;
    if (code === 'too_many_activations') return errors.tooManyActivations;
    if (code === 'rate_limited') return errors.rateLimited;
    if (code === 'network_error') return errors.networkError;
    return errors.serverError;
  }

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

</script>

<svelte:head>
  <title>{t.current.plusV2.eyebrow} — {t.current.plusV2.headline}</title>
  <meta name="description" content={t.current.seo.plusDescription} />
  <meta property="og:title" content={`${t.current.plusV2.eyebrow} — ${t.current.plusV2.headline}`} />
  <meta property="og:description" content={t.current.seo.plusDescription} />
</svelte:head>

<TopBar title={t.current.plus.title} subtitle={t.current.plusV2.subscriptionLabel} />

<div class="mx-auto flex max-w-5xl flex-col gap-7">
  <section class="accent-panel rounded-[26px] p-5 md:p-8 xl:p-10">
    <div class="panel-content grid gap-7 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <div class="mb-4 inline-flex min-h-[34px] items-center gap-2 rounded-full border border-[var(--color-accent-border)] bg-surface/70 px-3 text-xs font-semibold uppercase tracking-wide text-accent">
          <Zap size={14} aria-hidden="true" />
          {t.current.plusPremium.badge}
        </div>
        <p class="eyebrow mb-3">{t.current.plusPremium.eyebrow}</p>
        <h2 class="max-w-2xl text-[32px] font-semibold leading-[1.08] tracking-tight text-text md:text-[52px]">
          {t.current.plusPremium.headline}
        </h2>
        <p class="mt-5 max-w-2xl text-sm leading-7 text-text-soft md:text-base md:leading-8">
          {t.current.plusPremium.lede}
        </p>
        <div class="mt-6 flex flex-wrap gap-2.5">
          <span class="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-semibold text-white">
            {t.current.plusV2.subscriptionLabel}
          </span>
          <span class="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] border border-[var(--color-accent-border)] bg-surface/70 px-4 text-sm font-medium text-text">
            {t.current.plusPremium.deviceTitle}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <article class="metric-card rounded-[var(--radius-card)] p-4 md:p-5">
          <UsersRound size={20} class="text-accent" aria-hidden="true" />
          <p class="mt-4 text-3xl font-semibold tabular-nums text-text">6</p>
          <p class="text-xs text-muted">{t.current.plusPremium.peopleMetric}</p>
        </article>
        <article class="metric-card rounded-[var(--radius-card)] p-4 md:p-5">
          <Zap size={20} class="text-accent" aria-hidden="true" />
          <p class="mt-4 text-3xl font-semibold tabular-nums text-text">5</p>
          <p class="text-xs text-muted">{t.current.plusPremium.carsMetric}</p>
        </article>
        <article class="metric-card rounded-[var(--radius-card)] p-4 md:p-5">
          <Infinity size={20} class="text-accent" aria-hidden="true" />
          <p class="mt-4 text-2xl font-semibold text-text">{t.current.plusPremium.unlimitedMetric}</p>
          <p class="text-xs text-muted">{t.current.plusPremium.recordsMetric}</p>
        </article>
        <article class="metric-card rounded-[var(--radius-card)] p-4 md:p-5">
          <Smartphone size={20} class="text-accent" aria-hidden="true" />
          <p class="mt-4 text-3xl font-semibold tabular-nums text-text">3</p>
          <p class="text-xs text-muted">{t.current.plusPremium.deviceTitle}</p>
        </article>
      </div>
    </div>
  </section>

  {#if autoState === 'working'}
    <div class="glass-card flex items-center gap-3 rounded-[var(--radius-card)] p-4">
      <Loader2 size={18} class="shrink-0 animate-spin text-accent" aria-hidden="true" />
      <p class="text-sm text-text">{t.current.plusV2.autoActivating}</p>
    </div>
  {:else if autoState === 'failed'}
    <div class="glass-card rounded-[var(--radius-card)] border border-[var(--color-danger)]/30 p-4">
      <p class="text-sm text-text">{t.current.plusV2.autoActivateFailed}</p>
      <p class="mt-1 text-xs text-muted">{t.current.plusV2.autoActivateFailedHint}</p>
    </div>
  {/if}

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
    <section class="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="grid gap-3">
        <article class="glass-card rounded-[var(--radius-card)] p-5">
          <CreditCard size={18} class="text-accent" aria-hidden="true" />
          <p class="mt-4 text-sm font-semibold text-text">{t.current.plusPremium.billingTitle}</p>
          <p class="mt-2 text-sm leading-6 text-muted">{t.current.plusPremium.billingBody}</p>
        </article>
        <article class="glass-card rounded-[var(--radius-card)] p-5">
          <Smartphone size={18} class="text-accent" aria-hidden="true" />
          <p class="mt-4 text-sm font-semibold text-text">{t.current.plusPremium.deviceTitle}</p>
          <p class="mt-2 text-sm leading-6 text-muted">{t.current.plusPremium.deviceBody}</p>
        </article>
      </div>

      <div class="glass-card rounded-[var(--radius-card)] p-5">
        <div class="mb-4 flex items-baseline justify-between gap-4">
          <div>
            <p class="text-lg font-semibold text-text">{t.current.plusPremium.checkoutTitle}</p>
            <p class="text-sm text-muted">{t.current.plusV2.subscriptionLabel}</p>
          </div>
        </div>

        {@html `<stripe-pricing-table pricing-table-id="${pricingTableId}" publishable-key="${publishableKey}"></stripe-pricing-table>`}

        <p class="mt-3 text-center text-xs text-muted">
          {t.current.plusV2.stripeNote}
        </p>

        <form
          class="mt-5 rounded-[var(--radius-control)] border border-border bg-bg/50 p-3"
          onsubmit={(e) => {
            e.preventDefault();
            void activateManual();
          }}
        >
          <label class="block">
            <span class="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
              {t.current.plusV2.haveKey}
            </span>
            <input
              data-testid="plus-key-input"
              bind:value={licenseKey}
              placeholder={t.current.plusV2.keyPlaceholder}
              autocomplete="off"
              class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm font-medium uppercase tracking-wide text-text placeholder:text-muted focus:border-[var(--color-border-strong)] focus:outline-none"
            />
          </label>
          {#if activateError}
            <p class="mt-2 text-xs text-[var(--color-danger)]">{activateError}</p>
          {/if}
          <button
            data-testid="plus-activate-button"
            type="submit"
            disabled={activateState === 'working'}
            class="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-semibold text-white transition-[transform,opacity] duration-100 active:scale-[0.98] active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {activateState === 'working' ? t.current.plusV2.activating : t.current.plusV2.activateCta}
          </button>
        </form>
      </div>
    </section>
  {/if}

  <section>
    <p class="mb-3 eyebrow">{t.current.plusPremium.valueTitle}</p>
    <div class="grid gap-3 md:grid-cols-3">
      <article class="glass-card rounded-[var(--radius-card)] p-5">
        <Infinity size={18} class="text-accent" aria-hidden="true" />
        <p class="mt-4 text-sm font-semibold text-text">{t.current.plusPremium.limitsTitle}</p>
        <p class="mt-2 text-sm leading-6 text-muted">{t.current.plusPremium.limitsBody}</p>
      </article>
      <article class="glass-card rounded-[var(--radius-card)] p-5">
        <Download size={18} class="text-accent" aria-hidden="true" />
        <p class="mt-4 text-sm font-semibold text-text">{t.current.plusPremium.backupTitle}</p>
        <p class="mt-2 text-sm leading-6 text-muted">{t.current.plusV2.trust.dataYoursBody}</p>
      </article>
      <article class="glass-card rounded-[var(--radius-card)] p-5">
        <Shield size={18} class="text-accent" aria-hidden="true" />
        <p class="mt-4 text-sm font-semibold text-text">{t.current.plusPremium.privacyTitle}</p>
        <p class="mt-2 text-sm leading-6 text-muted">{t.current.plusPremium.privacyBody}</p>
      </article>
    </div>
  </section>

  <section>
    <p class="mb-3 eyebrow">{t.current.plusPremium.comparisonTitle}</p>
    <div class="glass-card overflow-hidden rounded-[var(--radius-card)]">
      <div
        class="grid grid-cols-[1.25fr_0.7fr_0.8fr] border-b border-border px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted"
      >
        <span></span>
        <span class="text-center">{t.current.plusV2.colFree}</span>
        <span class="text-center text-accent">{t.current.plusV2.colPlus}</span>
      </div>
      {#each t.current.plusV2.rows as row, i (i)}
        <div
          class="grid grid-cols-[1.25fr_0.7fr_0.8fr] items-center border-b border-border px-4 py-3 text-sm last:border-0 {i %
            2 ===
          0
            ? 'bg-bg/20'
            : ''}"
        >
          <span class="text-text">{row.label}</span>
          <span class="text-center text-muted tabular-nums">{row.free}</span>
          <span
            class="inline-flex min-h-[32px] items-center justify-center rounded-full px-2 text-center font-semibold tabular-nums {row.plus ===
            row.free
              ? 'text-muted'
              : 'bg-accent-light text-accent'}"
          >
            {row.plus}
          </span>
        </div>
      {/each}
    </div>
  </section>

  {#if isPlus}
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
  {/if}

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
</div>
