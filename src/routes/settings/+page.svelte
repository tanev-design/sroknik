<script lang="ts">
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import PrivacyNotice from '$lib/components/shared/PrivacyNotice.svelte';
  import Signature from '$lib/components/shared/Signature.svelte';
  import AuthSheet from '$lib/components/auth/AuthSheet.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { deadlinesStore } from '$lib/stores/deadlines.svelte';
  import { buildExport, applyReplace, applyMerge, clearAllUserData } from '$lib/db/backup';
  import { validateImportSchema } from '$lib/logic/import-schema';
  import { buildICS } from '$lib/logic/reminder';
  import { downloadBlob, readFileAsText } from '$lib/utils/download';
  import { toast } from '$lib/stores/toast.svelte';
  import { t } from '$lib/copy/i18n.svelte';
  import type { ExportSchema, Language, Theme } from '$lib/types';
  import { ChevronRight } from 'lucide-svelte';

  let importing = $state<{
    data: ExportSchema | null;
    error: string | null;
  }>({ data: null, error: null });

  let deleteConfirm = $state('');
  let deleteMode = $state(false);
  let authOpen = $state(false);
  let notifyPermission = $state<NotificationPermission | 'unsupported'>(
    typeof Notification === 'undefined' ? 'unsupported' : Notification.permission
  );
  let fileInput: HTMLInputElement;

  function setTheme(t: Theme) {
    settingsStore.update({ theme: t });
  }

  function setLanguage(language: Language) {
    settingsStore.update({ language });
  }

  async function exportJSON() {
    const data = await buildExport();
    const today = new Date().toISOString().slice(0, 10);
    downloadBlob(
      `sroknik-backup-${today}.json`,
      JSON.stringify(data, null, 2),
      'application/json'
    );
    toast.success(t.current.toast.exportedJSON);
  }

  async function exportAllICS() {
    const data = await buildExport();
    if (!data.deadlines.length) return;
    const ics = buildICS(data.deadlines);
    const today = new Date().toISOString().slice(0, 10);
    downloadBlob(`sroknik-all-${today}.ics`, ics, 'text/calendar');
    toast.success(t.current.toast.exportedICS);
  }

  async function onImportFile(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      const parsed: unknown = JSON.parse(text);
      const r = validateImportSchema(parsed);
      if (r.ok) {
        importing = { data: r.data, error: null };
      } else {
        importing = { data: null, error: t.current.settings.importInvalid };
      }
    } catch {
      importing = { data: null, error: t.current.errors.importFailed };
    }
  }

  async function importReplace() {
    if (!importing.data) return;
    await applyReplace(importing.data);
    importing = { data: null, error: null };
    toast.success(t.current.toast.imported);
  }

  async function importMerge() {
    if (!importing.data) return;
    await applyMerge(importing.data);
    importing = { data: null, error: null };
    toast.success(t.current.toast.imported);
  }

  async function confirmDeleteAll() {
    if (deleteConfirm !== t.current.settings.deleteAllConfirmWord) return;
    await clearAllUserData();
    deleteConfirm = '';
    deleteMode = false;
    toast.success(t.current.settings.deletedAll);
  }

  async function requestNotifications() {
    if (typeof Notification === 'undefined') return;
    const result = await Notification.requestPermission();
    notifyPermission = result;
  }
</script>

<TopBar title={t.current.settings.title} />

