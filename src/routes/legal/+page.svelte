<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { Cookie, FileCheck2, Scale, ShieldCheck } from 'lucide-svelte';
</script>

<TopBar title={t.current.legal.title} subtitle={t.current.legal.subtitle} />

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <a
    href="/privacy"
    class="glass-card rounded-[var(--radius-card)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
  >
    <ShieldCheck size={20} class="text-accent" aria-hidden="true" />
    <h2 class="mt-4 text-lg font-semibold text-text">{t.current.legal.privacyTitle}</h2>
    <p class="mt-2 text-sm leading-6 text-text-soft">{t.current.legal.privacyBody}</p>
  </a>

  <a
    href="/cookies"
    class="glass-card rounded-[var(--radius-card)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
  >
    <Cookie size={20} class="text-accent" aria-hidden="true" />
    <h2 class="mt-4 text-lg font-semibold text-text">{t.current.legal.cookiesTitle}</h2>
    <p class="mt-2 text-sm leading-6 text-text-soft">{t.current.legal.cookiesBody}</p>
  </a>

  <a
    href="/terms"
    class="glass-card rounded-[var(--radius-card)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
  >
    <Scale size={20} class="text-accent" aria-hidden="true" />
    <h2 class="mt-4 text-lg font-semibold text-text">{t.current.legal.termsTitle}</h2>
    <p class="mt-2 text-sm leading-6 text-text-soft">{t.current.legal.termsBody}</p>
  </a>

  <article
    class="accent-panel rounded-[var(--radius-card)] p-5"
  >
    <div class="panel-content">
      <FileCheck2 size={20} class="text-accent" aria-hidden="true" />
      <h2 class="mt-4 text-lg font-semibold text-text">{t.current.legal.gdprTitle}</h2>
      <p class="mt-2 text-sm leading-6 text-text-soft">{t.current.legal.gdprBody}</p>
    </div>
  </article>
</div>
