<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import DeadlineCard from '$lib/components/deadline/DeadlineCard.svelte';
  import FAB from '$lib/components/shared/FAB.svelte';
  import Button from '$lib/components/shared/Button.svelte';
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

<div class="flex flex-col gap-6">
  <section
    class="relative overflow-hidden rounded-[20px] border border-[var(--color-accent-border)] bg-[linear-gradient(135deg,var(--color-surface)_0%,var(--color-accent-light)_58%,var(--color-warning-light)_100%)] p-5 shadow-[0_18px_60px_rgba(26,25,23,0.08)] md:p-7"
  >
    <div
      class="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[var(--color-accent-border)] opacity-50"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute bottom-5 right-6 hidden grid-cols-4 gap-2 opacity-35 md:grid"
      aria-hidden="true"
    >
      {#each Array(16) as _, i (i)}
        <span class="h-2 w-2 rounded-full bg-accent"></span>
      {/each}
    </div>
    <div class="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div>
        <p class="eyebrow mb-3">{t.current.dashboard.overview}</p>
        <h2 class="max-w-xl text-[28px] font-semibold leading-tight tracking-tight text-text md:text-[34px]">
          {hasAny ? t.current.today.next : t.current.today.empty}
        </h2>
        <p class="mt-3 max-w-xl text-sm leading-6 text-text-soft">
          {hasAny ? t.current.dashboard.quickStartBody : t.current.today.emptySub}
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <Button onclick={() => (addOpen = true)}>
            <CalendarPlus size={16} aria-hidden="true" />
            {t.current.actions.add}
          </Button>
          <a
            href="/how-it-works"
            class="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface px-4 text-sm font-medium text-text transition-colors hover:border-[var(--color-border-strong)]"
          >
            {t.current.dashboard.openTrust}
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <article class="rounded-[var(--radius-card)] border border-border bg-surface/80 p-4 backdrop-blur">
          <TimerReset size={18} class="text-accent" aria-hidden="true" />
          <p class="mt-3 text-2xl font-semibold tabular-nums text-text">{deadlinesStore.active.length}</p>
          <p class="text-xs text-muted">{t.current.dashboard.activeDeadlines}</p>
        </article>
        <article class="rounded-[var(--radius-card)] border border-border bg-surface/80 p-4 backdrop-blur">
          <ShieldCheck size={18} class="text-accent" aria-hidden="true" />
          <p class="mt-3 text-2xl font-semibold tabular-nums text-text">{attentionCount}</p>
          <p class="text-xs text-muted">{t.current.dashboard.urgentNow}</p>
        </article>
        <article class="rounded-[var(--radius-card)] border border-border bg-surface/80 p-4 backdrop-blur">
          <Car size={18} class="text-accent" aria-hidden="true" />
          <p class="mt-3 text-2xl font-semibold tabular-nums text-text">{carsStore.count}</p>
          <p class="text-xs text-muted">{t.current.nav.cars}</p>
        </article>
        <article class="rounded-[var(--radius-card)] border border-border bg-surface/80 p-4 backdrop-blur">
          <FileText size={18} class="text-accent" aria-hidden="true" />
          <p class="mt-3 text-2xl font-semibold tabular-nums text-text">{documentsStore.count}</p>
          <p class="text-xs text-muted">{t.current.nav.documents}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="grid grid-cols-1 gap-3 md:grid-cols-3">
    <article class="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <p class="eyebrow mb-2">{t.current.dashboard.quickStart}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.dashboard.quickStartBody}</p>
    </article>
    <article class="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <p class="eyebrow mb-2">{t.current.dashboard.trustTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.dashboard.trustBody}</p>
    </article>
    <article class="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <p class="eyebrow mb-2">{t.current.dashboard.legalTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.dashboard.legalBody}</p>
      <a href="/legal" class="mt-3 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline">
        {t.current.dashboard.openLegal}
      </a>
    </article>
  </section>

  {#if hasAny}
    <div class="flex flex-col gap-7">
    {#if next}
      <section>
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
