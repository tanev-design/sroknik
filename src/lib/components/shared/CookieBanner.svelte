<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { browser } from '$app/environment';
  import { acceptAllConsent, acceptNecessaryConsent, readConsent } from '$lib/consent';
  import { t } from '$lib/copy/i18n.svelte';
  import Button from './Button.svelte';
  import CookieSettings from './CookieSettings.svelte';

  let visible = $state(false);
  let customize = $state(false);

  $effect(() => {
    if (!browser) return;
    visible = readConsent() === null;
  });

  function acceptAll(): void {
    acceptAllConsent();
    visible = false;
  }

  function necessaryOnly(): void {
    acceptNecessaryConsent();
    visible = false;
  }

  function closeAfterSave(): void {
    visible = false;
    customize = false;
  }
</script>

{#if visible}
  <Dialog.Root
    open={visible}
    onOpenChange={(v) => {
      visible = v;
      if (!v) customize = false;
    }}
  >
    <Dialog.Portal>
      <Dialog.Overlay class="sheet-overlay fixed inset-0 z-40 bg-[rgba(26,25,23,0.42)] md:hidden" />
      <Dialog.Content
        class="sheet-content fixed inset-x-0 bottom-0 z-50 flex max-h-[88svh] flex-col overflow-y-auto rounded-t-[20px] border border-border bg-bg p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-[var(--shadow-sheet)] will-change-transform md:hidden"
      >
        {#if customize}
          <Dialog.Title class="sr-only">{t.current.cookies.settings.title}</Dialog.Title>
          <CookieSettings compact onSaved={closeAfterSave} />
        {:else}
          <Dialog.Title class="text-base font-semibold text-text">
            {t.current.cookies.banner.title}
          </Dialog.Title>
          <Dialog.Description class="mt-2 text-sm leading-6 text-muted">
            {t.current.cookies.banner.body}
          </Dialog.Description>

          <div class="mt-4 grid gap-2">
            <Button onclick={acceptAll} fullWidth>{t.current.cookies.banner.acceptAll}</Button>
            <Button variant="secondary" onclick={necessaryOnly} fullWidth>
              {t.current.cookies.banner.necessaryOnly}
            </Button>
            <Button variant="ghost" onclick={() => (customize = true)} fullWidth>
              {t.current.cookies.banner.customize}
            </Button>
          </div>

          <a
            href="/cookies"
            class="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-control)] text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t.current.cookies.learnMore}
          </a>
        {/if}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

  <aside
    class="fixed inset-x-5 bottom-5 z-40 mx-auto hidden max-w-[1040px] rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[0_18px_60px_rgba(26,25,23,0.14)] md:block"
    aria-label={t.current.cookies.banner.title}
  >
    {#if customize}
      <CookieSettings compact onSaved={closeAfterSave} />
    {:else}
      <div class="flex items-center gap-5">
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-text">{t.current.cookies.banner.title}</p>
          <p class="mt-1 max-w-3xl text-sm leading-5 text-muted">
            {t.current.cookies.banner.body}
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <Button size="sm" onclick={acceptAll}>{t.current.cookies.banner.acceptAll}</Button>
          <Button size="sm" variant="secondary" onclick={necessaryOnly}>
            {t.current.cookies.banner.necessaryOnly}
          </Button>
          <Button size="sm" variant="ghost" onclick={() => (customize = true)}>
            {t.current.cookies.banner.customize}
          </Button>
          <a
            href="/cookies"
            class="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] px-3 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t.current.cookies.learnMore}
          </a>
        </div>
      </div>
    {/if}
  </aside>
{/if}
