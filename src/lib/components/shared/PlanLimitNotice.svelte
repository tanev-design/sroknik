<script lang="ts">
  // Inline upgrade nudge, rendered next to an action that would exceed the
  // Free plan's limit. Honest, specific, and always links to /plus.

  import { Zap } from 'lucide-svelte';
  import { t } from '$lib/copy/i18n.svelte';

  type LimitType = 'cars' | 'people' | 'deadlines' | 'documents';

  interface Props {
    /** What limit was hit. Determines the message. */
    type?: LimitType;
    /** Explicit override; used by legacy call sites that pass plain text. */
    message?: string;
  }

  let { type, message }: Props = $props();

  const messages = $derived(t.current.planLimitV2);

  const computed = $derived.by(() => {
    if (message) return { hit: message, plus: '' };
    if (!type) return { hit: '', plus: '' };
    return messages[type];
  });
</script>

<aside
  role="note"
  class="flex items-start gap-3 rounded-[var(--radius-control)] border border-[var(--color-accent-border)] bg-accent-light/60 px-3 py-2.5 text-sm"
>
  <Zap size={14} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
  <div class="flex-1 min-w-0">
    <span class="text-text">{computed.hit}</span>
    {#if computed.plus}<span class="text-muted"> {computed.plus}</span>{/if}
    <a
      href="/plus"
      class="ml-1 whitespace-nowrap font-medium text-accent hover:underline focus-visible:outline-accent"
    >
      {messages.ctaViewPlus} →
    </a>
  </div>
</aside>
