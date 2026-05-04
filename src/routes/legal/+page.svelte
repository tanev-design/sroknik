<script lang="ts">
  import PolicyLayout from '$lib/components/legal/PolicyLayout.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { Cookie, FileCheck2, LifeBuoy, Scale, ShieldCheck } from 'lucide-svelte';

  const sections = $derived(t.current.legal.sections);
  const organizationJson = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Sroknik',
      url: 'https://sroknik.com',
      email: 'support@sroknik.com'
    })
  );

  const cards = [
    { href: '/privacy', icon: ShieldCheck, title: 'privacyTitle', body: 'privacyBody' },
    { href: '/cookies', icon: Cookie, title: 'cookiesTitle', body: 'cookiesBody' },
    { href: '/terms', icon: Scale, title: 'termsTitle', body: 'termsBody' },
    { href: '/support', icon: LifeBuoy, title: 'supportTitle', body: 'supportBody' }
  ] as const;
</script>

<svelte:head>
  <title>{t.current.seo.legalTitle}</title>
  <meta name="description" content={t.current.seo.legalDescription} />
  <meta property="og:title" content={t.current.seo.legalTitle} />
  <meta property="og:description" content={t.current.seo.legalDescription} />
  <script type="application/ld+json">{organizationJson}</script>
</svelte:head>

<PolicyLayout
  title={t.current.legal.title}
  subtitle={t.current.legal.subtitle}
  version={t.current.legal.version}
  lastUpdated={t.current.legal.lastUpdated}
  {sections}
>
  <section class="grid grid-cols-1 gap-4 md:grid-cols-2">
    {#each cards as card (card.href)}
      {@const Icon = card.icon}
      <a
        href={card.href}
        class="glass-card rounded-[var(--radius-card)] p-5 transition-[transform,opacity,border-color] duration-100 hover:border-[var(--color-border-strong)] active:scale-[0.98] active:opacity-90"
      >
        <Icon size={20} class="text-accent" aria-hidden="true" />
        <h2 class="mt-4 text-lg font-semibold text-text">{t.current.legal[card.title]}</h2>
        <p class="mt-2 text-sm leading-6 text-text-soft">{t.current.legal[card.body]}</p>
      </a>
    {/each}

    <article class="accent-panel rounded-[var(--radius-card)] p-5 md:col-span-2">
      <div class="panel-content">
        <FileCheck2 size={20} class="text-accent" aria-hidden="true" />
        <h2 class="mt-4 text-lg font-semibold text-text">{t.current.legal.gdprTitle}</h2>
        <p class="mt-2 text-sm leading-6 text-text-soft">{t.current.legal.gdprBody}</p>
      </div>
    </article>
  </section>
</PolicyLayout>
