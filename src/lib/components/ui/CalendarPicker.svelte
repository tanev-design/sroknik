<script lang="ts">
  // Custom calendar date picker for Срокник.
  //
  // - ISO 8601 week (Monday first), Bulgarian locale for month/weekday labels.
  // - Popover on desktop, full-width below the trigger on mobile.
  // - Past dates disabled (except today).
  // - Emits selection as YYYY-MM-DD ISO date string via the `value` bindable
  //   prop and the optional `onChange` callback.
  //
  // The component keeps the native <input type="date"> accessibility story by
  // leaving the trigger as a real <button> and letting the popover act as a
  // dialog. On mobile the popover flows inline beneath the trigger for a
  // thumb-friendly reach.

  import { Popover } from 'bits-ui';
  import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-svelte';
  import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    addMonths,
    subMonths,
    isToday,
    isBefore,
    parseISO,
    isSameDay,
    startOfDay
  } from 'date-fns';
  import { bg } from 'date-fns/locale/bg';
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    /** Selected date as YYYY-MM-DD (or empty string when unset). */
    value?: string;
    placeholder?: string;
    /** Visible label for screen readers and the `<span>` above the trigger. */
    label?: string;
    /** Disallow days before today. Defaults to true. */
    disablePast?: boolean;
    /** Required state, forwarded to the trigger button. */
    required?: boolean;
    /** Optional validation error message to render below the trigger. */
    error?: string;
    onChange?: (v: string) => void;
  }

  let {
    value = $bindable(''),
    placeholder,
    label,
    disablePast = true,
    required,
    error,
    onChange
  }: Props = $props();

  let open = $state(false);
  let viewDate = $state<Date>(value ? parseISO(value) : new Date());

  // Keep the displayed month in sync if `value` is set externally.
  $effect(() => {
    if (value) {
      try {
        viewDate = parseISO(value);
      } catch {
        // ignore malformed values; keep current viewDate
      }
    }
  });

  const weekdays = $derived(t.current.settingsV2.weekdaysShort);

  const days = $derived.by(() => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);
    const allDays = eachDayOfInterval({ start, end });
    // getDay: 0=Sun, 1=Mon, … — convert to Mon=0, Sun=6 padding.
    const firstDow = (getDay(start) + 6) % 7;
    const padding: (Date | null)[] = Array(firstDow).fill(null);
    return [...padding, ...allDays] as (Date | null)[];
  });

  const today = $derived(startOfDay(new Date()));

  function isPastDay(d: Date): boolean {
    return disablePast && isBefore(d, today) && !isToday(d);
  }

  function select(day: Date): void {
    if (isPastDay(day)) return;
    const iso = format(day, 'yyyy-MM-dd');
    value = iso;
    onChange?.(iso);
    open = false;
  }

  function prev(): void {
    viewDate = subMonths(viewDate, 1);
  }
  function next(): void {
    viewDate = addMonths(viewDate, 1);
  }

  const locale = $derived(t.language === 'bg' ? bg : undefined);

  const triggerLabel = $derived.by(() => {
    if (!value) return placeholder ?? t.current.settingsV2.calendarPickerPlaceholder;
    try {
      return format(parseISO(value), 'd MMMM yyyy', locale ? { locale } : undefined);
    } catch {
      return value;
    }
  });
</script>

<div class="flex flex-col">
  {#if label}
    <span class="mb-1.5 block text-sm font-medium text-text">{label}</span>
  {/if}

  <Popover.Root bind:open>
    <Popover.Trigger
      class="flex min-h-[44px] w-full items-center gap-2 rounded-[var(--radius-control)] border border-border bg-surface px-3 py-2.5 text-left text-sm text-text transition-colors hover:border-[var(--color-border-strong)] focus-visible:outline-accent"
      aria-required={required ? true : undefined}
      aria-invalid={error ? true : undefined}
    >
      <CalendarIcon size={16} class="shrink-0 text-muted" aria-hidden="true" />
      <span class:text-muted={!value}>{triggerLabel}</span>
    </Popover.Trigger>

    <Popover.Portal>
      <Popover.Content
        sideOffset={6}
        class="z-50 w-[min(calc(100vw-2rem),320px)] rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]"
      >
        <div class="mb-3 flex items-center justify-between">
          <button
            type="button"
            onclick={prev}
            aria-label="\u2190"
            class="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:bg-accent-light hover:text-accent"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <span class="text-sm font-medium capitalize text-text">
            {format(viewDate, 'LLLL yyyy', locale ? { locale } : undefined)}
          </span>
          <button
            type="button"
            onclick={next}
            aria-label="\u2192"
            class="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:bg-accent-light hover:text-accent"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div class="mb-1 grid grid-cols-7">
          {#each weekdays as wd}
            <div
              class="py-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted"
            >
              {wd}
            </div>
          {/each}
        </div>

        <div class="grid grid-cols-7 gap-0.5">
          {#each days as day}
            {#if day === null}
              <div></div>
            {:else}
              {@const selected = value ? isSameDay(day, parseISO(value)) : false}
              {@const past = isPastDay(day)}
              {@const isNow = isToday(day)}
              <button
                type="button"
                onclick={() => select(day)}
                disabled={past}
                aria-current={isNow ? 'date' : undefined}
                aria-pressed={selected}
                class={`h-8 w-full rounded-[var(--radius-control)] text-sm transition-colors ${
                  selected
                    ? 'bg-accent font-medium text-white'
                    : isNow
                      ? 'bg-accent-light font-medium text-accent'
                      : past
                        ? 'cursor-not-allowed text-muted opacity-40'
                        : 'text-text hover:bg-accent-light hover:text-accent'
                }`}
              >
                {format(day, 'd')}
              </button>
            {/if}
          {/each}
        </div>

        <p class="mt-3 border-t border-border pt-3 text-center text-[11px] text-muted">
          {t.current.deadline.stayLocalHint}
        </p>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>

  {#if error}
    <span class="mt-1 text-xs text-[var(--color-danger)]">{error}</span>
  {/if}
</div>
