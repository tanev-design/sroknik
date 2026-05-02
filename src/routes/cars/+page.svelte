<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import EmptyState from '$lib/components/shared/EmptyState.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import PlanLimitNotice from '$lib/components/shared/PlanLimitNotice.svelte';
  import { carsStore } from '$lib/stores/cars.svelte';
  import { peopleStore } from '$lib/stores/people.svelte';
  import { deadlinesStore } from '$lib/stores/deadlines.svelte';
  import { carsRepo } from '$lib/db/repositories/cars';
  import { peopleRepo } from '$lib/db/repositories/people';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { canAdd } from '$lib/logic/plan-limits';

  let formOpen = $state(false);
  let nickname = $state('');
  let plateNumber = $state('');
  let ownerId = $state('');

  const canAddCar = $derived(canAdd(settingsStore.current.plan, 'cars', carsStore.count));

  function activeDeadlinesFor(carId: string): number {
    return deadlinesStore.active.filter((d) => d.linkedCarId === carId).length;
  }

  function ownerName(id: string): string {
    return peopleStore.all.find((p) => p.id === id)?.name ?? '—';
  }

  async function ensureDefaultOwner(): Promise<string> {
    if (ownerId) return ownerId;
    const existing = peopleStore.all[0];
    if (existing) return existing.id;
    // Create an implicit "me" person so cars always have an owner. User can rename later.
    return peopleRepo.create({ name: t.current.person.relation.me, relation: 'me' });
  }

  async function createCar(e: Event) {
    e.preventDefault();
    if (!nickname.trim()) return;
    const owner = await ensureDefaultOwner();
    await carsRepo.create({
      ownerPersonId: owner,
      nickname: nickname.trim(),
      plateNumber: plateNumber.trim() || undefined
    });
    nickname = '';
    plateNumber = '';
    formOpen = false;
  }

  function linkedLabel(n: number): string {
    return t.current.car.linkedDeadlines(n);
  }
</script>

<TopBar title={t.current.nav.cars}>
  {#snippet actions()}
    {#if canAddCar && !formOpen}
      <Button size="sm" onclick={() => (formOpen = true)}>{t.current.car.addCar}</Button>
    {/if}
  {/snippet}
</TopBar>

{#if !canAddCar && !formOpen}
  <div class="mb-4">
    <PlanLimitNotice message={t.current.planLimit.carReached} />
  </div>
{/if}

{#if formOpen}
  <form
    onsubmit={createCar}
    class="mb-6 flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-4 md:p-5"
  >
    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-text">{t.current.car.nicknameField}</span>
      <input
        type="text"
        bind:value={nickname}
        required
        maxlength="40"
        placeholder={t.current.car.nicknamePlaceholder}
        class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm"
      />
    </label>
    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-text">
        {t.current.car.plateField}
        <span class="ml-1 text-xs font-normal text-muted">({t.current.car.plateOptional})</span>
      </span>
      <input
        type="text"
        bind:value={plateNumber}
        maxlength="10"
        placeholder={t.current.car.platePlaceholder}
        class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm uppercase"
      />
    </label>
    <div class="flex justify-end gap-2">
      <Button variant="secondary" type="button" onclick={() => (formOpen = false)}>
        {t.current.actions.cancel}
      </Button>
      <Button type="submit">{t.current.actions.save}</Button>
    </div>
  </form>
{/if}

{#if carsStore.count === 0 && !formOpen}
  <EmptyState title={t.current.car.empty} illustration="car">
    {#snippet action()}
      {#if canAddCar}
        <Button onclick={() => (formOpen = true)}>{t.current.car.addCar}</Button>
      {/if}
    {/snippet}
  </EmptyState>
{:else}
  <ul class="flex flex-col gap-2.5">
    {#each carsStore.all as car (car.id)}
      {@const count = activeDeadlinesFor(car.id)}
      <li
        class="flex items-start justify-between gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)] md:p-5"
      >
        <div class="min-w-0">
          <p class="truncate text-base font-medium text-text">{car.nickname}</p>
          <p class="text-xs text-muted">
            {#if car.plateNumber}
              <span class="font-medium uppercase">{car.plateNumber}</span> ·
            {/if}
            {ownerName(car.ownerPersonId)}
          </p>
        </div>
        <span class="shrink-0 text-xs text-muted">{linkedLabel(count)}</span>
      </li>
    {/each}
  </ul>
{/if}
