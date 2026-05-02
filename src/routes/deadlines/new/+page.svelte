<script lang="ts">
  import { goto } from '$app/navigation';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import DeadlineForm from '$lib/components/deadline/DeadlineForm.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import { CalendarCheck2, Link2, ShieldCheck } from 'lucide-svelte';

  function onDone() {
    goto('/');
  }
</script>

<TopBar title={t.current.actions.add} />

<div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
  <div
    class="rounded-[20px] border border-border bg-surface p-4 shadow-[0_18px_60px_rgba(26,25,23,0.08)] md:p-6"
  >
    <DeadlineForm {onDone} />
  </div>

  <aside class="flex flex-col gap-3">
    <article class="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <CalendarCheck2 size={18} class="text-accent" aria-hidden="true" />
      <p class="mt-3 text-sm font-semibold text-text">{t.current.add.when}</p>
      <p class="mt-1 text-sm leading-5 text-muted">{t.current.deadline.calendarHint}</p>
    </article>
    <article class="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <Link2 size={18} class="text-accent" aria-hidden="true" />
      <p class="mt-3 text-sm font-semibold text-text">{t.current.deadline.linkField}</p>
      <p class="mt-1 text-sm leading-5 text-muted">{t.current.dashboard.quickStartBody}</p>
    </article>
    <article
      class="rounded-[var(--radius-card)] border border-[var(--color-accent-border)] bg-accent-light/60 p-4"
    >
      <ShieldCheck size={18} class="text-accent" aria-hidden="true" />
      <p class="mt-3 text-sm font-semibold text-text">{t.current.trust.cardTitle}</p>
      <p class="mt-1 text-sm leading-5 text-muted">{t.current.trust.cardBody}</p>
    </article>
  </aside>
</div>
