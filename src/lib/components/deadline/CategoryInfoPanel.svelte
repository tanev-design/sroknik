<script lang="ts">
  import { Collapsible } from 'bits-ui';
  import { ChevronDown } from 'lucide-svelte';
  import type { DeadlineCategory } from '$lib/types';
  import { t } from '$lib/copy/i18n.svelte';
  import { getCategory, resolveOfficialUrl } from '$lib/constants/categories';
  import { getCategoryFacts, type FeeRow } from '$lib/constants/category-facts';
  import { formatFee, formatFeeRange } from '$lib/utils/currency';
  import OfficialLinkButton from '$lib/components/shared/OfficialLinkButton.svelte';

  interface Props {
    category: DeadlineCategory;
  }
  let { category }: Props = $props();

  let open = $state(false);

  const facts = $derived(getCategoryFacts(category));
  const cat = $derived(getCategory(category));
  const language = $derived(t.language);
  const officialUrl = $derived(resolveOfficialUrl(category));

  function serviceLabel(row: FeeRow): string {
    const i = t.current.infoPanel;
    if (row.serviceKey === 'standard') return i.serviceStandard;
    if (row.serviceKey === 'fast') return i.serviceFast;
    if (row.serviceKey === 'express') return i.serviceExpress;
    return i.serviceRegular;
  }

  function durationLabel(row: FeeRow): string {
    const i = t.current.infoPanel;
    if (row.durationKey === 'days30') return i.serviceStandardDays;
    if (row.durationKey === 'days3') return i.serviceFastDays;
    if (row.durationKey === 'hours8') return i.serviceExpressHours;
    return '—';
  }

  const recommendedDays = $derived(cat.defaultReminderOffsets[0] ?? null);
  const validity = $derived(language === 'en' ? facts.validityEn : facts.validityBg);
  const note = $derived(language === 'en' ? facts.noteEn : facts.noteBg);
  const requiredDocs = $derived(language === 'en' ? facts.requiredDocsEn : facts.requiredDocsBg);
</script>

<Collapsible.Root bind:open>
  <Collapsible.Trigger
    class="flex min-h-[44px] w-full items-center justify-between gap-2 rounded-[var(--radius-control)] border border-border bg-surface px-3 py-2 text-sm text-text transition-colors hover:border-[var(--color-border-strong)] focus-visible:outline-accent"
  >
    <span class="font-medium">
      {open ? t.current.infoPanel.hideDetails : t.current.infoPanel.seeDetails}
    </span>
    <ChevronDown
      size={16}
      aria-hidden="true"
      class="transition-transform duration-200 {open ? 'rotate-180' : ''}"
    />
  </Collapsible.Trigger>

  <Collapsible.Content
    class="mt-2 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface"
  >
    <div class="flex flex-col gap-4 p-4 text-sm">
      {#if validity}
        <div>
          <p class="eyebrow mb-1">{t.current.infoPanel.validity}</p>
          <p class="text-text">{validity}</p>
        </div>
      {/if}

      {#if note}
        <div class="rounded-[var(--radius-control)] border border-warning/30 bg-warning-light/40 px-3 py-2">
          <p class="eyebrow mb-1 text-warning">{t.current.infoPanel.importantNote}</p>
          <p class="text-text-soft">{note}</p>
        </div>
      {/if}

      {#if facts.hasOfficialFees && facts.fees && facts.fees.length}
        <div>
          <p class="eyebrow mb-2">{t.current.infoPanel.fees}</p>
          <ul class="flex flex-col gap-1.5">
            {#each facts.fees as row (row.serviceKey)}
              <li class="flex items-baseline justify-between gap-3">
                <span class="text-text">
                  {serviceLabel(row)}
                  <span class="text-muted"> · {durationLabel(row)}</span>
                </span>
                <span class="text-text tabular-nums">{formatFee(row.euro, row.bgn)}</span>
              </li>
            {/each}
          </ul>
        </div>
      {:else if !facts.hasOfficialFees}
        <p class="text-text-soft">{t.current.infoPanel.feesVaryByProvider}</p>
      {/if}

      {#if facts.fine}
        <div>
          <p class="eyebrow mb-1">{t.current.infoPanel.fineRange}</p>
          <p class="text-text tabular-nums">
            {#if facts.fine.euroMin === facts.fine.euroMax}
              {formatFee(facts.fine.euroMin, facts.fine.bgnMin)}
            {:else}
              {formatFeeRange(facts.fine.euroMin, facts.fine.euroMax, facts.fine.bgnMin, facts.fine.bgnMax)}
            {/if}
          </p>
        </div>
      {/if}

      {#if requiredDocs && requiredDocs.length}
        <div>
          <p class="eyebrow mb-2">{t.current.infoPanel.requiredDocuments}</p>
          <ul class="flex flex-col gap-1 text-text-soft">
            {#each requiredDocs as doc, idx (idx)}
              <li>· {doc}</li>
            {/each}
          </ul>
        </div>
      {/if}

      {#if recommendedDays !== null}
        <div class="flex items-baseline justify-between gap-3 border-t border-border pt-3">
          <span class="text-muted">{t.current.infoPanel.reminderDefault}</span>
          <span class="text-text tabular-nums">{t.current.infoPanel.daysSuffix(recommendedDays)}</span>
        </div>
      {/if}

      {#if officialUrl}
        <OfficialLinkButton href={officialUrl.url} label={t.current.infoPanel.officialSource} fullWidth />
      {/if}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
