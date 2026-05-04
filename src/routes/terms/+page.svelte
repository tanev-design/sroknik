<script lang="ts">
  import PolicyLayout from '$lib/components/legal/PolicyLayout.svelte';
  import { t } from '$lib/copy/i18n.svelte';

  const sections = $derived(t.current.terms.sections);
</script>

<svelte:head>
  <title>{t.current.seo.termsTitle}</title>
  <meta name="description" content={t.current.seo.termsDescription} />
  <meta property="og:title" content={t.current.seo.termsTitle} />
  <meta property="og:description" content={t.current.seo.termsDescription} />
</svelte:head>

<PolicyLayout
  title={t.current.terms.pageTitle}
  subtitle={t.current.terms.pageSubtitle}
  version={t.current.terms.version}
  lastUpdated={t.current.terms.lastUpdated}
  {sections}
/>
