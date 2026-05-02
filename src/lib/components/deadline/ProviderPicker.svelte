<script lang="ts">
  import { ChevronDown, ExternalLink } from 'lucide-svelte';
  import { getCategory } from '$lib/constants/categories';
  import { t } from '$lib/copy/i18n.svelte';
  import type { DeadlineCategory } from '$lib/types';

  interface Props {
    category: DeadlineCategory;
    value: string | undefined;
    onChange: (id: string | undefined) => void;
  }
  let { category, value = $bindable(), onChange }: Props = $props();

  const cat = $derived(getCategory(category));
  const providers = $derived(cat.providers ?? []);
  const selected = $derived(providers.find((p) => p.id === value));
  const language = $derived(t.language);

  function handleChange(e: Event) {
    const next = (e.currentTarget as HTMLSelectElement).value;
    const v = next === '' ? undefined : next;
    value = v;
    onChange(v);
  }

  function previewLink(): string | undefined {
    return selected?.paymentUrl ?? selected?.websiteUrl;
  }
</script>

{#if providers.length}
  <div class="block">
    <div class="mb-1.5 flex items-baseline justify-between gap-3">
      <span class="text-sm font-medium text-text">{t.current.deadline.providerField}</span>
      <span class="text-xs text-muted">{t.current.add.optional}</span>
    </div>

    <div class="relative">
      <select
        value={value ?? ''}
        onchange={handleChange}
        class="h-11 w-full appearance-none rounded-[var(--radius-control)] border border-border bg-surface pl-3 pr-10 text-sm text-text transition-colors focus:border-accent"
      >
        <option value="">{t.current.deadline.providerNone}</option>
        {#each providers as p (p.id)}
          {@const label = language === 'en' ? p.labelEn : p.labelBg}
          {@const region = language === 'en' ? p.regionEn : p.regionBg}
          <option value={p.id}>
            {label}{region ? ` · ${region}` : ''}
          </option>
        {/each}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>

    <p class="mt-1.5 text-xs text-muted">{t.current.deadline.providerHelper}</p>

    {#if selected && previewLink()}
      <a
        href={previewLink()}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent underline-offset-2 hover:underline"
      >
        <ExternalLink size={12} aria-hidden="true" />
        <span class="truncate">{previewLink()}</span>
      </a>
    {/if}
  </div>
{/if}
