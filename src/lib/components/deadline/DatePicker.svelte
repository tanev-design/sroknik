<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    value: string; // YYYY-MM-DD
    onChange: (v: string) => void;
    min?: string;
    required?: boolean;
    error?: string;
    /** Override the visible label. */
    label?: string;
    name?: string;
    inputEl?: HTMLInputElement;
  }
  let {
    value = $bindable(),
    onChange,
    min,
    required,
    error,
    label,
    name,
    inputEl = $bindable()
  }: Props = $props();

  function handleInput(e: Event) {
    const next = (e.currentTarget as HTMLInputElement).value;
    value = next;
    onChange(next);
  }
</script>

<label class="block">
  <span class="mb-1.5 block text-sm font-medium text-text">
    {label ?? t.current.deadline.dueDateField}
  </span>
  <input
    type="date"
    bind:this={inputEl}
    inputmode="numeric"
    lang={t.language === 'en' ? 'en' : 'bg'}
    class="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-text focus:border-accent"
    bind:value
    {name}
    {min}
    {required}
    aria-invalid={error ? true : undefined}
    oninput={handleInput}
  />
  {#if error}
    <span class="mt-1 block text-xs text-[var(--color-danger)]">{error}</span>
  {/if}
</label>
