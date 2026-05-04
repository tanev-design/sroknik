<script lang="ts">
  import type { Snippet } from 'svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { t } from '$lib/copy/i18n.svelte';

  export type PolicySection = {
    id: string;
    title: string;
    body: string | readonly string[];
    accent?: boolean;
  };

  interface Props {
    title: string;
    subtitle: string;
    version: string;
    lastUpdated: string;
    sections: readonly PolicySection[];
    children?: Snippet;
  }

  let { title, subtitle, version, lastUpdated, sections, children }: Props = $props();

  function paragraphs(body: PolicySection['body']): readonly string[] {
    return typeof body === 'string' ? [body] : body;
  }
</script>

<div class="mx-auto max-w-6xl">
  <TopBar {title} {subtitle} />

  <div class="mb-6 flex flex-wrap items-center gap-2 md:mb-8">
    <span class="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted">
      {t.current.legal.versionLabel} {version}
    </span>
    <span class="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted">
      {t.current.legal.lastUpdatedLabel} {lastUpdated}
    </span>
  </div>

  <div class="grid gap-5 lg:grid-cols-[260px_1fr] lg:items-start">
    <aside class="lg:sticky lg:top-4">
      <details class="glass-card rounded-[var(--radius-card)] p-4 lg:hidden">
        <summary class="min-h-[44px] cursor-pointer list-none text-sm font-semibold text-text">
          {t.current.legal.contentsTitle}
        </summary>
        <nav class="mt-2 flex flex-col gap-1" aria-label={t.current.legal.contentsTitle}>
          {#each sections as section (section.id)}
            <a class="rounded-[var(--radius-control)] px-3 py-2 text-sm text-muted hover:bg-surface hover:text-text" href={`#${section.id}`}>
              {section.title}
            </a>
          {/each}
        </nav>
      </details>

      <nav class="glass-card hidden rounded-[var(--radius-card)] p-4 lg:flex lg:flex-col lg:gap-1" aria-label={t.current.legal.contentsTitle}>
        <p class="eyebrow mb-2 px-3">{t.current.legal.contentsTitle}</p>
        {#each sections as section (section.id)}
          <a class="rounded-[var(--radius-control)] px-3 py-2 text-sm text-muted hover:bg-surface hover:text-text" href={`#${section.id}`}>
            {section.title}
          </a>
        {/each}
      </nav>
    </aside>

    <div class="flex flex-col gap-4">
      {#each sections as section (section.id)}
        <section
          id={section.id}
          class="{section.accent ? 'accent-panel' : 'glass-card'} scroll-mt-24 rounded-[var(--radius-card)] p-5 md:p-6"
        >
          <div class="panel-content">
            <h2 class="text-[clamp(22px,3vw,28px)] font-semibold leading-[1.25] text-text">
              {section.title}
            </h2>
            <div class="mt-3 flex flex-col gap-3">
              {#each paragraphs(section.body) as paragraph (paragraph)}
                <p class="text-sm leading-6 text-text-soft md:text-base md:leading-[1.65]">
                  {paragraph}
                </p>
              {/each}
            </div>
          </div>
        </section>
      {/each}

      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>
