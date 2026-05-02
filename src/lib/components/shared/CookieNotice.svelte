<script lang="ts">
  import { browser } from '$app/environment';
  import { t } from '$lib/copy/i18n.svelte';
  import Button from './Button.svelte';

  const key = 'sroknik-cookie-notice-v1';
  let visible = $state(false);

  $effect(() => {
    if (!browser) return;
    visible = localStorage.getItem(key) !== 'seen';
  });

  function accept() {
    if (browser) localStorage.setItem(key, 'seen');
    visible = false;
  }
</script>

{#if visible}
  <aside
    class="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+72px)] z-40 mx-auto max-w-[760px] rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[0_18px_60px_rgba(26,25,23,0.14)] md:bottom-5 md:left-auto md:right-5 md:mx-0 md:max-w-[420px]"
    role="status"
  >
    <div class="flex flex-col gap-3">
      <div>
        <p class="text-sm font-semibold text-text">{t.current.cookies.noticeTitle}</p>
        <p class="mt-1 text-sm leading-5 text-muted">{t.current.cookies.noticeBody}</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button size="sm" onclick={accept}>{t.current.cookies.accept}</Button>
        <a
          href="/cookies"
          class="inline-flex min-h-[44px] items-center rounded-[var(--radius-control)] px-3 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {t.current.cookies.learnMore}
        </a>
      </div>
    </div>
  </aside>
{/if}
