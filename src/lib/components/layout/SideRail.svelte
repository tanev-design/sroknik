<script lang="ts">
  import { page } from '$app/stores';
  import Logo from '$lib/components/brand/Logo.svelte';
  import AuthAction from '$lib/components/auth/AuthAction.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import {
    CalendarDays,
    Car,
    Cookie,
    FileText,
    Gauge,
    HelpCircle,
    LifeBuoy,
    Scale,
    Settings,
    ShieldCheck,
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
      | 'privacy'
      | 'terms'
      | 'cookies'
      | 'support'
      | 'legal';
    icon: ComponentType;
    match: (p: string) => boolean;
  };

  const groups: {
    labelKey: 'mainGroup' | 'profileGroup' | 'infoGroup';
    items: Item[];
  }[] = [
    {
      labelKey: 'mainGroup',
      items: [
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
      ]
    },
    {
      labelKey: 'profileGroup',
      items: [
        {
          href: '/settings',
          labelKey: 'settings',
          icon: Settings,
          match: (p) => p.startsWith('/settings')
        },
        { href: '/plus', labelKey: 'plus', icon: Sparkles, match: (p) => p.startsWith('/plus') }
      ]
    },
    {
      labelKey: 'infoGroup',
      items: [
        {
          href: '/how-it-works',
          labelKey: 'howItWorks',
          icon: HelpCircle,
          match: (p) => p.startsWith('/how-it-works')
        },
        {
          href: '/privacy',
          labelKey: 'privacy',
          icon: ShieldCheck,
          match: (p) => p.startsWith('/privacy')
        },
        {
          href: '/terms',
          labelKey: 'terms',
          icon: Scale,
          match: (p) => p.startsWith('/terms')
        },
        {
          href: '/cookies',
          labelKey: 'cookies',
          icon: Cookie,
          match: (p) => p.startsWith('/cookies')
        },
        {
          href: '/support',
          labelKey: 'support',
          icon: LifeBuoy,
          match: (p) => p.startsWith('/support')
        },
        {
          href: '/legal',
          labelKey: 'legal',
          icon: Scale,
          match: (p) => p.startsWith('/legal')
        }
      ]
    }
  ];
</script>

<aside
  aria-label={t.current.appName}
  class="glass-card hidden md:sticky md:top-3 md:flex md:h-[calc(var(--app-height,100svh)-1.5rem)] md:w-[88px] md:shrink-0 md:flex-col md:gap-5 md:overflow-y-auto md:rounded-[24px] md:px-3 md:py-5 lg:w-[276px] lg:px-5 lg:py-6"
>
  <a
    href="/welcome"
    class="panel-content -m-1 flex justify-center rounded-[14px] p-1 transition-colors hover:bg-surface/60 lg:justify-start"
    aria-label={t.current.nav.welcome}
  >
    <span class="lg:hidden"><Logo compact /></span>
    <span class="hidden lg:block"><Logo /></span>
  </a>

  <div class="panel-content">
    <AuthAction variant="rail" />
  </div>

  <nav class="panel-content flex flex-col gap-5">
    {#each groups as group (group.labelKey)}
      <div>
        <p class="mb-2 hidden px-3 text-[11px] font-semibold uppercase tracking-wide text-muted lg:block">
          {t.current.nav[group.labelKey]}
        </p>
        <div class="flex flex-col gap-1">
          {#each group.items as item (item.href)}
            {@const active = item.match($page.url.pathname)}
            {@const Icon = item.icon}
            <a
              href={item.href}
              aria-current={active ? 'page' : undefined}
              aria-label={t.current.nav[item.labelKey]}
              title={t.current.nav[item.labelKey]}
              class="relative flex h-11 min-h-[44px] items-center justify-center gap-3 rounded-[var(--radius-control)] px-3 text-sm transition-[transform,opacity,background-color,border-color,color] duration-100 active:scale-[0.98] active:opacity-90 lg:justify-start
              {active ? 'border border-[var(--color-accent-border)] bg-accent text-white shadow-[0_14px_36px_color-mix(in_srgb,var(--color-accent)_28%,transparent)]' : 'text-text hover:bg-surface'}"
            >
              <Icon size={18} aria-hidden="true" strokeWidth={1.8} />
              <span class="hidden truncate lg:inline">{t.current.nav[item.labelKey]}</span>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </nav>
</aside>
