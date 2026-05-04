<script lang="ts">
  import { goto } from '$app/navigation';
  import { ArrowRight, Database, Cpu, Shield, Github, Lock } from 'lucide-svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import OfficialLinkButton from '$lib/components/shared/OfficialLinkButton.svelte';
  import PrivacyNotice from '$lib/components/shared/PrivacyNotice.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { getCategory } from '$lib/constants/categories';
  import { getCategoryFacts, type FeeRow } from '$lib/constants/category-facts';
  import { formatFee, isDualPeriod } from '$lib/utils/currency';
  import { DATA_LAST_VERIFIED } from '$lib/constants/data-version';
  import type { DeadlineCategory } from '$lib/types';

  const language = $derived(t.language);

  const TIMELINE_DOCS: DeadlineCategory[] = ['id-card', 'passport', 'drivers-license'];

  function docLabel(id: DeadlineCategory): string {
    const cat = getCategory(id);
    return language === 'en' ? cat.labelEn : cat.labelBg;
  }

  function serviceLabel(row: FeeRow): string {
    const i = t.current.infoPanel;
    if (row.serviceKey === 'standard') return i.serviceStandard;
    if (row.serviceKey === 'fast') return i.serviceFast;
    if (row.serviceKey === 'express') return i.serviceExpress;
    return i.serviceRegular;
  }

  function durationLabel(row: FeeRow): string {
    const i = t.current.infoPanel;
    if (row.durationKey === 'days30') return i.serviceStandardDays;
    if (row.durationKey === 'days3') return i.serviceFastDays;
    if (row.durationKey === 'hours8') return i.serviceExpressHours;
    return '—';
  }

  // Timeline zones — % widths sum to 100. Safe zone is most of validity,
  // recommended-renewal is the last ~10%, penalty zone shown after expiry.
  const TIMELINE = {
    safePct: 80,
    warnPct: 12,
    penaltyPct: 8
  };

  const verifiedFormatted = $derived(
    new Date(DATA_LAST_VERIFIED).toLocaleDateString(language === 'en' ? 'en-GB' : 'bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  );

  const faqJson = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: t.current.howItWorks.onDeviceTitle,
          acceptedAnswer: {
            '@type': 'Answer',
            text: t.current.howItWorks.onDeviceBody
          }
        },
        {
          '@type': 'Question',
          name: t.current.howItWorks.notCollectedTitle,
          acceptedAnswer: {
            '@type': 'Answer',
            text: t.current.howItWorks.notCollected.join(', ')
          }
        },
        {
          '@type': 'Question',
          name: t.current.howItWorks.controlTitle,
          acceptedAnswer: {
            '@type': 'Answer',
            text: t.current.howItWorks.controlBody
          }
        }
      ]
    })
  );
</script>

<svelte:head>
  <title>{t.current.seo.howItWorksTitle}</title>
  <meta name="description" content={t.current.seo.howItWorksDescription} />
  <meta property="og:title" content={t.current.seo.howItWorksTitle} />
  <meta property="og:description" content={t.current.seo.howItWorksDescription} />
  <script type="application/ld+json">{faqJson}</script>
</svelte:head>

<section class="accent-panel mb-6 rounded-[24px] p-6 md:p-9">
  <div class="panel-content grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
    <div>
      <h1 class="max-w-3xl text-[34px] font-semibold leading-tight tracking-tight text-text md:text-[56px]">
        {t.current.howItWorks.title}
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-7 text-text-soft md:text-lg">
        {t.current.howItWorks.headline}
      </p>
      <div class="mt-7">
        <Button onclick={() => goto('/deadlines/new')}>{t.current.howItWorks.cta}</Button>
      </div>
    </div>

    <div class="hidden min-h-[320px] place-items-center lg:grid" aria-hidden="true">
      <div class="privacy-mark relative grid h-56 w-56 place-items-center">
        <span class="ring ring-1"></span>
        <span class="ring ring-2"></span>
        <span class="ring ring-3"></span>
        <span class="core grid h-20 w-20 place-items-center rounded-full">
          <Lock size={28} class="text-accent" strokeWidth={1.6} />
        </span>
      </div>
    </div>
  </div>
</section>

