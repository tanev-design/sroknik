<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import PrivacyNotice from '$lib/components/shared/PrivacyNotice.svelte';
  import { t } from '$lib/copy/i18n.svelte';
</script>

<TopBar title={t.current.legal.privacyTitle} subtitle={t.current.privacy.headline} />

<div class="grid gap-4 lg:grid-cols-2">
  <section
    class="accent-panel rounded-[var(--radius-card)] p-5 lg:col-span-2"
  >
    <div class="panel-content">
      <PrivacyNotice />
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <p class="eyebrow mb-2">{t.current.howItWorks.onDeviceTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.onDeviceBody}</p>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <p class="eyebrow mb-2">{t.current.howItWorks.controlTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.controlBody}</p>
  </section>
</div>
