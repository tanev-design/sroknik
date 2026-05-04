<script lang="ts">
  import { Dialog } from 'bits-ui';
  import AuthForm from '$lib/components/auth/AuthForm.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { X } from 'lucide-svelte';

  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Called when user picks "Continue without login". */
    onGuest?: () => void | Promise<void>;
    redirectTo?: string;
  }

  let { open, onOpenChange, onGuest, redirectTo = '/settings' }: Props = $props();
  let formKey = $state(0);

  function close() {
    formKey += 1;
    onOpenChange(false);
  }

  async function guest() {
    await onGuest?.();
    close();
  }
</script>

<Dialog.Root
  {open}
  onOpenChange={(v) => {
    if (!v) formKey += 1;
    onOpenChange(v);
  }}
>
  <Dialog.Portal>
    <Dialog.Overlay class="sheet-overlay fixed inset-0 z-40 bg-[rgba(26,25,23,0.5)]" />
    <Dialog.Content
      class="sheet-content fixed left-1/2 top-1/2 z-50 flex w-[min(94vw,460px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)] md:p-6"
    >
      <header class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="eyebrow mb-1">{t.current.auth.optional}</p>
          <Dialog.Title class="text-lg font-semibold leading-tight text-text">
            {t.current.auth.title}
          </Dialog.Title>
          <Dialog.Description class="mt-1.5 text-sm leading-5 text-muted">
            {t.current.auth.subtitle}
          </Dialog.Description>
        </div>
        <button
          type="button"
          onclick={close}
          aria-label={t.current.actions.close}
          class="grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-text"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </header>

      {#key formKey}
        <AuthForm
          embedded
          {redirectTo}
          onGuest={guest}
          onSuccess={close}
        />
      {/key}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
