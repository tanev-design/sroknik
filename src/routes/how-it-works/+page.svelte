<script lang="ts">
  import { goto } from '$app/navigation';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import PrivacyNotice from '$lib/components/shared/PrivacyNotice.svelte';
  import { t } from '$lib/copy/i18n.svelte';
</script>

<TopBar title={t.current.howItWorks.title} subtitle={t.current.howItWorks.headline} />

<div class="flex flex-col gap-6">
  <section
    class="rounded-[var(--radius-card)] border border-[var(--color-accent-border)] bg-accent-light/50 p-5 md:p-6"
  >
    <PrivacyNotice />
  </section>

  <section class="grid grid-cols-1 gap-3 md:grid-cols-2">
    <article class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
      <p class="eyebrow mb-2">{t.current.howItWorks.onDeviceTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.onDeviceBody}</p>
    </article>

    <article class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
      <p class="eyebrow mb-2">{t.current.howItWorks.controlTitle}</p>
      <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.controlBody}</p>
    </article>
  </section>

  <section class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
    <p class="eyebrow mb-3">{t.current.howItWorks.notCollectedTitle}</p>
    <ul class="grid grid-cols-1 gap-2 text-sm text-text-soft sm:grid-cols-2">
      {#each t.current.howItWorks.notCollected as item (item)}
        <li class="rounded-[var(--radius-control)] border border-border bg-bg px-3 py-2">
          {item}
        </li>
      {/each}
    </ul>
  </section>

  <section class="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
    <p class="eyebrow mb-2">{t.current.howItWorks.bgFirstTitle}</p>
    <p class="text-sm leading-6 text-text-soft">{t.current.howItWorks.bgFirstBody}</p>
  </section>

  <div>
    <Button onclick={() => goto('/deadlines/new')}>{t.current.howItWorks.cta}</Button>
  </div>
</div>
