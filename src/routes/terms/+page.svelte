<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { t } from '$lib/copy/i18n.svelte';
</script>

<TopBar title={t.current.legal.termsTitle} subtitle={t.current.legal.subtitle} />

<div class="grid gap-4 lg:grid-cols-2">
  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <p class="eyebrow mb-2">{t.current.legal.termsTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.legal.termsBody}</p>
  </section>

  <section
    class="accent-panel rounded-[var(--radius-card)] p-5"
  >
    <div class="panel-content">
      <p class="eyebrow mb-2">{t.current.legal.gdprTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.legal.gdprBody}</p>
    </div>
  </section>
</div>
