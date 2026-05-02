<script lang="ts">
  import { Checkbox as BitsCheckbox } from 'bits-ui';
  import { Check } from 'lucide-svelte';

  interface Props {
    checked?: boolean;
    onCheckedChange?: (v: boolean) => void;
    label?: string;
    description?: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    id?: string;
  }
  let {
    checked = $bindable(false),
    onCheckedChange,
    label,
    description,
    name,
    value,
    disabled,
    id
  }: Props = $props();
</script>

<label
  class="group inline-flex cursor-pointer items-start gap-3 {disabled
    ? 'cursor-not-allowed opacity-60'
    : ''}"
>
  <BitsCheckbox.Root
    {id}
    {name}
    {value}
    {disabled}
    bind:checked
    onCheckedChange={(v: boolean) => onCheckedChange?.(v)}
    class="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border border-border-strong bg-surface transition-all duration-180 ease-[var(--ease-apple)] hover:border-accent group-hover:scale-[1.04] data-[state=checked]:border-accent data-[state=checked]:bg-accent"
  >
    {#snippet children({ checked: c })}
      {#if c}
        <Check size={12} aria-hidden="true" class="text-white" strokeWidth={3} />
      {/if}
    {/snippet}
  </BitsCheckbox.Root>

  {#if label || description}
    <span class="flex flex-col gap-0.5 leading-snug">
      {#if label}
        <span class="text-sm text-text">{label}</span>
      {/if}
      {#if description}
        <span class="text-xs text-muted">{description}</span>
      {/if}
    </span>
  {/if}
</label>
