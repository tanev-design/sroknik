<script lang="ts">
  import type { Deadline } from '$lib/types';
  import { getCategory, getProvider } from '$lib/constants/categories';
  import {
    formatAbsoluteDate,
    formatRelativeDate,
    getDaysRemaining,
    getUrgency
  } from '$lib/logic/urgency';
  import { t } from '$lib/copy/i18n.svelte';
  import { carsStore } from '$lib/stores/cars.svelte';
  import { peopleStore } from '$lib/stores/people.svelte';
  import NumberTicker from '$lib/components/ui/NumberTicker.svelte';

  interface Props {
    deadline: Deadline;
    onSelect?: (d: Deadline) => void;
    /** "primary" makes the card larger and shows a one-line note preview. */
    variant?: 'default' | 'primary';
  }
  let { deadline, onSelect, variant = 'default' }: Props = $props();

  const days = $derived(getDaysRemaining(deadline.dueDate));
  const urgency = $derived(getUrgency(days));
  const cat = $derived(getCategory(deadline.category));
  const provider = $derived(getProvider(deadline.category, deadline.providerId));
  const relative = $derived(formatRelativeDate(days));
  const absolute = $derived(formatAbsoluteDate(deadline.dueDate));

  const car = $derived(
    deadline.linkedCarId ? carsStore.all.find((c) => c.id === deadline.linkedCarId) : undefined
  );
  const person = $derived(
    deadline.linkedPersonId
      ? peopleStore.all.find((p) => p.id === deadline.linkedPersonId)
      : undefined
  );

  // Build the meta line: category · linked-thing · provider
  const meta = $derived.by(() => {
    const parts: string[] = [];
    const language = t.language;
    parts.push(language === 'en' ? cat.labelEn : cat.labelBg);
    if (car) {
      parts.push(`${car.nickname}${car.plateNumber ? ` · ${car.plateNumber}` : ''}`);
    } else if (person) {
      parts.push(person.name);
    }
    if (provider) {
      parts.push(language === 'en' ? provider.labelEn : provider.labelBg);
    }
    return parts.join(' · ');
  });

  const stripColor: Record<string, string> = {
    overdue: 'bg-[var(--color-danger)]',
    today: 'bg-[var(--color-warning)]',
    soon: 'bg-accent',
    later: 'bg-[var(--color-border-strong)]'
  };

  const relColor: Record<string, string> = {
    overdue: 'text-[var(--color-danger)]',
    today: 'text-[var(--color-warning)]',
    soon: 'text-accent',
    later: 'text-muted'
  };

  const isPrimary = $derived(variant === 'primary');
</script>

<button
  type="button"
  disabled={!onSelect}
  onclick={() => onSelect?.(deadline)}
  class="pressable relative flex min-h-[44px] w-full items-start gap-4 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface text-left shadow-[var(--shadow-card)] hover:border-[var(--color-border-strong)] hover:shadow-[0_2px_4px_rgba(26,25,23,0.05),0_8px_20px_rgba(26,25,23,0.05)] disabled:cursor-default {onSelect
    ? 'cursor-pointer'
    : ''} {isPrimary ? 'p-5 md:p-6' : 'p-4 md:p-5'}"
>
  <span
    aria-hidden="true"
    class="urgency-strip absolute inset-y-0 left-0 w-1 {stripColor[urgency] ?? 'bg-border'}"
  ></span>

  <div class="ml-1 min-w-0 flex-1">
    <p
      class="truncate font-medium text-text {isPrimary
        ? 'text-[18px] leading-tight md:text-[20px]'
        : 'text-base'}"
    >
      {deadline.title}
    </p>
    {#if meta}
      <p class="mt-1 truncate text-[13px] text-muted">{meta}</p>
    {/if}
    {#if isPrimary && deadline.notes}
      <p class="mt-3 line-clamp-2 text-[13px] text-text-soft">{deadline.notes}</p>
    {/if}
  </div>

  <div class="flex shrink-0 flex-col items-end text-right">
    <p
      class="font-medium tabular-nums {relColor[urgency] ?? 'text-muted'} {isPrimary
        ? 'text-base md:text-[17px]'
        : 'text-sm'}"
    >
      <NumberTicker value={relative} />
    </p>
    <p class="mt-0.5 text-xs text-muted tabular-nums">{absolute}</p>
  </div>
</button>
