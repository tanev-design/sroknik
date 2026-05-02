<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';
  import { peopleStore } from '$lib/stores/people.svelte';
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    value: string | undefined;
    onChange: (v: string | undefined) => void;
    label?: string;
  }
  let { value = $bindable(), onChange, label }: Props = $props();

  function handleChange(e: Event) {
    const el = e.currentTarget as HTMLSelectElement;
    const next = el.value === '' ? undefined : el.value;
    value = next;
    onChange(next);
  }
</script>

<label class="block">
  <span class="mb-1.5 block text-sm font-medium text-text">
    {label ?? t.current.deadline.personLink}
  </span>
  <div class="relative">
    <select
      class="h-11 w-full appearance-none rounded-[var(--radius-control)] border border-border bg-surface pl-3 pr-10 text-sm text-text focus:border-accent"
      value={value ?? ''}
      onchange={handleChange}
    >
      <option value="">—</option>
      {#each peopleStore.all as p (p.id)}
        <option value={p.id}>{p.name}</option>
      {/each}
    </select>
    <ChevronDown
      size={16}
      aria-hidden="true"
      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
    />
  </div>
</label>
