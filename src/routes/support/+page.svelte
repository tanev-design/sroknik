<script lang="ts">
  import PolicyLayout from '$lib/components/legal/PolicyLayout.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { Mail } from 'lucide-svelte';

  const sections = $derived(t.current.support.sections);
</script>

<svelte:head>
  <title>{t.current.seo.supportTitle}</title>
  <meta name="description" content={t.current.seo.supportDescription} />
  <meta property="og:title" content={t.current.seo.supportTitle} />
  <meta property="og:description" content={t.current.seo.supportDescription} />
</svelte:head>

<PolicyLayout
  title={t.current.support.title}
  subtitle={t.current.support.subtitle}
  version={t.current.support.version}
  lastUpdated={t.current.support.lastUpdated}
  {sections}
>
  <section class="glass-card rounded-[var(--radius-card)] p-5 md:p-6">
    <p class="eyebrow mb-3">{t.current.support.formTitle}</p>
    <form
      action="mailto:support@sroknik.com"
      method="post"
      enctype="text/plain"
      class="grid gap-3"
    >
      <label class="grid gap-1.5">
        <span class="text-xs font-medium text-muted">{t.current.support.subjectLabel}</span>
        <input
          name="subject"
          class="h-11 rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-text"
          placeholder={t.current.support.subjectPlaceholder}
        />
      </label>
      <label class="grid gap-1.5">
        <span class="text-xs font-medium text-muted">{t.current.support.messageLabel}</span>
        <textarea
          name="message"
          rows="5"
          class="min-h-[132px] rounded-[var(--radius-control)] border border-border bg-surface px-3 py-2 text-sm text-text"
          placeholder={t.current.support.messagePlaceholder}
        ></textarea>
      </label>
      <Button type="submit">
        <Mail size={16} aria-hidden="true" />
        {t.current.support.sendCta}
      </Button>
    </form>
  </section>
</PolicyLayout>
