<script lang="ts">
  import PolicyLayout from '$lib/components/legal/PolicyLayout.svelte';
  import CookieSettings from '$lib/components/shared/CookieSettings.svelte';
  import { t } from '$lib/copy/i18n.svelte';

  const sections = $derived(t.current.cookies.sections);
</script>

<svelte:head>
  <title>{t.current.seo.cookiesTitle}</title>
  <meta name="description" content={t.current.seo.cookiesDescription} />
  <meta property="og:title" content={t.current.seo.cookiesTitle} />
  <meta property="og:description" content={t.current.seo.cookiesDescription} />
</svelte:head>

<PolicyLayout
  title={t.current.cookies.title}
  subtitle={t.current.cookies.subtitle}
  version={t.current.cookies.version}
  lastUpdated={t.current.cookies.lastUpdated}
  {sections}
>
  <section id="settings" class="glass-card scroll-mt-24 rounded-[var(--radius-card)] p-5 md:p-6">
    <p class="eyebrow mb-3">{t.current.cookies.banner.reopenSettings}</p>
    <CookieSettings />
  </section>
</PolicyLayout>
