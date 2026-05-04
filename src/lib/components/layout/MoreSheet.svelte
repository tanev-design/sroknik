<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { t } from '$lib/copy/i18n.svelte';
  import {
    Cookie,
    HelpCircle,
    LifeBuoy,
    Scale,
    Settings,
    ShieldCheck,
    Sparkles,
    X
  } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  interface Props {
    open: boolean;
    onOpenChange: (v: boolean) => void;
  }

  let { open = $bindable(), onOpenChange }: Props = $props();

  type Item = {
    href: string;
    labelKey:
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
    labelKey: 'profileGroup' | 'infoGroup';
    items: Item[];
  }[] = [
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
        { href: '/terms', labelKey: 'terms', icon: Scale, match: (p) => p.startsWith('/terms') },
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
        { href: '/legal', labelKey: 'legal', icon: Scale, match: (p) => p.startsWith('/legal') }
      ]
    }
  ];

  function close() {
    open = false;
    onOpenChange(false);
  }

  // Close the sheet whenever navigation completes (covers link taps, back/forward, programmatic).
  afterNavigate(() => {
    if (open) close();
  });
</script>

<Dialog.Root bind:open onOpenChange={(v: boolean) => onOpenChange(v)}>
  <Dialog.Portal>
    <Dialog.Overlay
      class="sheet-overlay fixed inset-0 z-40 bg-[rgba(26,25,23,0.45)] backdrop-blur-[2px]"
    />
    <Dialog.Content
      class="sheet-content fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88svh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-[20px] border border-border bg-bg shadow-[var(--shadow-sheet)] md:hidden"
    >
      <div
        class="flex items-center justify-between border-b border-border bg-surface px-4 py-3.5"
      >
        <Dialog.Title class="text-[15px] font-medium text-text">
          {t.current.nav.more}
        </Dialog.Title>
        <Dialog.Close
          class="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:bg-bg"
          aria-label={t.current.actions.close}
        >
          <X size={18} aria-hidden="true" />
        </Dialog.Close>
      </div>

      <nav
        aria-label={t.current.nav.more}
        class="flex flex-col gap-5 overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-4"
      >
        {#each groups as group (group.labelKey)}
          <div>
            <p class="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              {t.current.nav[group.labelKey]}
            </p>
            <ul class="flex flex-col gap-1">
              {#each group.items as item (item.href)}
                {@const active = item.match($page.url.pathname)}
                {@const Icon = item.icon}
                <li>
                  <a
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    class="flex min-h-[48px] items-center gap-3 rounded-[var(--radius-control)] px-3 text-sm transition-[transform,opacity,background-color,border-color,color] duration-100 active:scale-[0.98] active:opacity-90
                    {active
                      ? 'border border-[var(--color-accent-border)] bg-accent text-white'
                      : 'text-text hover:bg-surface'}"
                    onclick={close}
                  >
                    <Icon size={18} aria-hidden="true" strokeWidth={1.8} />
                    <span class="truncate">{t.current.nav[item.labelKey]}</span>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </nav>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
