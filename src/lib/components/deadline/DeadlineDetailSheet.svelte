<script lang="ts">
  import { Dialog } from 'bits-ui';
  import {
    X,
    CalendarPlus,
    CheckCircle2,
    Archive,
    Trash2,
    RotateCcw,
    Pencil
  } from 'lucide-svelte';
  import type { Deadline } from '$lib/types';
  import { t } from '$lib/copy/i18n.svelte';
  import { deadlinesRepo } from '$lib/db/repositories/deadlines';
  import { buildICS, icsFilename } from '$lib/logic/reminder';
  import { downloadBlob } from '$lib/utils/download';
  import { toast } from '$lib/stores/toast.svelte';
  import { getCategory, getProvider, resolveOfficialUrl } from '$lib/constants/categories';
  import { formatAbsoluteDate, formatRelativeDate, getDaysRemaining } from '$lib/logic/urgency';
  import { carsStore } from '$lib/stores/cars.svelte';
  import { peopleStore } from '$lib/stores/people.svelte';
  import DeadlineForm from './DeadlineForm.svelte';
  import CategoryInfoPanel from './CategoryInfoPanel.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import OfficialLinkButton from '$lib/components/shared/OfficialLinkButton.svelte';
  import PrivacyLine from '$lib/components/ui/PrivacyLine.svelte';

  interface Props {
    open: boolean;
    deadline: Deadline | null;
    onOpenChange: (v: boolean) => void;
  }
  let { open = $bindable(), deadline, onOpenChange }: Props = $props();

  let editing = $state(false);

  function close() {
    open = false;
    editing = false;
    onOpenChange(false);
  }

  async function markDone() {
    if (!deadline) return;
    await deadlinesRepo.setStatus(deadline.id, 'done');
    toast.success(t.current.toast.saved);
    close();
  }

  async function archive() {
    if (!deadline) return;
    await deadlinesRepo.setStatus(deadline.id, 'archived');
    toast.success(t.current.toast.archived);
    close();
  }

  async function restore() {
    if (!deadline) return;
    await deadlinesRepo.setStatus(deadline.id, 'active');
    toast.success(t.current.toast.restored);
    close();
  }

  async function remove() {
    if (!deadline) return;
    await deadlinesRepo.remove(deadline.id);
    toast.success(t.current.toast.deleted);
    close();
  }

  function exportICS() {
    if (!deadline) return;
    const ics = buildICS([deadline]);
    downloadBlob(icsFilename(deadline.title, deadline.dueDate), ics, 'text/calendar');
    toast.success(t.current.toast.exportedICS);
  }

  const days = $derived(deadline ? getDaysRemaining(deadline.dueDate) : 0);
  const relative = $derived(deadline ? formatRelativeDate(days) : '');
  const language = $derived(t.language);
  const cat = $derived(deadline ? getCategory(deadline.category) : undefined);
  const provider = $derived(
    deadline ? getProvider(deadline.category, deadline.providerId) : undefined
  );
  const car = $derived(
    deadline?.linkedCarId ? carsStore.all.find((c) => c.id === deadline.linkedCarId) : undefined
  );
  const person = $derived(
    deadline?.linkedPersonId
      ? peopleStore.all.find((p) => p.id === deadline.linkedPersonId)
      : undefined
  );
  const fallbackLink = $derived(
    deadline ? resolveOfficialUrl(deadline.category, deadline.providerId) : undefined
  );
</script>

