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
      'bg-accent text-white shadow-[0_14px_32px_color-mix(in_srgb,var(--color-accent)_24%,transparent)] hover:bg-[#184d30] disabled:bg-border disabled:text-muted disabled:cursor-not-allowed disabled:shadow-none',
    secondary:
      'bg-surface/80 text-text border border-border shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[var(--color-border-strong)] hover:bg-elevated disabled:text-muted',
    ghost: 'bg-transparent text-text hover:bg-surface/70 disabled:text-muted',
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
  class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium transition-all focus-visible:outline-accent {variants[
    variant
  ]} {sizes[size]} {fullWidth ? 'w-full' : ''} {className}"
  {...rest}
>
  {@render children()}
</button>
