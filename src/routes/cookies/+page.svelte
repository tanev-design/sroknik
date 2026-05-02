<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { t } from '$lib/copy/i18n.svelte';
</script>

<TopBar title={t.current.cookies.title} subtitle={t.current.cookies.subtitle} />

<div class="grid gap-4 lg:grid-cols-3">
  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <p class="eyebrow mb-2">{t.current.cookies.necessaryTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.cookies.necessaryBody}</p>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <p class="eyebrow mb-2">{t.current.cookies.noOptionalTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.cookies.noOptionalBody}</p>
  </section>

  <section
    class="accent-panel rounded-[var(--radius-card)] p-5"
  >
    <div class="panel-content">
      <p class="eyebrow mb-2">{t.current.cookies.futureTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.cookies.futureBody}</p>
    </div>
  </section>
</div>
