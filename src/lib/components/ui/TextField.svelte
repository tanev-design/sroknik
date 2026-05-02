<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'class'> {
    label?: string;
    /** Right-aligned helper text below the input. */
    helper?: string;
    error?: string;
    /** Visible only to screen readers when label is rendered elsewhere. */
    srOnlyLabel?: boolean;
  }
  let {
    label,
    helper,
    error,
    srOnlyLabel = false,
    type = 'text',
    value = $bindable(),
    ...rest
  }: Props = $props();
</script>

<label class="block">
  {#if label}
    <span
      class={srOnlyLabel
        ? 'sr-only'
        : 'mb-1.5 block text-sm font-medium text-text'}
    >
      {label}
    </span>
  {/if}
  <input
    {type}
    bind:value
    aria-invalid={error ? true : undefined}
    class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-text transition-colors placeholder:text-muted/70 focus:border-accent"
    {...rest}
  />
  {#if error}
    <span class="mt-1 block text-xs text-[var(--color-danger)]">{error}</span>
  {:else if helper}
    <span class="mt-1 block text-xs text-muted">{helper}</span>
  {/if}
</label>
