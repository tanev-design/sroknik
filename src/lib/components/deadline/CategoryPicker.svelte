<script lang="ts">
  import { CATEGORIES } from '$lib/constants/categories';
  import type { DeadlineCategory } from '$lib/types';
  import { t } from '$lib/copy/i18n.svelte';
  import { getCategoryIcon } from '$lib/components/icons/category-icons';

  interface Props {
    value: DeadlineCategory;
    onChange: (id: DeadlineCategory) => void;
  }
  let { value = $bindable(), onChange }: Props = $props();

  const language = $derived(t.language);

  const groups: {
    key: 'vehicles' | 'documents' | 'bills' | 'other';
    hintKey: 'vehiclesHint' | 'documentsHint' | 'billsHint' | 'otherHint';
    ids: DeadlineCategory[];
  }[] = [
    {
      key: 'vehicles',
      hintKey: 'vehiclesHint',
      ids: ['vignette', 'civil-liability', 'technical-inspection', 'drivers-license']
    },
    { key: 'documents', hintKey: 'documentsHint', ids: ['id-card', 'passport'] },
    {
      key: 'bills',
      hintKey: 'billsHint',
      ids: ['electricity-bill', 'water-bill', 'internet-phone', 'local-tax']
    },
    { key: 'other', hintKey: 'otherHint', ids: ['custom'] }
  ];

  const categoriesById = new Map(CATEGORIES.map((category) => [category.id, category]));

  function select(id: DeadlineCategory) {
    value = id;
    onChange(id);
  }
</script>

<fieldset>
  <legend class="mb-2 block text-sm font-medium text-text">
    {t.current.deadline.categoryField}
  </legend>
  <div class="flex flex-col gap-4">
    {#each groups as group (group.key)}
      <section class="rounded-[var(--radius-card)] border border-border bg-elevated/45 p-3">
        <div class="mb-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-muted">
            {t.current.categoryGroups[group.key]}
          </p>
          <p class="mt-1 text-xs leading-5 text-muted">
            {t.current.categoryGroups[group.hintKey]}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {#each group.ids as id (id)}
            {@const c = categoriesById.get(id)}
            {#if c}
              {@const Icon = getCategoryIcon(c.icon)}
              {@const active = value === c.id}
              {@const label = language === 'en' ? c.labelEn : c.labelBg}
              {@const description = language === 'en' ? c.descriptionEn : c.descriptionBg}
              <button
                type="button"
                onclick={() => select(c.id)}
                aria-pressed={active}
                class="flex min-h-[76px] items-start gap-3 rounded-[var(--radius-control)] border px-3 py-3 text-left transition-[border-color,background-color,transform,opacity] duration-100 active:scale-[0.98] active:opacity-90
                  {active
                  ? 'border-accent bg-accent-light text-accent'
                  : 'border-border bg-surface text-text hover:border-[var(--color-border-strong)] hover:bg-surface/80'}"
              >
                {#if Icon}
                  <span
                    class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full {active
                      ? 'bg-surface text-accent'
                      : 'bg-accent-light text-accent'}"
                  >
                    <Icon size={16} aria-hidden="true" strokeWidth={1.75} />
                  </span>
                {/if}
                <span class="min-w-0">
                  <span class="block text-sm font-medium leading-5">{label}</span>
                  <span class="mt-1 block text-xs leading-5 text-muted">{description}</span>
                </span>
              </button>
            {/if}
          {/each}
        </div>
      </section>
    {/each}
  </div>
</fieldset>