<div class="grid gap-6 xl:grid-cols-2">
  <section class="glass-card rounded-[var(--radius-card)] p-5 xl:col-span-2">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.settings.account}
    </h2>
    <div class="flex flex-col items-start gap-3 rounded-[var(--radius-card)] border border-border bg-surface/70 p-4 md:p-5">
      {#if authStore.loading}
        <p class="text-sm text-muted">...</p>
      {:else if authStore.user}
        <p class="text-sm text-text">
          {t.current.settings.signedInAs}
          <span class="font-medium">{authStore.user.email}</span>
        </p>
        <Button variant="secondary" onclick={() => authStore.signOut()}>
          {t.current.settings.signOut}
        </Button>
      {:else}
        <p class="text-sm leading-6 text-text-soft">{t.current.settings.accountIntro}</p>
        <Button variant="primary" onclick={() => (authOpen = true)}>
          {t.current.settings.signIn}
        </Button>
      {/if}
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.settings.theme}
    </h2>
    <div class="flex gap-2">
      <Button
        variant={settingsStore.current.theme === 'light' ? 'primary' : 'secondary'}
        onclick={() => setTheme('light')}
      >
        {t.current.settings.themeLight}
      </Button>
      <Button
        variant={settingsStore.current.theme === 'dark' ? 'primary' : 'secondary'}
        onclick={() => setTheme('dark')}
      >
        {t.current.settings.themeDark}
      </Button>
      <Button
        variant={settingsStore.current.theme === 'system' ? 'primary' : 'secondary'}
        onclick={() => setTheme('system')}
      >
        {t.current.settings.themeSystem}
      </Button>
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.settings.sections.language}
    </h2>
    <div class="flex gap-2">
      <Button
        variant={settingsStore.current.language === 'bg' ? 'primary' : 'secondary'}
        onclick={() => setLanguage('bg')}
      >
        {t.current.settings.languageBg}
      </Button>
      <Button
        variant={settingsStore.current.language === 'en' ? 'primary' : 'secondary'}
        onclick={() => setLanguage('en')}
      >
        {t.current.settings.languageEn}
      </Button>
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5 xl:col-span-2">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.settings.sections.privacy}
    </h2>
    <div class="rounded-[var(--radius-card)] border border-border bg-surface/70 p-4 md:p-5">
      <PrivacyNotice />
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.settings.sections.reminders}
    </h2>
    <div
      class="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface/70 p-4 md:p-5"
    >
      {#if notifyPermission === 'unsupported'}
        <p class="text-sm text-muted">{t.current.deadline.calendarHint}</p>
      {:else if notifyPermission === 'granted'}
        <p class="text-sm text-text">{t.current.settings.notificationsEnabled}</p>
      {:else if notifyPermission === 'denied'}
        <p class="text-sm text-[var(--color-danger)]">{t.current.settings.notificationsDenied}</p>
      {:else}
        <p class="text-sm text-muted">{t.current.settings.notificationsHint}</p>
        <div>
          <Button variant="secondary" onclick={requestNotifications}>
            {t.current.settings.notificationsEnable}
          </Button>
        </div>
      {/if}
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.settings.sections.data}
    </h2>
    <div
      class="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface/70 p-4 md:p-5"
    >
      <div class="flex flex-wrap gap-2">
        <Button variant="secondary" onclick={exportJSON}>{t.current.settings.export}</Button>
        <Button
          variant="secondary"
          onclick={exportAllICS}
          disabled={deadlinesStore.all.length === 0}
        >
          {t.current.settings.exportICS}
        </Button>
        <Button variant="secondary" onclick={() => fileInput?.click()}>
          {t.current.settings.import}
        </Button>
        <input
          bind:this={fileInput}
          type="file"
          accept="application/json,.json"
          class="hidden"
          onchange={onImportFile}
        />
      </div>

      {#if importing.error}
        <p class="text-sm text-[var(--color-danger)]">{importing.error}</p>
      {/if}

      {#if importing.data}
        <div
          class="flex flex-col gap-3 rounded-[var(--radius-control)] border border-border bg-bg/70 p-3"
        >
          <p class="text-sm text-text">
            {t.current.settings.importPreview(
              importing.data.people.length,
              importing.data.cars.length,
              importing.data.documentSets.length,
              importing.data.deadlines.length
            )}
          </p>
          <div class="flex flex-wrap gap-2">
            <Button onclick={importMerge}>{t.current.settings.importMerge}</Button>
            <Button variant="secondary" onclick={importReplace}>
              {t.current.settings.importReplace}
            </Button>
            <Button
              variant="ghost"
              onclick={() => (importing = { data: null, error: null })}
            >
              {t.current.actions.cancel}
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <section class="glass-card rounded-[var(--radius-card)] p-5 xl:col-span-2">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
      {t.current.settings.deleteAll}
    </h2>
    <div
      class="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[#eecccc] bg-[var(--color-danger-light)]/40 p-4 md:p-5"
    >
      <p class="text-sm text-text">{t.current.settings.deleteAllWarning}</p>
      {#if !deleteMode}
        <div>
          <Button variant="danger" onclick={() => (deleteMode = true)}>
            {t.current.settings.deleteAll}
          </Button>
        </div>
      {:else}
        <label class="block">
          <span class="mb-1.5 block text-sm text-muted">
            {t.current.settings.deleteAllConfirmHint}
          </span>
          <input
            type="text"
            bind:value={deleteConfirm}
            class="h-11 w-full rounded-[var(--radius-control)] border border-[#eecccc] bg-surface px-3 text-sm uppercase tracking-wider"
          />
        </label>
        <div class="flex gap-2">
          <Button
            variant="danger"
            disabled={deleteConfirm !== t.current.settings.deleteAllConfirmWord}
            onclick={confirmDeleteAll}
          >
            {t.current.actions.confirm}
          </Button>
          <Button
            variant="ghost"
            onclick={() => {
              deleteMode = false;
              deleteConfirm = '';
            }}
          >
            {t.current.actions.cancel}
          </Button>
        </div>
      {/if}
    </div>
  </section>

  <section class="xl:col-span-2">
    <ul class="flex flex-col gap-2">
      <li>
        <a
          href="/welcome"
          class="glass-card flex min-h-[44px] items-center justify-between rounded-[var(--radius-control)] px-4 py-3 text-sm text-text hover:border-[var(--color-border-strong)]"
        >
          <span>{t.current.nav.welcome}</span>
          <ChevronRight size={16} class="text-muted" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="/plus"
          class="glass-card flex min-h-[44px] items-center justify-between rounded-[var(--radius-control)] px-4 py-3 text-sm text-text hover:border-[var(--color-border-strong)]"
        >
          <span>{t.current.settings.plusLink}</span>
          <ChevronRight size={16} class="text-muted" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="/how-it-works"
          class="glass-card flex min-h-[44px] items-center justify-between rounded-[var(--radius-control)] px-4 py-3 text-sm text-text hover:border-[var(--color-border-strong)]"
        >
          <span>{t.current.settings.howItWorks}</span>
          <ChevronRight size={16} class="text-muted" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="/legal"
          class="glass-card flex min-h-[44px] items-center justify-between rounded-[var(--radius-control)] px-4 py-3 text-sm text-text hover:border-[var(--color-border-strong)]"
        >
          <span>{t.current.nav.legal}</span>
          <ChevronRight size={16} class="text-muted" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="/cars"
          class="glass-card flex min-h-[44px] items-center justify-between rounded-[var(--radius-control)] px-4 py-3 text-sm text-text hover:border-[var(--color-border-strong)]"
        >
          <span>{t.current.nav.cars}</span>
          <ChevronRight size={16} class="text-muted" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </section>

  <div class="xl:col-span-2">
    <Signature />
  </div>
</div>

<AuthSheet open={authOpen} onOpenChange={(v) => (authOpen = v)} />
