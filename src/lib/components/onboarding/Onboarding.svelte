<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { goto } from '$app/navigation';
  import { t } from '$lib/copy/i18n.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import Button from '$lib/components/shared/Button.svelte';

  let open = $state(true);
  let step = $state(0);

  const steps = $derived([
    { title: t.current.onboarding.step1Title, sub: t.current.onboarding.step1Sub },
    { title: t.current.onboarding.step2Title, sub: t.current.onboarding.step2Sub },
    { title: t.current.onboarding.step3Title, sub: t.current.onboarding.step3Sub }
  ]);

  async function finish() {
    await settingsStore.update({ onboardingDone: true });
    open = false;
  }

  function next() {
    if (step < steps.length - 1) step++;
    else finish();
  }

  async function goToAdd() {
    await finish();
    await goto('/deadlines/new');
  }
</script>

<Dialog.Root
  bind:open
  onOpenChange={(v: boolean) => {
    if (!v) finish();
  }}
>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-40 bg-[rgba(26,25,23,0.5)]" />
    <Dialog.Content
      class="fixed left-1/2 top-1/2 z-50 flex w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-lg"
    >
      {@const current = steps[step]}
      <div class="flex flex-col gap-3 text-center">
        <Dialog.Title class="text-lg font-semibold text-text">
          {current?.title ?? ''}
        </Dialog.Title>
        {#if current?.sub}
          <Dialog.Description class="text-sm text-muted">
            {current.sub}
          </Dialog.Description>
        {/if}
      </div>

      <div class="flex items-center justify-center gap-1.5">
        {#each steps as _, i (i)}
          <span
            class="h-1.5 w-1.5 rounded-full {i === step ? 'bg-accent' : 'bg-border'}"
            aria-hidden="true"
          ></span>
        {/each}
      </div>

      <div class="flex flex-col gap-2">
        {#if step === steps.length - 1}
          <Button fullWidth onclick={goToAdd}>{t.current.onboarding.step3Cta}</Button>
          <button
            type="button"
            onclick={finish}
            class="mt-1 text-sm text-muted hover:text-text underline-offset-2 hover:underline"
          >
            {t.current.onboarding.skip}
          </button>
        {:else}
          <Button fullWidth onclick={next}>{t.current.actions.continue}</Button>
          <button
            type="button"
            onclick={finish}
            class="mt-1 text-sm text-muted hover:text-text underline-offset-2 hover:underline"
          >
            {t.current.onboarding.skip}
          </button>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
