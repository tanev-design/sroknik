<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import DeadlineCard from '$lib/components/deadline/DeadlineCard.svelte';
  import FAB from '$lib/components/shared/FAB.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { carsStore } from '$lib/stores/cars.svelte';
  import { deadlinesStore } from '$lib/stores/deadlines.svelte';
  import { documentsStore } from '$lib/stores/documents.svelte';
  import { formatTodayHeader, groupForToday, nextDeadline } from '$lib/logic/urgency';
  import { markDeadlineComplete, archiveDeadline } from '$lib/logic/deadline-actions';
  import { t } from '$lib/copy/i18n.svelte';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import {
    CalendarClock,
    CalendarPlus,
    Car,
    FileText,
    IdCard,
    Receipt,
    ShieldCheck,
    TimerReset,
    Wrench,
    Zap
  } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';
  import type { Deadline, DeadlineCategory } from '$lib/types';

  let addOpen = $state(false);
  let addCategory = $state<Deadline['category'] | undefined>(undefined);
  let detailOpen = $state(false);
  let detail = $state<Deadline | null>(null);
  let AddDeadlineSheetComponent = $state<ComponentType | null>(null);
  let DeadlineDetailSheetComponent = $state<ComponentType | null>(null);
  let addSheetPromise: Promise<void> | null = null;
  let detailSheetPromise: Promise<void> | null = null;

  function ensureAddSheet() {
    if (AddDeadlineSheetComponent) return Promise.resolve();
    addSheetPromise ??= import('$lib/components/deadline/AddDeadlineSheet.svelte').then((module) => {
      AddDeadlineSheetComponent = module.default as unknown as ComponentType;
    });
    return addSheetPromise;
  }

  function ensureDetailSheet() {
    if (DeadlineDetailSheetComponent) return Promise.resolve();
    detailSheetPromise ??= import('$lib/components/deadline/DeadlineDetailSheet.svelte').then((module) => {
      DeadlineDetailSheetComponent = module.default as unknown as ComponentType;
    });
    return detailSheetPromise;
  }

  async function openQuickAdd(id: Deadline['category']) {
    addCategory = id;
    await ensureAddSheet();
    addOpen = true;
  }
  async function openAdd() {
    addCategory = undefined;
    await ensureAddSheet();
    addOpen = true;
  }

  // Onboarding handshake: if the welcome screen requested a specific category
  // to be pre-filled in the add sheet, honour it on first load.
  onMount(() => {
    if (!browser) return;
    try {
      const pending = sessionStorage.getItem('sroknik:addCategory');
      if (pending) {
        sessionStorage.removeItem('sroknik:addCategory');
        void openQuickAdd(pending as Deadline['category']);
      }
    } catch {
      // sessionStorage unavailable; no-op.
    }
  });

  const grouped = $derived(groupForToday(deadlinesStore.active));
  const next = $derived(nextDeadline(deadlinesStore.active));
  const hasAny = $derived(deadlinesStore.active.length > 0);
  const attentionCount = $derived(
    grouped.overdue.length + grouped.today.length + grouped.soon.length
  );

  async function select(d: Deadline) {
    detail = d;
    await ensureDetailSheet();
    detailOpen = true;
  }

  const quickCategories: {
    id: DeadlineCategory;
    icon: ComponentType;
    label: () => string;
  }[] = [
    {
      id: 'vignette',
      icon: Receipt,
      label: () => t.current.todayQuickCategories.items.vignette
    },
    {
      id: 'civil-liability',
      icon: ShieldCheck,
      label: () => t.current.todayQuickCategories.items.civilLiability
    },
    {
      id: 'technical-inspection',
      icon: Wrench,
      label: () => t.current.todayQuickCategories.items.technicalInspection
    },
    {
      id: 'id-card',
      icon: IdCard,
      label: () => t.current.todayQuickCategories.items.idCard
    },
    {
      id: 'electricity-bill',
      icon: Zap,
      label: () => t.current.todayQuickCategories.items.electricityBill
    },
    {
      id: 'custom',
      icon: CalendarClock,
      label: () => t.current.todayQuickCategories.items.custom
    }
  ];

  const webAppJson = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t.current.appName,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Any',
      url: 'https://sroknik.com',
      description: t.current.seo.appDescription,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BGN'
      }
    })
  );
