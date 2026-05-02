<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import EmptyState from '$lib/components/shared/EmptyState.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import PlanLimitNotice from '$lib/components/shared/PlanLimitNotice.svelte';
  import DocumentSetCard from '$lib/components/documents/DocumentSetCard.svelte';
  import PersonPicker from '$lib/components/shared/PersonPicker.svelte';
  import { documentsStore } from '$lib/stores/documents.svelte';
  import { peopleStore } from '$lib/stores/people.svelte';
  import { deadlinesStore } from '$lib/stores/deadlines.svelte';
  import { documentsRepo } from '$lib/db/repositories/documents';
  import { peopleRepo } from '$lib/db/repositories/people';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { canAdd } from '$lib/logic/plan-limits';
  import { t } from '$lib/copy/i18n.svelte';

  let formOpen = $state(false);
  let title = $state('');
  let personId = $state<string | undefined>(undefined);

  const canAddSet = $derived(
    canAdd(settingsStore.current.plan, 'documentSets', documentsStore.count)
  );

  function linkedFor(setId: string) {
    return deadlinesStore.active.filter((d) => d.linkedDocumentSetId === setId);
  }

  function ownerFor(id: string) {
    return peopleStore.all.find((p) => p.id === id);
  }

  async function ensurePerson(): Promise<string> {
    if (personId) return personId;
    const existing = peopleStore.all[0];
    if (existing) return existing.id;
    return peopleRepo.create({ name: t.current.person.relation.me, relation: 'me' });
  }

  async function createSet(e: Event) {
    e.preventDefault();
    if (!title.trim()) return;
    const ownerPersonId = await ensurePerson();
    await documentsRepo.create({ title: title.trim(), personId: ownerPersonId });
    title = '';
    personId = undefined;
    formOpen = false;
  }
</script>

<TopBar title={t.current.nav.documents}>
  {#snippet actions()}
    {#if canAddSet && !formOpen}
      <Button size="sm" onclick={() => (formOpen = true)}>{t.current.documents.addSet}</Button>
    {/if}
  {/snippet}
</TopBar>

{#if !canAddSet && !formOpen}
  <div class="mb-4">
    <PlanLimitNotice message={t.current.planLimit.documentReached} />
  </div>
{/if}

{#if formOpen}
  <form
    onsubmit={createSet}
    class="mb-6 flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-4 md:p-5"
  >
    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-text">{t.current.documents.setTitleField}</span>
      <input
        type="text"
        bind:value={title}
        required
        maxlength="60"
        placeholder={t.current.documents.setTitlePlaceholder}
        class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm"
      />
    </label>
    {#if peopleStore.count > 1}
      <PersonPicker bind:value={personId} onChange={(v) => (personId = v)} />
    {/if}
    <div class="flex justify-end gap-2">
      <Button variant="secondary" type="button" onclick={() => (formOpen = false)}>
        {t.current.actions.cancel}
      </Button>
      <Button type="submit">{t.current.actions.save}</Button>
    </div>
  </form>
{/if}

{#if documentsStore.count === 0 && !formOpen}
  <EmptyState title={t.current.documents.empty} illustration="document">
    {#snippet action()}
      {#if canAddSet}
        <Button onclick={() => (formOpen = true)}>{t.current.documents.addSet}</Button>
      {/if}
    {/snippet}
  </EmptyState>
{:else}
  <ul class="flex flex-col gap-2.5">
    {#each documentsStore.all as set (set.id)}
      <li>
        <DocumentSetCard {set} owner={ownerFor(set.personId)} linkedDeadlines={linkedFor(set.id)} />
      </li>
    {/each}
  </ul>
{/if}
