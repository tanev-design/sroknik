<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import DeadlineCard from '$lib/components/deadline/DeadlineCard.svelte';
  import FAB from '$lib/components/shared/FAB.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import AddDeadlineSheet from '$lib/components/deadline/AddDeadlineSheet.svelte';
  import DeadlineDetailSheet from '$lib/components/deadline/DeadlineDetailSheet.svelte';
  import { carsStore } from '$lib/stores/cars.svelte';
  import { deadlinesStore } from '$lib/stores/deadlines.svelte';
  import { documentsStore } from '$lib/stores/documents.svelte';
  import { formatTodayHeader, groupForToday, nextDeadline } from '$lib/logic/urgency';
  import { t } from '$lib/copy/i18n.svelte';
  import { CalendarPlus, Car, FileText, ShieldCheck, TimerReset } from 'lucide-svelte';
  import type { Deadline } from '$lib/types';

  let addOpen = $state(false);
  let detailOpen = $state(false);
  let detail = $state<Deadline | null>(null);

  const grouped = $derived(groupForToday(deadlinesStore.active));
  const next = $derived(nextDeadline(deadlinesStore.active));
  const hasAny = $derived(deadlinesStore.active.length > 0);
  const attentionCount = $derived(
    grouped.overdue.length + grouped.today.length + grouped.soon.length
  );

  function select(d: Deadline) {
    detail = d;
    detailOpen = true;
  }
</script>

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
        <DeadlineCard deadline={next} onSelect={select} variant="primary" />
      </section>
    {/if}

    {#if grouped.overdue.length}
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t.current.today.overdue}
        </h2>
        <ul class="flex flex-col gap-2.5">
          {#each grouped.overdue as d (d.id)}
            <li><DeadlineCard deadline={d} onSelect={select} /></li>
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
            <li><DeadlineCard deadline={d} onSelect={select} /></li>
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
            <li><DeadlineCard deadline={d} onSelect={select} /></li>
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
            <li><DeadlineCard deadline={d} onSelect={select} /></li>
          {/each}
        </ul>
      </section>
    {/if}
  </div>
  {/if}
</div>

<FAB label={t.current.actions.add} onClick={() => (addOpen = true)} />

<AddDeadlineSheet bind:open={addOpen} onOpenChange={(v) => (addOpen = v)} />
<DeadlineDetailSheet bind:open={detailOpen} deadline={detail} onOpenChange={(v) => (detailOpen = v)} />
