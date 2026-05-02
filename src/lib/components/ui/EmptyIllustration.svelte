<script lang="ts">
  // Hand-drawn-feel single-color line illustrations, keyed by domain.
  // All paths use stroke="currentColor" so they pick up the parent's
  // text color (set to text-accent for the brand mark, text-muted for soft).
  type Variant = 'deadline' | 'document' | 'car' | 'person' | 'archive' | 'check';

  interface Props {
    variant?: Variant;
    size?: number;
    class?: string;
  }
  let { variant = 'deadline', size = 92, class: cls = 'text-accent/70' }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 120 120"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  class={cls}
>
  {#if variant === 'deadline'}
    <!-- A calendar with a wink: page corner + smiling check -->
    <rect x="22" y="30" width="76" height="64" rx="8" />
    <line x1="22" y1="46" x2="98" y2="46" />
    <line x1="38" y1="22" x2="38" y2="38" />
    <line x1="82" y1="22" x2="82" y2="38" />
    <path d="M 44 70 L 56 82 L 80 60" stroke-dasharray="0 0" />
    <circle cx="48" cy="58" r="1.5" fill="currentColor" />
    <circle cx="72" cy="58" r="1.5" fill="currentColor" />
  {:else if variant === 'document'}
    <!-- A folded document with corner crease -->
    <path d="M 32 22 L 76 22 L 92 38 L 92 96 L 32 96 Z" />
    <path d="M 76 22 L 76 38 L 92 38" />
    <line x1="44" y1="56" x2="80" y2="56" />
    <line x1="44" y1="68" x2="80" y2="68" />
    <line x1="44" y1="80" x2="68" y2="80" />
  {:else if variant === 'car'}
    <!-- Rounded car silhouette with wheels -->
    <path d="M 18 76 L 24 60 L 38 50 L 82 50 L 96 60 L 102 76 L 102 86 L 18 86 Z" />
    <line x1="24" y1="60" x2="96" y2="60" />
    <circle cx="36" cy="86" r="8" fill="var(--color-bg)" />
    <circle cx="84" cy="86" r="8" fill="var(--color-bg)" />
    <circle cx="36" cy="86" r="3" fill="currentColor" />
    <circle cx="84" cy="86" r="3" fill="currentColor" />
  {:else if variant === 'person'}
    <!-- Single soft person silhouette -->
    <circle cx="60" cy="44" r="14" />
    <path d="M 28 96 C 28 80 42 70 60 70 C 78 70 92 80 92 96" />
  {:else if variant === 'archive'}
    <!-- Archive box -->
    <rect x="22" y="38" width="76" height="58" rx="4" />
    <rect x="18" y="26" width="84" height="14" rx="3" />
    <line x1="50" y1="58" x2="70" y2="58" />
  {:else if variant === 'check'}
    <!-- A celebratory check inside a soft circle -->
    <circle cx="60" cy="60" r="38" />
    <path d="M 44 62 L 56 74 L 78 50" />
  {/if}
</svg>
