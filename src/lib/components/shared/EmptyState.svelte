<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    Archive,
    CalendarDays,
    Car,
    CheckCircle2,
    FileText,
    User
  } from 'lucide-svelte';

  type Variant = 'deadline' | 'document' | 'car' | 'person' | 'archive' | 'check';

  interface Props {
    title: string;
    subtitle?: string;
    illustration?: Variant;
    action?: Snippet;
  }
  let { title, subtitle, illustration = 'deadline', action }: Props = $props();

  const icons = {
    deadline: CalendarDays,
    document: FileText,
    car: Car,
    person: User,
    archive: Archive,
    check: CheckCircle2
  };

  const Icon = $derived(icons[illustration]);
</script>

<div class="accent-panel flex min-h-[360px] flex-col items-center justify-center gap-3 rounded-[22px] px-6 py-14 text-center md:py-20">
  <div class="panel-content flex flex-col items-center gap-3">
    <div class="grid h-20 w-20 place-items-center rounded-[22px] border border-dashed border-[var(--color-accent-border)] bg-surface/50 text-accent/70">
      <Icon size={32} aria-hidden="true" strokeWidth={1.5} />
    </div>
    <p class="mt-2 text-[20px] font-semibold text-text">{title}</p>
    {#if subtitle}
      <p class="max-w-sm text-sm text-muted">{subtitle}</p>
    {/if}
    {#if action}
      <div class="mt-3">
        {@render action()}
      </div>
    {/if}
  </div>
</div>
