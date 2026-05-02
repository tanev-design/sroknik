<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { X } from 'lucide-svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import DeadlineForm from './DeadlineForm.svelte';
  import type { Deadline, DeadlineCategory } from '$lib/types';

  interface Props {
    open: boolean;
    existing?: Deadline;
    initialCategory?: DeadlineCategory;
    onOpenChange: (v: boolean) => void;
  }
  let { open = $bindable(), existing, initialCategory, onOpenChange }: Props = $props();

  function close() {
    open = false;
    onOpenChange(false);
  }
</script>

<Dialog.Root bind:open onOpenChange={(v: boolean) => onOpenChange(v)}>
  <Dialog.Portal>
    <Dialog.Overlay
      class="sheet-overlay fixed inset-0 z-40 bg-[rgba(26,25,23,0.45)] backdrop-blur-[2px]"
    />
    <Dialog.Content
      class="sheet-content fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92svh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-[20px] border border-border bg-bg shadow-[var(--shadow-sheet)] md:bottom-auto md:top-12 md:max-h-[85svh] md:rounded-[var(--radius-card)]"
    >
      <div
        class="flex items-center justify-between border-b border-border bg-surface px-4 py-3.5 md:px-6"
      >
        <Dialog.Title class="text-[15px] font-medium text-text">
          {existing ? t.current.add.titleEdit : t.current.add.titleNew}
        </Dialog.Title>
        <Dialog.Close
          class="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:bg-bg"
          aria-label={t.current.actions.close}
        >
          <X size={18} aria-hidden="true" />
        </Dialog.Close>
      </div>

      <div class="overflow-y-auto px-4 py-6 md:px-6 md:py-8">
        <DeadlineForm {existing} {initialCategory} onDone={close} />
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
