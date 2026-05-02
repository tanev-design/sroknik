<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
  type Size = 'sm' | 'md' | 'lg';

  interface Props extends Omit<HTMLButtonAttributes, 'class'> {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    className?: string;
    children: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    type = 'button',
    children,
    ...rest
  }: Props = $props();

  const variants: Record<Variant, string> = {
    primary:
      'bg-accent text-white hover:bg-[#184d30] disabled:bg-border disabled:text-muted disabled:cursor-not-allowed',
    secondary:
      'bg-surface text-text border border-border hover:border-[var(--color-border-strong)] disabled:text-muted',
    ghost: 'bg-transparent text-text hover:bg-bg disabled:text-muted',
    danger:
      'bg-[var(--color-danger-light)] text-[var(--color-danger)] hover:bg-[#efd7d7] border border-[#eecccc]'
  };

  const sizes: Record<Size, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base'
  };
</script>

<button
  {type}
  class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium transition-colors focus-visible:outline-accent {variants[
    variant
  ]} {sizes[size]} {fullWidth ? 'w-full' : ''} {className}"
  {...rest}
>
  {@render children()}
</button>