</script>

<svelte:head>
  <title>{t.current.appName} — {t.current.welcome.heroTitle}</title>
  <meta name="description" content={t.current.seo.appDescription} />
  <meta property="og:title" content={t.current.appName} />
  <meta property="og:description" content={t.current.seo.appDescription} />
  <script type="application/ld+json">{webAppJson}</script>
</svelte:head>

<TopBar title={t.current.nav.today} subtitle={formatTodayHeader()}>
  {#snippet actions()}
    {#if hasAny}
      <Button size="sm" onclick={() => (addOpen = true)}>
        {t.current.actions.add}
      </Button>
    {/if}
  {/snippet}
</TopBar>

<div class="flex flex-col gap-6 xl:gap-7">
  <section class="glass-card rounded-[var(--radius-card)] p-4 md:p-5">
    <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="eyebrow">{t.current.todayQuickCategories.title}</p>
        <p class="mt-1 text-sm leading-6 text-muted">{t.current.todayQuickCategories.subtitle}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
      {#each quickCategories as item (item.id)}
        {@const Icon = item.icon}
        <button
          type="button"
          onclick={() => openQuickAdd(item.id)}
          class="group flex min-h-[74px] flex-col justify-between rounded-[var(--radius-control)] border border-border bg-surface p-3 text-left transition-[border-color,background-color,transform,opacity] duration-100 hover:border-[var(--color-accent-border)] hover:bg-accent-light/40 active:scale-[0.98] active:opacity-90"
        >
          <Icon size={18} class="text-accent" aria-hidden="true" strokeWidth={1.8} />
          <span class="mt-3 text-sm font-medium leading-5 text-text">{item.label()}</span>
        </button>
      {/each}
    </div>
  </section>

  <section
    class="accent-panel rounded-[22px] p-5 md:p-7 xl:p-9"
  >
    <div class="panel-content grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div>
        <p class="eyebrow mb-3">{t.current.dashboard.overview}</p>
        <h2 class="max-w-xl text-[30px] font-semibold leading-tight tracking-tight text-text md:text-[44px]">
          {hasAny ? t.current.today.next : t.current.today.empty}
        </h2>
        <p class="mt-4 max-w-xl text-sm leading-6 text-text-soft md:text-base md:leading-7">
          {hasAny ? t.current.dashboard.quickStartBody : t.current.today.emptySub}
        </p>
        <div class="mt-6 flex flex-wrap gap-2.5">
          <Button onclick={() => (addOpen = true)}>
            <CalendarPlus size={16} aria-hidden="true" />
            {t.current.actions.add}
          </Button>
          <a
            href="/how-it-works"
            class="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface/70 px-4 text-sm font-medium text-text transition-colors hover:border-[var(--color-border-strong)] hover:bg-elevated"
          >
            {t.current.dashboard.openTrust}
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 xl:gap-4">
        <article class="metric-card rounded-[var(--radius-card)] p-4 backdrop-blur md:p-5">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-accent-light text-accent">
            <TimerReset size={20} aria-hidden="true" />
          </span>
          <p class="mt-4 text-3xl font-semibold tabular-nums text-text">{deadlinesStore.active.length}</p>
          <p class="text-xs text-muted">{t.current.dashboard.activeDeadlines}</p>
        </article>
        <article class="metric-card rounded-[var(--radius-card)] p-4 backdrop-blur md:p-5">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-warning-light text-[var(--color-warning)]">
            <ShieldCheck size={20} aria-hidden="true" />
          </span>
          <p class="mt-4 text-3xl font-semibold tabular-nums text-text">{attentionCount}</p>
          <p class="text-xs text-muted">{t.current.dashboard.urgentNow}</p>
        </article>
        <article class="metric-card rounded-[var(--radius-card)] p-4 backdrop-blur md:p-5">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-accent-light text-accent">
            <Car size={20} aria-hidden="true" />
          </span>
          <p class="mt-4 text-3xl font-semibold tabular-nums text-text">{carsStore.count}</p>
          <p class="text-xs text-muted">{t.current.nav.cars}</p>
        </article>
        <article class="metric-card rounded-[var(--radius-card)] p-4 backdrop-blur md:p-5">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-accent-light text-accent">
            <FileText size={20} aria-hidden="true" />
          </span>
          <p class="mt-4 text-3xl font-semibold tabular-nums text-text">{documentsStore.count}</p>
          <p class="text-xs text-muted">{t.current.nav.documents}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <article class="glass-card rounded-[var(--radius-card)] p-5">
      <p class="eyebrow mb-2">{t.current.dashboard.quickStart}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.dashboard.quickStartBody}</p>
    </article>
    <article class="glass-card rounded-[var(--radius-card)] p-5">
      <p class="eyebrow mb-2">{t.current.dashboard.trustTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.dashboard.trustBody}</p>
    </article>
    <article class="glass-card rounded-[var(--radius-card)] p-5">
      <p class="eyebrow mb-2">{t.current.dashboard.legalTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.dashboard.legalBody}</p>
      <a href="/legal" class="mt-3 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline">
        {t.current.dashboard.openLegal}
      </a>
    </article>
  </section>

  {#if !deadlinesStore.loaded}
    <ul class="flex flex-col gap-2.5">
      {#each [0, 1, 2] as i (i)}
        <li><Skeleton shape="card" /></li>
      {/each}
    </ul>
  {:else if hasAny}
    <div class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
    {#if next}
      <section class="xl:col-span-2">
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.current.today.next}
        </h2>
        <DeadlineCard
          deadline={next}
          onSelect={select}
          variant="primary"
          onComplete={markDeadlineComplete}
          onArchive={archiveDeadline}
        />
      </section>
    {/if}

    {#if grouped.overdue.length}
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.current.today.overdue}
        </h2>
        <ul class="flex flex-col gap-2.5">
          {#each grouped.overdue as d (d.id)}
            <li>
              <DeadlineCard
                deadline={d}
                onSelect={select}
                onComplete={markDeadlineComplete}
                onArchive={archiveDeadline}
              />
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if grouped.today.length}
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.current.urgency.today}
        </h2>
        <ul class="flex flex-col gap-2.5">
          {#each grouped.today as d (d.id)}
            <li>
              <DeadlineCard
                deadline={d}
                onSelect={select}
                onComplete={markDeadlineComplete}
                onArchive={archiveDeadline}
              />
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if grouped.soon.length}
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.current.sections.soon}
        </h2>
        <ul class="flex flex-col gap-2.5">
          {#each grouped.soon as d (d.id)}
            <li>
              <DeadlineCard
                deadline={d}
                onSelect={select}
                onComplete={markDeadlineComplete}
                onArchive={archiveDeadline}
              />
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if grouped.later.length}
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.current.sections.later}
        </h2>
        <ul class="flex flex-col gap-2.5">
          {#each grouped.later as d (d.id)}
            <li>
              <DeadlineCard
                deadline={d}
                onSelect={select}
                onComplete={markDeadlineComplete}
                onArchive={archiveDeadline}
              />
            </li>
          {/each}
        </ul>
      </section>
    {/if}
  </div>
  {/if}
</div>

<FAB
  label={t.current.actions.add}
  onClick={openAdd}
  onQuickPick={openQuickAdd}
/>

{#if AddDeadlineSheetComponent}
  <AddDeadlineSheetComponent
    bind:open={addOpen}
    initialCategory={addCategory}
    onOpenChange={(v: boolean) => (addOpen = v)}
  />
{/if}
{#if DeadlineDetailSheetComponent}
  <DeadlineDetailSheetComponent
    bind:open={detailOpen}
    deadline={detail}
    onOpenChange={(v: boolean) => (detailOpen = v)}
  />
{/if}
