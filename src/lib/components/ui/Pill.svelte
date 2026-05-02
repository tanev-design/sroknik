<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Size = 'sm' | 'md';

  interface Props extends Omit<HTMLButtonAttributes, 'class' | 'children'> {
    active?: boolean;
    size?: Size;
    fullWidth?: boolean;
    children: Snippet;
  }

  let {
    active = false,
    size = 'md',
    fullWidth = false,
    type = 'button',
    children,
    ...rest
  }: Props = $props();

  const sizeClass = $derived(size === 'sm' ? 'h-9 px-3.5 text-[13px]' : 'h-10 px-4 text-sm');
</script>

<button
  {type}
  aria-pressed={active}
  class="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-pill)] border font-medium transition-colors focus-visible:outline-accent
    {sizeClass}
    {active
    ? 'border-accent bg-accent-light text-accent'
    : 'border-border bg-surface text-text hover:border-[var(--color-border-strong)]'}
    {fullWidth ? 'w-full' : ''}"
  {...rest}
>
  {@render children()}
</button>
