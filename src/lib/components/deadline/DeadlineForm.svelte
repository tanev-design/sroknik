<script lang="ts">
  import type { Deadline, DeadlineCategory } from '$lib/types';
  import { getCategory, resolveOfficialUrl } from '$lib/constants/categories';
  import { t } from '$lib/copy/i18n.svelte';
  import { deadlinesRepo } from '$lib/db/repositories/deadlines';
  import CategoryPicker from './CategoryPicker.svelte';
  import DatePicker from './DatePicker.svelte';
  import ReminderOffsets from './ReminderOffsets.svelte';
  import ProviderPicker from './ProviderPicker.svelte';
  import PersonPicker from '$lib/components/shared/PersonPicker.svelte';
  import CarPicker from '$lib/components/shared/CarPicker.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import PrivacyLine from '$lib/components/ui/PrivacyLine.svelte';
  import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

  interface Props {
    existing?: Deadline;
    initialCategory?: DeadlineCategory;
    onDone?: () => void;
  }
  let { existing, initialCategory, onDone }: Props = $props();

  const today = new Date().toISOString().slice(0, 10);

  // Form state
  let formKey = $state('');
  let category = $state<DeadlineCategory>('custom');
  let title = $state('');
  let dueDate = $state('');
  let reminderOffsets = $state<number[]>([]);
  let providerId = $state<string | undefined>(undefined);
  let notes = $state('');
  let linkedPersonId = $state<string | undefined>(undefined);
  let linkedCarId = $state<string | undefined>(undefined);
  let officialUrl = $state('');

  let titleError = $state('');
  let dateError = $state('');
  let submitError = $state('');
  let submitting = $state(false);
  let titleInput = $state<HTMLInputElement>();
  let dateInput = $state<HTMLInputElement>();

  $effect(() => {
    const nextKey = existing?.id ?? `new:${initialCategory ?? 'custom'}`;
    if (nextKey === formKey) return;

    const nextCategory = existing?.category ?? initialCategory ?? 'custom';
    const nextProvider = existing?.providerId;
    formKey = nextKey;
    category = nextCategory;
    title = existing?.title ?? '';
    dueDate = existing?.dueDate ?? '';
    reminderOffsets = existing?.reminderOffsets ?? [
      ...getCategory(nextCategory).defaultReminderOffsets
    ];
    providerId = nextProvider;
    notes = existing?.notes ?? '';
    linkedPersonId = existing?.linkedPersonId;
    linkedCarId = existing?.linkedCarId;
    officialUrl = existing?.officialUrl ?? resolveOfficialUrl(nextCategory, nextProvider)?.url ?? '';
    titleError = '';
    dateError = '';
    submitError = '';
  });

  function syncFromCategory(nextId: DeadlineCategory) {
    const cat = getCategory(nextId);
    const language = t.language;
    const prevLabel =
      language === 'en' ? getCategory(category).labelEn : getCategory(category).labelBg;
    const nextLabel = language === 'en' ? cat.labelEn : cat.labelBg;
    // Prefill title if empty or if it matched the previous category default.
    if (!title || title === prevLabel) {
      title = nextLabel === (language === 'en' ? 'Other deadline' : 'Друг срок') ? '' : nextLabel;
    }
    reminderOffsets = [...cat.defaultReminderOffsets];
    providerId = undefined;
    const resolved = resolveOfficialUrl(nextId, undefined);
    officialUrl = resolved?.url ?? '';
    category = nextId;
  }

  function syncFromProvider(nextProviderId: string | undefined) {
    providerId = nextProviderId;
    const resolved = resolveOfficialUrl(category, nextProviderId);
    if (resolved) officialUrl = resolved.url;
    submitError = '';
  }

  async function submit(e: Event) {
    e.preventDefault();
    titleError = '';
    dateError = '';
    submitError = '';

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nextTitle = String(formData.get('title') ?? title).trim();
    const nextDueDate = String(formData.get('dueDate') ?? dueDate);
    const nextNotes = String(formData.get('notes') ?? notes).trim();
    const nextOfficialUrl = String(formData.get('officialUrl') ?? officialUrl).trim();

    title = nextTitle;
    dueDate = nextDueDate;
    notes = nextNotes;
    officialUrl = nextOfficialUrl;

    if (!nextTitle) {
      titleError = t.current.errors.invalidTitle;
      submitError = t.current.errors.invalidTitle;
      titleInput?.focus();
      titleInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!nextDueDate || Number.isNaN(Date.parse(nextDueDate))) {
      dateError = t.current.errors.invalidDate;
      submitError = t.current.errors.invalidDate;
      dateInput?.focus();
      dateInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    submitting = true;
    try {
      const payload = {
        title: nextTitle,
        category,
        dueDate: nextDueDate,
        reminderOffsets: [...reminderOffsets],
        linkedPersonId,
        linkedCarId,
        providerId,
        notes: nextNotes || undefined,
        officialUrl: nextOfficialUrl || undefined
      };

      if (existing) {
        await deadlinesRepo.update(existing.id, payload);
      } else {
        await deadlinesRepo.create(payload);
      }
      onDone?.();
    } catch {
      submitError = t.current.errors.generic;
    } finally {
      submitting = false;
    }
  }
</script>

<form onsubmit={submit} class="flex flex-col gap-7">
  <!-- Section 1: What? -->
  <section class="flex flex-col gap-4">
    <SectionHeader label={t.current.add.what} />

    <CategoryPicker bind:value={category} onChange={syncFromCategory} />

    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-text">
        {t.current.deadline.titleField}
      </span>
      <input
        name="title"
        type="text"
        bind:value={title}
        bind:this={titleInput}
        placeholder={t.current.deadline.titlePlaceholder}
        maxlength="80"
        class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-text placeholder:text-muted/70 focus:border-accent"
        aria-invalid={titleError ? true : undefined}
      />
      {#if titleError}
        <span class="mt-1 block text-xs text-[var(--color-danger)]">{titleError}</span>
      {/if}
    </label>

    <ProviderPicker
      {category}
      bind:value={providerId}
      onChange={syncFromProvider}
    />
  </section>

  <!-- Section 2: When? -->
  <section class="flex flex-col gap-4">
    <SectionHeader label={t.current.add.when} />

    <DatePicker
      name="dueDate"
      bind:value={dueDate}
      onChange={(v) => (dueDate = v)}
      min={today}
      error={dateError}
      bind:inputEl={dateInput}
    />

    <ReminderOffsets bind:value={reminderOffsets} onChange={(v) => (reminderOffsets = v)} />

    <p class="text-xs text-muted">{t.current.deadline.calendarHint}</p>
  </section>

  <!-- Section 3: For whom? -->
  <section class="flex flex-col gap-4">
    <SectionHeader label={t.current.add.forWhom} />

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <PersonPicker bind:value={linkedPersonId} onChange={(v) => (linkedPersonId = v)} />
      <CarPicker bind:value={linkedCarId} onChange={(v) => (linkedCarId = v)} />
    </div>

    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-text">
        {t.current.deadline.notesField}
        <span class="ml-1 text-xs font-normal text-muted">({t.current.add.optional})</span>
      </span>
      <textarea
        name="notes"
        bind:value={notes}
        rows="2"
        maxlength="300"
        placeholder={t.current.deadline.notesPlaceholder}
        class="w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted/70 focus:border-accent"
      ></textarea>
    </label>

    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-text">
        {t.current.deadline.officialUrlField}
        <span class="ml-1 text-xs font-normal text-muted">({t.current.add.optional})</span>
      </span>
      <input
        name="officialUrl"
        type="url"
        bind:value={officialUrl}
        placeholder="https://"
        class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-text placeholder:text-muted/70 focus:border-accent"
      />
    </label>
  </section>

  <div class="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
    <PrivacyLine text={t.current.deadline.stayLocalHint} />
    <div class="flex flex-col gap-2 sm:items-end">
      {#if submitError}
        <p class="text-sm font-medium text-[var(--color-danger)]">{submitError}</p>
      {/if}
      <div class="flex gap-2 sm:justify-end">
        {#if onDone}
          <Button variant="secondary" onclick={onDone} type="button">
            {t.current.actions.cancel}
          </Button>
        {/if}
        <Button type="submit" disabled={submitting}>
          {submitting ? t.current.actions.saving : t.current.actions.save}
        </Button>
      </div>
    </div>
  </div>
</form>
