<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    href: string;
    label?: string;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
  }
  let { href, label, variant = 'secondary', fullWidth = false }: Props = $props();

  const styles = $derived(
    variant === 'primary'
      ? 'bg-accent text-white hover:bg-[#184d30]'
      : 'bg-surface text-text border border-border hover:border-[var(--color-border-strong)]'
  );
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-control)] px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-accent {styles} {fullWidth
    ? 'w-full'
    : ''}"
>
  <span class="truncate">{label ?? t.current.actions.openOfficial}</span>
  <ExternalLink size={14} aria-hidden="true" strokeWidth={1.75} />
</a>
