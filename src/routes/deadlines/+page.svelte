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

<div class="mb-4 flex flex-wrap gap-1.5">
  {#each filters as f (f.id)}
    {@const active = filter === f.id}
    <button
      type="button"
      onclick={() => (filter = f.id)}
      aria-pressed={active}
      class="inline-flex min-h-[36px] items-center rounded-full border px-3.5 py-1 text-sm transition-colors
      {active
        ? 'border-accent bg-accent text-white'
        : 'border-border bg-surface text-text hover:bg-accent-light/40'}"
    >
      {f.label}
    </button>
  {/each}
</div>

{#if !list.length}
  <EmptyState title={t.current.deadline.empty}>
    {#snippet action()}
      <Button onclick={() => (addOpen = true)}>{t.current.deadline.addFirst}</Button>
    {/snippet}
  </EmptyState>
{:else}
  <ul class="flex flex-col gap-2.5">
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
