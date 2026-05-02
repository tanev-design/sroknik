<script lang="ts">
  import { RadioGroup as BitsRadioGroup } from 'bits-ui';

  interface Option {
    value: string;
    label: string;
    description?: string;
  }

  interface Props {
    value?: string;
    onValueChange?: (v: string) => void;
    options: Option[];
    name?: string;
    disabled?: boolean;
    /** Inline (horizontal pill list) or stacked. */
    layout?: 'stacked' | 'inline';
  }
  let {
    value = $bindable(''),
    onValueChange,
    options,
    name,
    disabled,
    layout = 'stacked'
  }: Props = $props();
</script>

<BitsRadioGroup.Root
  bind:value
  onValueChange={(v: string) => onValueChange?.(v)}
  {name}
  {disabled}
  class="flex {layout === 'inline' ? 'flex-row flex-wrap gap-2' : 'flex-col gap-2'}"
>
  {#each options as option (option.value)}
    <label
      class="group inline-flex cursor-pointer items-start gap-3 rounded-[var(--radius-control)] border border-border bg-surface px-3 py-2.5 transition-all duration-180 ease-[var(--ease-apple)] hover:border-accent-border has-[[data-state=checked]]:border-accent has-[[data-state=checked]]:bg-accent-light/40 {disabled
        ? 'cursor-not-allowed opacity-60'
        : ''}"
    >
      <BitsRadioGroup.Item
        value={option.value}
        class="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface transition-all duration-180 ease-[var(--ease-apple)] data-[state=checked]:border-accent"
      >
        {#snippet children({ checked })}
          {#if checked}
            <span
              class="block h-2.5 w-2.5 rounded-full bg-accent transition-transform duration-180 ease-[var(--ease-apple)]"
              style="animation: tick-roll 220ms var(--ease-apple);"
            ></span>
          {/if}
        {/snippet}
      </BitsRadioGroup.Item>
      <span class="flex flex-col gap-0.5 leading-snug">
        <span class="text-sm text-text">{option.label}</span>
        {#if option.description}
          <span class="text-xs text-muted">{option.description}</span>
        {/if}
      </span>
    </label>
  {/each}
</BitsRadioGroup.Root>
