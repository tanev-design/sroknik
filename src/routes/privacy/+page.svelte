<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import PrivacyNotice from '$lib/components/shared/PrivacyNotice.svelte';
  import { t } from '$lib/copy/i18n.svelte';
</script>

<TopBar title={t.current.legal.privacyTitle} subtitle={t.current.privacy.headline} />

<div class="flex flex-col gap-4">
  <section
    class="rounded-[var(--radius-card)] border border-[var(--color-accent-border)] bg-accent-light/60 p-5"
  >
    <PrivacyNotice />
  </section>

  <section class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
    <p class="eyebrow mb-2">{t.current.howItWorks.onDeviceTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.onDeviceBody}</p>
  </section>

  <section class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
    <p class="eyebrow mb-2">{t.current.howItWorks.controlTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.controlBody}</p>
  </section>
</div>
