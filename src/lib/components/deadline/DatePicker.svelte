<script lang="ts">
  // Thin adapter over CalendarPicker so all pre-existing call sites keep
  // their API. The old native <input type="date"> has been replaced with a
  // Bulgarian-first, ISO-8601 week CalendarPicker (Monday first).

  import CalendarPicker from '$lib/components/ui/CalendarPicker.svelte';
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
    /** Kept for backward compat; the new picker does not expose a raw input. */
    inputEl?: HTMLInputElement;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  let {
    value = $bindable(),
    onChange,
    min: _min,
    required,
    error,
    label,
    name: _name,
    inputEl: _inputEl = $bindable()
  }: Props = $props();
  /* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<CalendarPicker
  bind:value
  {onChange}
  {required}
  {error}
  label={label ?? t.current.deadline.dueDateField}
/>
