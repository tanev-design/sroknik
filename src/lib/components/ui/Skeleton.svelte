<script lang="ts">
  interface Props {
    /** width — Tailwind class or raw CSS like "60%". */
    w?: string;
    /** height — Tailwind class or raw CSS like "1rem". */
    h?: string;
    /** Pre-built shape. */
    shape?: 'line' | 'card' | 'pill' | 'circle';
    class?: string;
  }
  let { w, h, shape = 'line', class: cls = '' }: Props = $props();

  const shapeClass = $derived.by(() => {
    if (shape === 'card') return 'h-20 w-full rounded-[var(--radius-card)]';
    if (shape === 'pill') return 'h-6 w-20 rounded-full';
    if (shape === 'circle') return 'h-10 w-10 rounded-full';
    return 'h-4 w-full rounded-[6px]';
  });

  const inlineStyle = $derived.by(() => {
    const parts: string[] = [];
    if (w) parts.push(`width: ${w}`);
    if (h) parts.push(`height: ${h}`);
    return parts.join('; ');
  });
</script>

<span
  aria-hidden="true"
  class="skeleton block {shapeClass} {cls}"
  style={inlineStyle}
></span>
