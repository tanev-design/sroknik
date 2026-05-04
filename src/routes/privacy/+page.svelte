<script lang="ts">
  import PolicyLayout from '$lib/components/legal/PolicyLayout.svelte';
  import PrivacyNotice from '$lib/components/shared/PrivacyNotice.svelte';
  import { t } from '$lib/copy/i18n.svelte';

  const sections = $derived(t.current.privacy.sections);
</script>

<svelte:head>
  <title>{t.current.seo.privacyTitle}</title>
  <meta name="description" content={t.current.seo.privacyDescription} />
  <meta property="og:title" content={t.current.seo.privacyTitle} />
  <meta property="og:description" content={t.current.seo.privacyDescription} />
</svelte:head>

<PolicyLayout
  title={t.current.privacy.pageTitle}
  subtitle={t.current.privacy.pageSubtitle}
  version={t.current.privacy.version}
  lastUpdated={t.current.privacy.lastUpdated}
  {sections}
>
  <section class="accent-panel rounded-[var(--radius-card)] p-5 md:p-6">
    <div class="panel-content">
      <PrivacyNotice />
    </div>
  </section>
</PolicyLayout>
