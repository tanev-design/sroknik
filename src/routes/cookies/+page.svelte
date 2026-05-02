<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { t } from '$lib/copy/i18n.svelte';
</script>

<TopBar title={t.current.cookies.title} subtitle={t.current.cookies.subtitle} />

<div class="flex flex-col gap-4">
  <section class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
    <p class="eyebrow mb-2">{t.current.cookies.necessaryTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.cookies.necessaryBody}</p>
  </section>

  <section class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
    <p class="eyebrow mb-2">{t.current.cookies.noOptionalTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.cookies.noOptionalBody}</p>
  </section>

  <section
    class="rounded-[var(--radius-card)] border border-[var(--color-accent-border)] bg-accent-light/60 p-5"
  >
    <p class="eyebrow mb-2">{t.current.cookies.futureTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.cookies.futureBody}</p>
  </section>
</div>
