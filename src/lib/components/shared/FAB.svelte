<script lang="ts">
  import { Plus } from 'lucide-svelte';

  interface Props {
    label: string;
    onClick: () => void;
  }
  let { label, onClick }: Props = $props();
</script>

<button
  type="button"
  onclick={onClick}
  aria-label={label}
  class="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-4 z-20 inline-flex h-14 min-h-[44px] w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(30,92,58,0.25)] transition-transform hover:scale-[1.03] focus-visible:outline-accent md:bottom-8 md:right-8"
>
  <Plus size={22} aria-hidden="true" strokeWidth={2} />
</button>
