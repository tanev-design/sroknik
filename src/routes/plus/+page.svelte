<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { FREE_PLAN, PLUS_PLAN } from '$lib/constants/plan';
  import { t } from '$lib/copy/i18n.svelte';
  import { Check } from 'lucide-svelte';

  function featurePeople(n: number) {
    return Number.isFinite(n) ? t.current.plus.featurePeople(n) : t.current.plus.featurePeopleInf;
  }
  function featureCars(n: number) {
    return Number.isFinite(n) ? t.current.plus.featureCars(n) : t.current.plus.featureCarsInf;
  }
  function featureDocs(n: number) {
    return Number.isFinite(n)
      ? t.current.plus.featureDocuments(n)
      : t.current.plus.featureDocumentsInf;
  }
  function featureCustom(n: number) {
    return Number.isFinite(n) ? t.current.plus.featureCustom(n) : t.current.plus.featureCustomInf;
  }
</script>

<TopBar title={t.current.plus.title} subtitle={t.current.plus.subtitle}>
  {#snippet actions()}
    <span
      class="inline-flex items-center rounded-full border border-border bg-accent-light/60 px-2.5 py-1 text-xs font-medium text-accent"
    >
      {t.current.plus.comingSoonBadge}
    </span>
  {/snippet}
</TopBar>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <article
    class="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5 md:p-6"
  >
    <header>
      <p class="text-xs font-medium uppercase tracking-wide text-muted">{t.current.plus.compareFree}</p>
      <p class="mt-1 text-2xl font-semibold text-text">{t.language === 'en' ? '0 BGN' : '0 лв.'}</p>
    </header>
    <ul class="flex flex-col gap-2 text-sm text-text">
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featurePeople(FREE_PLAN.people)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featureCars(FREE_PLAN.cars)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featureDocs(FREE_PLAN.documentSets)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featureCustom(FREE_PLAN.customDeadlines)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{t.current.plus.featureICS}</span>
      </li>
    </ul>
  </article>

  <article
    class="flex flex-col gap-4 rounded-[var(--radius-card)] border-2 border-accent bg-accent-light/30 p-5 md:p-6"
  >
    <header class="flex items-center justify-between">
      <p class="text-xs font-medium uppercase tracking-wide text-accent">{t.current.plus.comparePlus}</p>
      <span
        class="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white"
      >{t.current.plus.comingSoonBadge}</span>
    </header>
    <ul class="flex flex-col gap-2 text-sm text-text">
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featurePeople(PLUS_PLAN.people)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featureCars(PLUS_PLAN.cars)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featureDocs(PLUS_PLAN.documentSets)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{featureCustom(PLUS_PLAN.customDeadlines)}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{t.current.plus.featureICS}</span>
      </li>
      <li class="flex items-start gap-2">
        <Check size={16} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{t.current.plus.featureNotifications}</span>
      </li>
    </ul>
  </article>
</div>

<p class="mt-6 text-xs text-muted">{t.current.plus.noPaymentNote}</p>
