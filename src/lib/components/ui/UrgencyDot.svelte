<script lang="ts">
  import type { Urgency } from '$lib/types';

  interface Props {
    urgency: Urgency;
    size?: number;
  }
  let { urgency, size = 6 }: Props = $props();

  const colors: Record<Urgency, string> = {
    overdue: 'var(--color-danger)',
    today: 'var(--color-warning)',
    soon: 'var(--color-accent)',
    later: 'var(--color-border-strong)'
  };
</script>

<span
  aria-hidden="true"
  class="inline-block rounded-full"
  style="width: {size}px; height: {size}px; background: {colors[urgency]};"
></span>
