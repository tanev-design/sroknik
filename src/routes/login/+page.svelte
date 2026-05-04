<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import AuthForm from '$lib/components/auth/AuthForm.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { sanitizeAuthRedirect } from '$lib/auth-redirect';
  import { t } from '$lib/copy/i18n.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { ShieldCheck, User } from 'lucide-svelte';

  const nextPath = $derived(
    sanitizeAuthRedirect($page.url.searchParams.get('next'), '/settings')
  );

  async function continueAsGuest() {
    await goto(nextPath === '/settings' ? '/' : nextPath);
  }

  async function signedIn() {
    await goto(nextPath);
  }
</script>

<svelte:head>
  <title>{t.current.loginPage.metaTitle}</title>
  <meta name="description" content={t.current.loginPage.metaDescription} />
  <meta property="og:title" content={t.current.loginPage.metaTitle} />
  <meta property="og:description" content={t.current.loginPage.metaDescription} />
</svelte:head>

<TopBar title={t.current.loginPage.title} subtitle={t.current.loginPage.subtitle} />

<div class="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
  <section class="accent-panel rounded-[24px] p-5 md:p-7">
    <div class="panel-content">
      <p class="eyebrow mb-3">{t.current.loginPage.eyebrow}</p>
      <h1 class="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.12] text-text">
        {t.current.loginPage.heading}
      </h1>
      <p class="mt-4 text-sm leading-6 text-text-soft md:text-base md:leading-7">
        {t.current.loginPage.body}
      </p>
      <div class="mt-6 grid gap-3">
        {#each t.current.loginPage.points as point (point)}
          <div class="flex items-start gap-3 rounded-[var(--radius-control)] border border-[var(--color-accent-border)] bg-surface/60 p-3 text-sm text-text-soft">
            <ShieldCheck size={17} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <span>{point}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5 md:p-6">
    {#if authStore.user}
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-accent-light text-accent">
            <User size={18} aria-hidden="true" />
          </span>
          <div>
            <p class="font-semibold text-text">{t.current.loginPage.signedInTitle}</p>
            <p class="text-sm text-muted">{authStore.user.email}</p>
          </div>
        </div>
        <Button onclick={signedIn} fullWidth>{t.current.loginPage.continueCta}</Button>
      </div>
    {:else}
      <AuthForm
        embedded
        redirectTo={nextPath}
        onGuest={continueAsGuest}
        onSuccess={signedIn}
      />
    {/if}
  </section>
</div>
