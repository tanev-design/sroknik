<script lang="ts">
  // Global error boundary for IndexedDB failure.
  // Triggered when the browser blocks IndexedDB (private windows on some
  // Firefox/Safari builds, quota exceeded, storage disabled by policy).
  // Renders a calm, honest explanation instead of a white page.

  import { onMount, type Snippet } from 'svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { browser } from '$app/environment';

  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();

  let dbFailed = $state(false);

  function looksLikeIdbError(reason: unknown): boolean {
    if (!reason) return false;
    const name = (reason as { name?: string }).name;
    if (name === 'InvalidStateError' || name === 'QuotaExceededError') return true;
    const msg = String(reason);
    return /IndexedDB|IDBDatabase|database/i.test(msg);
  }

  onMount(() => {
    if (!browser) return;

    const onUnhandled = (e: PromiseRejectionEvent) => {
      if (looksLikeIdbError(e.reason)) dbFailed = true;
    };
    const onError = (e: ErrorEvent) => {
      if (looksLikeIdbError(e.error ?? e.message)) dbFailed = true;
    };

    window.addEventListener('unhandledrejection', onUnhandled);
    window.addEventListener('error', onError);

    return () => {
      window.removeEventListener('unhandledrejection', onUnhandled);
      window.removeEventListener('error', onError);
    };
  });
</script>

{#if dbFailed}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-bg p-6"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="db-error-title"
  >
    <div
      class="w-full max-w-sm rounded-[var(--radius-card)] border border-border bg-surface p-6 text-center shadow-[var(--shadow-card)]"
    >
      <p id="db-error-title" class="mb-2 font-medium text-text">
        {t.current.dbError.title}
      </p>
      <p class="text-sm leading-relaxed text-muted">
        {t.current.dbError.body}
      </p>
    </div>
  </div>
{:else}
  {@render children()}
{/if}
