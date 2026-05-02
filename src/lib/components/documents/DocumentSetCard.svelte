<script lang="ts">
  import type { DocumentSet, Deadline, Person } from '$lib/types';
  import { t } from '$lib/copy/i18n.svelte';
  import { getCategory } from '$lib/constants/categories';

  interface Props {
    set: DocumentSet;
    owner?: Person;
    linkedDeadlines: Deadline[];
  }
  let { set, owner, linkedDeadlines }: Props = $props();
</script>

<article
  class="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)] md:p-5"
>
  <header class="flex items-start justify-between gap-2">
    <div class="min-w-0">
      <p class="truncate text-base font-medium text-text">{set.title}</p>
      {#if owner}
        <p class="text-xs text-muted">{owner.name}</p>
      {/if}
    </div>
    <span class="shrink-0 text-xs text-muted">
      {t.current.documents.linkedCount(linkedDeadlines.length)}
    </span>
  </header>

  {#if linkedDeadlines.length}
    <ul class="flex flex-wrap gap-1.5">
      {#each linkedDeadlines as d (d.id)}
        <li
          class="rounded-full border border-border bg-accent-light/40 px-2.5 py-0.5 text-xs text-accent"
        >
          {t.language === 'en' ? getCategory(d.category).labelEn : getCategory(d.category).labelBg}
        </li>
      {/each}
    </ul>
  {/if}
</article>
