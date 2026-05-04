<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/copy/i18n.svelte';
  import { CalendarDays, Car, FileText, Gauge, MoreHorizontal } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  type Tab = {
    href: string;
    labelKey: 'today' | 'deadlines' | 'documents' | 'cars' | 'more';
    icon: ComponentType;
    match: (p: string) => boolean;
  };

  const tabs: Tab[] = [
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
    {
      href: '/cars',
      labelKey: 'cars',
      icon: Car,
      match: (p) => p.startsWith('/cars')
    },
    {
      href: '/settings',
      labelKey: 'more',
      icon: MoreHorizontal,
      match: (p) =>
        p.startsWith('/settings') ||
        p.startsWith('/plus') ||
        p.startsWith('/how-it-works') ||
        p.startsWith('/legal') ||
        p.startsWith('/privacy') ||
        p.startsWith('/cookies') ||
        p.startsWith('/terms') ||
        p.startsWith('/support') ||
        p.startsWith('/login')
    }
  ];
</script>

<nav
  aria-label={t.current.nav.today}
  class="bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur md:hidden"
>
  <ul class="mx-auto flex w-full max-w-[960px] items-stretch justify-around safe-bottom">
    {#each tabs as tab (tab.href)}
      {@const active = tab.match($page.url.pathname)}
      {@const Icon = tab.icon}
      <li class="flex-1">
        <a
          href={tab.href}
          class="relative flex h-14 min-h-[44px] w-full flex-col items-center justify-center gap-0.5 px-1 text-[11px] font-medium transition-[transform,opacity,color] duration-100 active:scale-95 active:opacity-90
          {active ? 'text-accent' : 'text-muted hover:text-text'}"
          aria-current={active ? 'page' : undefined}
        >
          <Icon size={18} aria-hidden="true" strokeWidth={1.8} />
          <span class="max-w-full truncate">{t.current.nav[tab.labelKey]}</span>
          <span
            aria-hidden="true"
            class="h-1 rounded-full transition-[width,background-color,transform] duration-200 {active ? 'w-4 bg-accent' : 'w-1 bg-transparent'}"
          ></span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  @media (max-height: 499px) {
    .bottom-nav {
      display: none;
    }
  }
</style>
