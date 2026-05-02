<script lang="ts">
  import { CATEGORIES } from '$lib/constants/categories';
  import type { DeadlineCategory } from '$lib/types';
  import { t } from '$lib/copy/i18n.svelte';
  import * as icons from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  interface Props {
    value: DeadlineCategory;
    onChange: (id: DeadlineCategory) => void;
  }
  let { value = $bindable(), onChange }: Props = $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconMap = icons as unknown as Record<string, ComponentType>;

  const language = $derived(t.language);

  function select(id: DeadlineCategory) {
    value = id;
    onChange(id);
  }
</script>

<fieldset>
  <legend class="mb-2 block text-sm font-medium text-text">
    {t.current.deadline.categoryField}
  </legend>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
    {#each CATEGORIES as c (c.id)}
      {@const Icon = iconMap[c.icon] ?? iconMap.CalendarClock}
      {@const active = value === c.id}
      {@const label = language === 'en' ? c.labelEn : c.labelBg}
      <button
        type="button"
        onclick={() => select(c.id)}
        aria-pressed={active}
        class="flex min-h-[48px] items-center gap-2 rounded-[var(--radius-control)] border px-3 py-2.5 text-left text-sm transition-colors
          {active
          ? 'border-accent bg-accent-light text-accent'
          : 'border-border bg-surface text-text hover:border-[var(--color-border-strong)]'}"
      >
        {#if Icon}
          <Icon size={16} aria-hidden="true" strokeWidth={1.75} />
        {/if}
        <span class="min-w-0 leading-5">{label}</span>
      </button>
    {/each}
  </div>
</fieldset>