<div class="flex flex-col gap-6 md:gap-8">
  <!-- Privacy summary card -->
  <section
    class="scroll-reveal accent-panel rounded-[var(--radius-card)] p-5 md:p-6"
  >
    <div class="panel-content">
      <PrivacyNotice />
    </div>
  </section>

  <!-- Data flow infographic -->
  <section class="scroll-reveal glass-card rounded-[var(--radius-card)] p-5 md:p-6">
    <p class="eyebrow mb-4">{t.current.howItWorks.onDeviceTitle}</p>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">
      <div class="flex flex-col items-center gap-2 rounded-[var(--radius-control)] border border-border bg-bg/70 px-4 py-4 text-center">
        <Cpu size={20} aria-hidden="true" class="text-accent" strokeWidth={1.6} />
        <span class="text-sm text-text">{t.current.howItWorks.dataFlowInput}</span>
      </div>
      <div class="hidden items-center justify-center sm:flex">
        <ArrowRight size={18} aria-hidden="true" class="text-muted" />
      </div>
      <div class="flex flex-col items-center gap-2 rounded-[var(--radius-control)] border border-border bg-bg/70 px-4 py-4 text-center">
        <Cpu size={20} aria-hidden="true" class="text-accent" strokeWidth={1.6} />
        <span class="text-sm text-text">{t.current.howItWorks.dataFlowProcess}</span>
      </div>
      <div class="hidden items-center justify-center sm:flex">
        <ArrowRight size={18} aria-hidden="true" class="text-muted" />
      </div>
      <div class="flex flex-col items-center gap-2 rounded-[var(--radius-control)] border border-accent-border bg-accent-light/40 px-4 py-4 text-center">
        <Database size={20} aria-hidden="true" class="text-accent" strokeWidth={1.6} />
        <span class="text-sm text-text">{t.current.howItWorks.dataFlowStorage}</span>
      </div>
    </div>

    <div class="mt-4 flex items-start gap-2 text-sm text-muted">
      <Shield size={16} aria-hidden="true" strokeWidth={1.6} class="mt-0.5 shrink-0 text-accent" />
      <p>{t.current.howItWorks.dataFlow} {t.current.howItWorks.noServer}</p>
    </div>
  </section>

  <!-- Validity timelines per document -->
  <section class="flex flex-col gap-4">
    <p class="eyebrow">{t.current.howItWorks.timelineTitle('').replace('— ', '').trim()}</p>

    {#each TIMELINE_DOCS as docId (docId)}
      {@const facts = getCategoryFacts(docId)}
      {@const validity = language === 'en' ? facts.validityEn : facts.validityBg}
      <article class="scroll-reveal glass-card rounded-[var(--radius-card)] p-5 md:p-6">
        <header class="mb-3 flex items-baseline justify-between gap-3">
          <h3 class="text-base font-medium text-text">{docLabel(docId)}</h3>
        </header>

        {#if validity}
          <p class="mb-4 text-sm text-text-soft">{validity}</p>
        {/if}

        <div class="mb-2 flex justify-between text-[11px] tabular-nums text-muted">
          <span>{t.current.howItWorks.issuedLabel}</span>
          <span>{t.current.howItWorks.expiresLabel}</span>
        </div>

        <div class="flex h-4 w-full overflow-hidden rounded-full border border-border" role="img" aria-label={t.current.howItWorks.timelineTitle(docLabel(docId))}>
          <div
            class="border-r border-accent-border bg-accent-light"
            style="width: {TIMELINE.safePct}%"
            aria-hidden="true"
          ></div>
          <div
            class="border-r border-warning/40 bg-warning-light"
            style="width: {TIMELINE.warnPct}%"
            aria-hidden="true"
          ></div>
          <div
            class="bg-danger-light"
            style="width: {TIMELINE.penaltyPct}%"
            aria-hidden="true"
          ></div>
        </div>

        <ul class="mt-3 grid grid-cols-1 gap-1.5 text-xs text-muted sm:grid-cols-3">
          <li class="flex items-center gap-2">
            <span class="inline-block h-2.5 w-2.5 rounded-sm border border-accent-border bg-accent-light" aria-hidden="true"></span>
            {t.current.howItWorks.safeZone}
          </li>
          <li class="flex items-center gap-2">
            <span class="inline-block h-2.5 w-2.5 rounded-sm border border-warning/40 bg-warning-light" aria-hidden="true"></span>
            {t.current.howItWorks.recommendedRenewal}
          </li>
          <li class="flex items-center gap-2">
            <span class="inline-block h-2.5 w-2.5 rounded-sm bg-danger-light" aria-hidden="true"></span>
            {t.current.howItWorks.penaltyZone}
          </li>
        </ul>

        {#if facts.fees && facts.fees.length}
          <div class="mt-5 overflow-hidden rounded-[var(--radius-control)] border border-border">
            <table class="w-full text-sm">
              <thead class="bg-bg/70 text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th class="px-3 py-2 font-medium">{t.current.howItWorks.feesColService}</th>
                  <th class="px-3 py-2 font-medium">{t.current.howItWorks.feesColDuration}</th>
                  <th class="px-3 py-2 text-right font-medium">{t.current.howItWorks.feesColPrice}</th>
                </tr>
              </thead>
              <tbody>
                {#each facts.fees as row, idx (row.serviceKey)}
                  <tr class={idx > 0 ? 'border-t border-border' : ''}>
                    <td class="px-3 py-2 text-text">{serviceLabel(row)}</td>
                    <td class="px-3 py-2 text-text-soft">{durationLabel(row)}</td>
                    <td class="px-3 py-2 text-right text-text tabular-nums">{formatFee(row.euro, row.bgn)}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </article>
    {/each}

    {#if isDualPeriod()}
      <p class="text-xs text-muted">{t.current.currency.dualDisplayNote}</p>
    {/if}
  </section>

  <!-- Trust block -->
  <section class="scroll-reveal glass-card rounded-[var(--radius-card)] p-5 md:p-6">
    <p class="eyebrow mb-3">{t.current.howItWorks.trustTitle}</p>

    <ul class="flex flex-col gap-3 text-sm text-text-soft">
      <li class="flex items-start gap-2">
        <Github size={16} aria-hidden="true" strokeWidth={1.6} class="mt-0.5 shrink-0 text-accent" />
        <span>{t.current.howItWorks.openSource}</span>
      </li>
      <li class="flex items-start gap-2">
        <Shield size={16} aria-hidden="true" strokeWidth={1.6} class="mt-0.5 shrink-0 text-accent" />
        <span>{t.current.howItWorks.noServer}</span>
      </li>
    </ul>

    <div class="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <OfficialLinkButton
        href="https://github.com/stoyanbtanev/sroknik"
        label="github.com/stoyanbtanev/sroknik"
      />
      <OfficialLinkButton
        href="https://github.com/stoyanbtanev/sroknik/issues"
        label={t.current.howItWorks.openIssue}
      />
    </div>

    <div class="mt-5 border-t border-border pt-4">
      <p class="mb-2 text-sm text-muted">{t.current.howItWorks.dataSources}</p>
      <div class="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <OfficialLinkButton href="https://www.mvr.bg/" label="mvr.bg" />
        <OfficialLinkButton href="https://www.mfa.bg/" label="mfa.bg" />
        <OfficialLinkButton href="https://egov.bg/" label="egov.bg" />
        <OfficialLinkButton href="https://www.bgtoll.bg/" label="bgtoll.bg" />
      </div>
      <p class="mt-3 text-xs text-muted">
        {t.current.howItWorks.dataLastVerified} {verifiedFormatted}
      </p>
    </div>
  </section>

  <!-- Existing supporting cards -->
  <section class="grid grid-cols-1 gap-3 md:grid-cols-2">
    <article class="scroll-reveal glass-card rounded-[var(--radius-card)] p-5">
      <p class="eyebrow mb-2">{t.current.howItWorks.controlTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.controlBody}</p>
    </article>

    <article class="scroll-reveal glass-card rounded-[var(--radius-card)] p-5">
      <p class="eyebrow mb-2">{t.current.howItWorks.bgFirstTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.bgFirstBody}</p>
    </article>
  </section>

  <section class="scroll-reveal glass-card rounded-[var(--radius-card)] p-5">
    <p class="eyebrow mb-3">{t.current.howItWorks.notCollectedTitle}</p>
    <ul class="grid grid-cols-1 gap-2 text-sm text-text-soft sm:grid-cols-2">
      {#each t.current.howItWorks.notCollected as item (item)}
        <li class="rounded-[var(--radius-control)] border border-border bg-bg/70 px-3 py-2">
          {item}
        </li>
      {/each}
    </ul>
  </section>

  <div>
    <Button onclick={() => goto('/deadlines/new')}>{t.current.howItWorks.cta}</Button>
  </div>
</div>
