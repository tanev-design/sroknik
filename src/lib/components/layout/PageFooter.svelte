<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';

  const links = [
    { href: '/how-it-works', label: 'howItWorks' },
    { href: '/privacy', label: 'privacy' },
    { href: '/terms', label: 'terms' },
    { href: '/cookies', label: 'cookies' },
    { href: '/support', label: 'support' },
    { href: '/legal', label: 'legal' }
  ] as const;
</script>

<footer class="panel-content mt-10 border-t border-border pt-6 text-xs text-muted">
  <div class="hidden flex-wrap items-center justify-between gap-4 md:flex">
    <p>{t.current.legal.footerLocalLine}</p>
    <nav class="flex flex-wrap items-center justify-end gap-x-5 gap-y-2" aria-label={t.current.legal.footerNavLabel}>
      {#each links as link (link.href)}
        <a href={link.href} class="underline-offset-2 hover:text-text hover:underline">
          {t.current.nav[link.label]}
        </a>
      {/each}
    </nav>
  </div>
  <p class="mt-3 hidden md:block">{t.current.settings.version}: 0.1.0</p>

  <div class="mt-4 flex justify-center md:mt-6">
    <a
      href={t.current.signature.href}
      target="_blank"
      rel="noopener noreferrer"
      class="font-mono text-[11px] tracking-wide text-muted transition-colors hover:text-text-soft"
    >
      {t.current.signature.line}
    </a>
  </div>
</footer>
