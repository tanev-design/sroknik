<script lang="ts">
  interface Props {
    value: number | string;
    class?: string;
  }
  let { value, class: cls = '' }: Props = $props();

  // Re-key the span on every change so the CSS animation re-runs.
  let renderKey = $derived(String(value));
</script>

{#key renderKey}
  <span class="tick-value tabular-nums {cls}">{value}</span>
{/key}
