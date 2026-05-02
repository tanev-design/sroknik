<script lang="ts">
  import Pill from '$lib/components/ui/Pill.svelte';
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    value: number[];
    onChange: (v: number[]) => void;
  }
  let { value = $bindable(), onChange }: Props = $props();

  const presets = [60, 30, 14, 7, 3, 1];

  function toggle(n: number) {
    const has = value.includes(n);
    const next = has ? value.filter((v) => v !== n) : [...value, n].sort((a, b) => b - a);
    value = next;
    onChange(next);
  }
</script>

<fieldset>
  <legend class="mb-1.5 block text-sm font-medium text-text">
    {t.current.deadline.reminderField}
  </legend>
  <p class="mb-2.5 text-xs text-muted">{t.current.deadline.reminderHelper}</p>
  <div class="flex flex-wrap gap-2">
    {#each presets as p (p)}
      {@const active = value.includes(p)}
      <Pill {active} size="sm" onclick={() => toggle(p)}>
        {#snippet children()}
          <span class="tabular-nums">{p}{t.language === 'en' ? 'd' : 'д'}</span>
        {/snippet}
      </Pill>
    {/each}
  </div>
</fieldset>
