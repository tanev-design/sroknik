<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import DeadlineCard from '$lib/components/deadline/DeadlineCard.svelte';
  import EmptyState from '$lib/components/shared/EmptyState.svelte';
  import FAB from '$lib/components/shared/FAB.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import AddDeadlineSheet from '$lib/components/deadline/AddDeadlineSheet.svelte';
  import DeadlineDetailSheet from '$lib/components/deadline/DeadlineDetailSheet.svelte';
  import { deadlinesStore } from '$lib/stores/deadlines.svelte';
  import { sortDeadlinesByUrgency } from '$lib/logic/urgency';
  import { t } from '$lib/copy/i18n.svelte';
  import { Archive, CheckCircle2, TimerReset } from 'lucide-svelte';
  import type { Deadline, DeadlineStatus } from '$lib/types';

  type Filter = 'all' | DeadlineStatus;
  let filter = $state<Filter>('active');
  let addOpen = $state(false);
  let detailOpen = $state(false);
  let detail = $state<Deadline | null>(null);

  const filters: { id: Filter; label: string }[] = $derived([
    { id: 'all', label: t.current.deadline.filterAll },
    { id: 'active', label: t.current.deadline.filterActive },
    { id: 'done', label: t.current.deadline.filterDone },
    { id: 'archived', label: t.current.deadline.filterArchived }
  ]);

  const list = $derived.by(() => {
    const base =
      filter === 'all'
        ? deadlinesStore.all
        : deadlinesStore.all.filter((d) => d.status === filter);
    return sortDeadlinesByUrgency(base);
  });

  function select(d: Deadline) {
    detail = d;
    detailOpen = true;
  }
</script>

<TopBar title={t.current.nav.deadlines} />

<section class="accent-panel mb-6 rounded-[22px] p-5 md:p-6">
  <div class="panel-content grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
    <div class="flex flex-wrap gap-1.5">
      {#each filters as f (f.id)}
        {@const active = filter === f.id}
        <button
          type="button"
          onclick={() => (filter = f.id)}
          aria-pressed={active}
          class="inline-flex min-h-[38px] items-center rounded-full border px-3.5 py-1 text-sm transition-colors
          {active
            ? 'border-accent bg-accent text-white'
            : 'border-border bg-surface/80 text-text hover:bg-accent-light/50'}"
        >
          {f.label}
        </button>
      {/each}
    </div>

    <div class="grid grid-cols-3 gap-2">
      <div class="metric-card rounded-[var(--radius-control)] px-3 py-2">
        <TimerReset size={16} class="text-accent" aria-hidden="true" />
        <p class="mt-1 text-lg font-semibold tabular-nums text-text">{deadlinesStore.active.length}</p>
        <p class="truncate text-[11px] text-muted">{t.current.deadline.filterActive}</p>
      </div>
      <div class="metric-card rounded-[var(--radius-control)] px-3 py-2">
        <CheckCircle2 size={16} class="text-accent" aria-hidden="true" />
        <p class="mt-1 text-lg font-semibold tabular-nums text-text">
          {deadlinesStore.all.filter((d) => d.status === 'done').length}
        </p>
        <p class="truncate text-[11px] text-muted">{t.current.deadline.filterDone}</p>
      </div>
      <div class="metric-card rounded-[var(--radius-control)] px-3 py-2">
        <Archive size={16} class="text-accent" aria-hidden="true" />
        <p class="mt-1 text-lg font-semibold tabular-nums text-text">
          {deadlinesStore.all.filter((d) => d.status === 'archived').length}
        </p>
        <p class="truncate text-[11px] text-muted">{t.current.deadline.filterArchived}</p>
      </div>
    </div>
  </div>
</section>

{#if !list.length}
  <EmptyState title={t.current.deadline.empty} illustration="deadline">
    {#snippet action()}
      <Button onclick={() => (addOpen = true)}>{t.current.deadline.addFirst}</Button>
    {/snippet}
  </EmptyState>
{:else}
  <ul class="grid gap-3 xl:grid-cols-2">
    {#each list as d (d.id)}
      <li><DeadlineCard deadline={d} onSelect={select} /></li>
    {/each}
  </ul>

  <FAB label={t.current.actions.add} onClick={() => (addOpen = true)} />
{/if}

<AddDeadlineSheet bind:open={addOpen} onOpenChange={(v) => (addOpen = v)} />
<DeadlineDetailSheet
  bind:open={detailOpen}
  deadline={detail}
  onOpenChange={(v) => (detailOpen = v)}
/>
