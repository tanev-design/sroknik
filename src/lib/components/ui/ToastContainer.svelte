<script lang="ts">
  import { toastStore } from '$lib/stores/toast.svelte';
  import { X } from 'lucide-svelte';
  import { t } from '$lib/copy/i18n.svelte';

  const stripColor: Record<string, string> = {
    default: 'bg-accent',
    success: 'bg-accent',
    danger: 'bg-[var(--color-danger)]'
  };
</script>

<div
  aria-live="polite"
  aria-atomic="true"
  class="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+5rem)] z-[60] flex flex-col items-center gap-2 px-4 md:bottom-8"
>
  {#each toastStore.items as item (item.id)}
    <div
      role="status"
      class="pointer-events-auto relative flex w-full max-w-[380px] items-center gap-3 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface py-3 pl-4 pr-2 shadow-[0_8px_28px_rgba(26,25,23,0.12)]"
      style="animation: toast-in 240ms var(--ease-apple);"
    >
      <span aria-hidden="true" class="absolute inset-y-0 left-0 w-1 {stripColor[item.variant]}"></span>
      <p class="ml-1 flex-1 text-sm text-text">{item.message}</p>
      <button
        type="button"
        onclick={() => toastStore.dismiss(item.id)}
        aria-label={t.current.actions.close}
        class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:bg-bg hover:text-text"
      >
        <X size={16} aria-hidden="true" />
      </button>
      {#if item.duration > 0}
        <span
          aria-hidden="true"
          class="absolute inset-x-0 bottom-0 h-[2px] origin-left {stripColor[item.variant]}"
          style="animation: toast-progress {item.duration}ms linear forwards;"
        ></span>
      {/if}
    </div>
  {/each}
</div>
