<script lang="ts">
  import { goto } from '$app/navigation';
  import Logo from '$lib/components/brand/Logo.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import AuthSheet from '$lib/components/auth/AuthSheet.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import {
    ArrowRight,
    CalendarCheck,
    Globe2,
    Lock,
    ShieldCheck,
    Sparkles
  } from 'lucide-svelte';

  let authOpen = $state(false);

  async function continueAsGuest() {
    await settingsStore.update({ onboardingDone: true });
    await goto('/');
  }

  async function openDashboard() {
    await settingsStore.update({ onboardingDone: true });
    await goto('/');
  }
</script>

<svelte:head>
  <title>{t.current.appName} — {t.current.welcome.heroTitle}</title>
</svelte:head>

<div class="flex flex-col gap-10 md:gap-14">
  <section class="accent-panel rounded-[26px] p-6 md:p-12">
    <div class="panel-content grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <div class="mb-6 flex items-center gap-3">
          <Logo size="lg" showTagline={false} />
        </div>
        <p class="eyebrow mb-3">{t.current.welcome.eyebrow}</p>
        <h1
          class="max-w-xl text-[34px] font-semibold leading-[1.1] tracking-tight text-text md:text-[52px]"
        >
          {t.current.welcome.heroTitle}
        </h1>
        <p class="mt-5 max-w-xl text-base leading-7 text-text-soft md:text-[17px] md:leading-8">
          {t.current.welcome.heroBody}
        </p>
        <div class="mt-7 flex flex-wrap gap-2.5">
          <Button onclick={openDashboard}>
            <CalendarCheck size={16} aria-hidden="true" />
            {t.current.welcome.primaryCta}
          </Button>
          <Button variant="secondary" onclick={() => (authOpen = true)}>
            {t.current.welcome.secondaryCta}
          </Button>
        </div>
        <button
          type="button"
          onclick={continueAsGuest}
          class="mt-4 inline-flex items-center gap-1.5 text-sm text-muted underline-offset-2 hover:text-text hover:underline"
        >
          {t.current.welcome.guestCta}
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3 md:gap-4">
        <article class="metric-card rounded-[var(--radius-card)] p-4 md:p-5">
          <span
            class="grid h-11 w-11 place-items-center rounded-full bg-accent-light text-accent"
          >
            <Lock size={20} aria-hidden="true" />
          </span>
          <p class="mt-4 text-sm font-medium text-text">{t.current.welcome.feature1Title}</p>
          <p class="mt-1.5 text-xs leading-5 text-text-soft">{t.current.welcome.feature1Body}</p>
        </article>
        <article class="metric-card rounded-[var(--radius-card)] p-4 md:p-5">
          <span
            class="grid h-11 w-11 place-items-center rounded-full bg-accent-light text-accent"
          >
            <Globe2 size={20} aria-hidden="true" />
          </span>
          <p class="mt-4 text-sm font-medium text-text">{t.current.welcome.feature2Title}</p>
          <p class="mt-1.5 text-xs leading-5 text-text-soft">{t.current.welcome.feature2Body}</p>
        </article>
        <article class="metric-card col-span-2 rounded-[var(--radius-card)] p-4 md:p-5">
          <span
            class="grid h-11 w-11 place-items-center rounded-full bg-accent-light text-accent"
          >
            <ShieldCheck size={20} aria-hidden="true" />
          </span>
          <p class="mt-4 text-sm font-medium text-text">{t.current.welcome.feature3Title}</p>
          <p class="mt-1.5 text-xs leading-5 text-text-soft">{t.current.welcome.feature3Body}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="grid gap-4 lg:grid-cols-2">
    <h2 class="text-[26px] font-semibold leading-tight tracking-tight text-text md:text-[34px] lg:col-span-2">
      {t.current.welcome.plansTitle}
    </h2>

    <article class="glass-card rounded-[var(--radius-card)] p-5 md:p-6">
      <header class="flex items-baseline justify-between">
        <p class="eyebrow">{t.current.welcome.freePlan}</p>
        <p class="text-2xl font-semibold tabular-nums text-text">
          {t.language === 'en' ? '0 BGN' : '0 лв.'}
        </p>
      </header>
      <p class="mt-3 text-sm leading-6 text-text-soft">{t.current.welcome.freePlanLine}</p>
      <Button
        variant="secondary"
        className="mt-5 w-full"
        fullWidth
        onclick={continueAsGuest}
      >
        {t.current.welcome.guestCta}
      </Button>
    </article>

    <article class="accent-panel rounded-[var(--radius-card)] p-5 md:p-6">
      <header class="panel-content flex items-center justify-between">
        <p class="eyebrow text-accent">{t.current.welcome.plusPlan}</p>
        <span
          class="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white"
        >
          {t.current.plus.comingSoonBadge}
        </span>
      </header>
      <p class="panel-content mt-3 text-sm leading-6 text-text-soft">
        {t.current.welcome.plusPlanLine}
      </p>
      <Button className="mt-5 w-full" fullWidth onclick={() => (authOpen = true)}>
        <Sparkles size={16} aria-hidden="true" />
        {t.current.welcome.secondaryCta}
      </Button>
    </article>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5 md:p-6">
    <p class="text-sm leading-6 text-text-soft">{t.current.welcome.finePrint}</p>
  </section>

  <footer
    class="mt-2 flex flex-col items-center gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:justify-between"
  >
    <p>© {new Date().getFullYear()} {t.current.appName} · sroknik.com</p>
    <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      <a href="/privacy" class="hover:text-text hover:underline underline-offset-2">
        {t.current.legal.openPrivacy}
      </a>
      <a href="/terms" class="hover:text-text hover:underline underline-offset-2">
        {t.current.legal.openTerms}
      </a>
      <a href="/cookies" class="hover:text-text hover:underline underline-offset-2">
        {t.current.legal.openCookies}
      </a>
      <a href="/legal" class="hover:text-text hover:underline underline-offset-2">
        {t.current.nav.legal}
      </a>
      <a href="/how-it-works" class="hover:text-text hover:underline underline-offset-2">
        {t.current.nav.howItWorks}
      </a>
    </nav>
  </footer>
</div>

<AuthSheet
  open={authOpen}
  onOpenChange={(v) => (authOpen = v)}
  onGuest={continueAsGuest}
/>