<Dialog.Root bind:open onOpenChange={(v: boolean) => onOpenChange(v)}>
  <Dialog.Portal>
    <Dialog.Overlay class="sheet-overlay fixed inset-0 z-40 bg-[rgba(26,25,23,0.45)] backdrop-blur-[2px]" />
    <Dialog.Content
      class="sheet-content fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92svh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-[20px] border border-border bg-bg shadow-[var(--shadow-sheet)] md:bottom-auto md:top-12 md:max-h-[85svh] md:rounded-[var(--radius-card)]"
    >
      <div
        class="flex items-center justify-between border-b border-border bg-surface px-4 py-3.5 md:px-6"
      >
        <Dialog.Title class="truncate text-[15px] font-medium text-text">
          {editing ? t.current.add.titleEdit : (deadline?.title ?? '')}
        </Dialog.Title>
        <Dialog.Close
          class="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:bg-bg"
          aria-label={t.current.actions.close}
        >
          <X size={18} aria-hidden="true" />
        </Dialog.Close>
      </div>

      <div class="overflow-y-auto px-4 py-6 md:px-6 md:py-8">
        {#if deadline}
          {#if editing}
            <DeadlineForm existing={deadline} onDone={close} />
          {:else}
            <div class="flex flex-col gap-6">
              <!-- Hero meta -->
              <div class="flex flex-col gap-1">
                <p class="eyebrow">{language === 'en' ? cat?.labelEn : cat?.labelBg}</p>
                <p class="text-2xl font-medium text-text">{deadline.title}</p>
                <p class="mt-1 text-sm text-muted tabular-nums">
                  {relative} · {formatAbsoluteDate(deadline.dueDate)}
                </p>
              </div>

              <!-- Detail grid -->
              <dl class="grid grid-cols-1 gap-3 text-sm">
                {#if provider}
                  <div class="flex items-center justify-between border-b border-border pb-3">
                    <dt class="text-muted">{t.current.deadline.providerField}</dt>
                    <dd class="text-text">
                      {language === 'en' ? provider.labelEn : provider.labelBg}
                    </dd>
                  </div>
                {/if}
                {#if car}
                  <div class="flex items-center justify-between border-b border-border pb-3">
                    <dt class="text-muted">{t.current.deadline.carLink}</dt>
                    <dd class="text-text">
                      {car.nickname}{car.plateNumber ? ` · ${car.plateNumber}` : ''}
                    </dd>
                  </div>
                {/if}
                {#if person}
                  <div class="flex items-center justify-between border-b border-border pb-3">
                    <dt class="text-muted">{t.current.deadline.personLink}</dt>
                    <dd class="text-text">{person.name}</dd>
                  </div>
                {/if}
                {#if deadline.reminderOffsets.length}
                  <div class="flex items-center justify-between border-b border-border pb-3">
                    <dt class="text-muted">{t.current.deadline.reminderField}</dt>
                    <dd class="text-text tabular-nums">
                      {deadline.reminderOffsets
                        .map((n) => `${n}${language === 'en' ? 'd' : 'д'}`)
                        .join(' · ')}
                    </dd>
                  </div>
                {/if}
                {#if deadline.notes}
                  <div class="border-b border-border pb-3">
                    <dt class="mb-1 text-muted">{t.current.deadline.notesField}</dt>
                    <dd class="whitespace-pre-wrap text-text">{deadline.notes}</dd>
                  </div>
                {/if}
              </dl>

              <!-- Official / payment link -->
              {#if deadline.officialUrl}
                <OfficialLinkButton
                  href={deadline.officialUrl}
                  label={provider
                    ? t.current.actions.payAt(
                        language === 'en' ? provider.labelEn : provider.labelBg
                      )
                    : t.current.actions.openOfficial}
                  variant="primary"
                  fullWidth
                />
              {:else if fallbackLink}
                <OfficialLinkButton
                  href={fallbackLink.url}
                  label={t.current.actions.openOfficial}
                  fullWidth
                />
              {/if}

              <CategoryInfoPanel category={deadline.category} />

              <!-- Actions -->
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Button variant="secondary" onclick={exportICS}>
                  <CalendarPlus size={16} aria-hidden="true" />
                  {t.current.deadline.exportICS}
                </Button>
                <Button variant="secondary" onclick={() => (editing = true)}>
                  <Pencil size={16} aria-hidden="true" />
                  {t.current.actions.edit}
                </Button>
                {#if deadline.status === 'active'}
                  <Button variant="secondary" onclick={markDone}>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {t.current.actions.done}
                  </Button>
                  <Button variant="secondary" onclick={archive}>
                    <Archive size={16} aria-hidden="true" />
                    {t.current.actions.archive}
                  </Button>
                {:else}
                  <Button variant="secondary" onclick={restore}>
                    <RotateCcw size={16} aria-hidden="true" />
                    {t.current.actions.restore}
                  </Button>
                {/if}
                <Button variant="danger" onclick={remove}>
                  <Trash2 size={16} aria-hidden="true" />
                  {t.current.actions.delete}
                </Button>
              </div>

              <div class="border-t border-border pt-4">
                <PrivacyLine />
              </div>
            </div>
          {/if}
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
