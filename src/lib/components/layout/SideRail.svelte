<script lang="ts">
  import { page } from '$app/stores';
  import Logo from '$lib/components/brand/Logo.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import {
    CalendarDays,
    Car,
    FileText,
    Gauge,
    HelpCircle,
    Scale,
    Settings,
    Sparkles
  } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  type Item = {
    href: string;
    labelKey:
      | 'today'
      | 'deadlines'
      | 'documents'
      | 'cars'
      | 'settings'
      | 'plus'
      | 'howItWorks'
      | 'legal';
    icon: ComponentType;
    match: (p: string) => boolean;
  };

  const primary: Item[] = [
    { href: '/', labelKey: 'today', icon: Gauge, match: (p) => p === '/' },
    {
      href: '/deadlines',
      labelKey: 'deadlines',
      icon: CalendarDays,
      match: (p) => p.startsWith('/deadlines')
    },
    {
      href: '/documents',
      labelKey: 'documents',
      icon: FileText,
      match: (p) => p.startsWith('/documents')
    },
    { href: '/cars', labelKey: 'cars', icon: Car, match: (p) => p.startsWith('/cars') }
  ];

  const secondary: Item[] = [
    {
      href: '/settings',
      labelKey: 'settings',
      icon: Settings,
      match: (p) => p.startsWith('/settings')
    },
    {
      href: '/how-it-works',
      labelKey: 'howItWorks',
      icon: HelpCircle,
      match: (p) => p.startsWith('/how-it-works')
    },
    {
      href: '/legal',
      labelKey: 'legal',
      icon: Scale,
      match: (p) =>
        p.startsWith('/legal') ||
        p.startsWith('/privacy') ||
        p.startsWith('/cookies') ||
        p.startsWith('/terms')
    },
    { href: '/plus', labelKey: 'plus', icon: Sparkles, match: (p) => p.startsWith('/plus') }
  ];
</script>

<aside
  aria-label={t.current.appName}
  class="glass-card hidden md:sticky md:top-3 md:flex md:h-[calc(100svh-1.5rem)] md:w-[264px] md:shrink-0 md:flex-col md:gap-7 md:rounded-[24px] md:px-5 md:py-6"
>
  <div class="panel-content">
    <Logo />
  </div>

  <nav class="panel-content flex flex-col gap-1">
    {#each primary as item (item.href)}
      {@const active = item.match($page.url.pathname)}
      {@const Icon = item.icon}
      <a
        href={item.href}
        aria-current={active ? 'page' : undefined}
        class="relative flex h-12 items-center gap-3 rounded-[var(--radius-control)] px-3 text-sm transition-colors
        {active ? 'border border-[var(--color-accent-border)] bg-accent text-white shadow-[0_14px_36px_color-mix(in_srgb,var(--color-accent)_28%,transparent)]' : 'text-text hover:bg-surface'}"
      >
        <Icon size={17} aria-hidden="true" strokeWidth={1.8} />
        <span>{t.current.nav[item.labelKey]}</span>
      </a>
    {/each}
  </nav>

  <div class="panel-content rounded-[var(--radius-card)] border border-[var(--color-accent-border)] bg-accent-light/50 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
    <p class="text-xs font-semibold uppercase tracking-wide text-accent">
      {t.current.trust.cardTitle}
    </p>
    <p class="mt-2 text-[13px] leading-5 text-text-soft">{t.current.trust.cardBody}</p>
  </div>

  <div class="panel-content mt-auto flex flex-col gap-1 border-t border-border pt-5">
    {#each secondary as item (item.href)}
      {@const active = item.match($page.url.pathname)}
      {@const Icon = item.icon}
      <a
        href={item.href}
        aria-current={active ? 'page' : undefined}
        class="flex h-9 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-[13px] transition-colors
        {active ? 'font-medium text-text' : 'text-muted hover:text-text'}"
      >
        <Icon size={15} aria-hidden="true" strokeWidth={1.8} />
        {t.current.nav[item.labelKey]}
      </a>
    {/each}
  </div>
</aside>
