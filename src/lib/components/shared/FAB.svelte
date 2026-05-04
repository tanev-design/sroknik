<script lang="ts">
  // Floating Action Button with optional long-press quick-add menu.
  //
  // - Short tap → onClick (opens the full AddDeadlineSheet).
  // - Long press (≥400ms) → reveals the top 5 categories as a vertical
  //   radial menu. Selecting one calls onQuickPick(categoryId) and the
  //   parent is expected to open the sheet with that category preselected.
  //
  // Kept behind an optional prop so legacy call sites without the quick-add
  // wiring (e.g. older pages) continue to work with short-tap only.

  import Plus from 'lucide-svelte/icons/plus';
  import { CATEGORIES } from '$lib/constants/categories';
  import { getCategoryIcon } from '$lib/components/icons/category-icons';
  import type { DeadlineCategory } from '$lib/types';
  import { t } from '$lib/copy/i18n.svelte';
  import { vibrate } from '$lib/actions/swipe';

  interface Props {
    label: string;
    onClick: () => void;
    /** When provided, enables long-press quick-add radial menu. */
    onQuickPick?: (id: DeadlineCategory) => void;
    /** Long-press threshold in ms. */
    longPressMs?: number;
  }

  let { label, onClick, onQuickPick, longPressMs = 400 }: Props = $props();

  const quickCategories = $derived.by(() => {
    // Pick the top 5 most generally useful categories for quick-add.
    const ids: DeadlineCategory[] = [
      'vignette',
      'civil-liability',
      'technical-inspection',
      'id-card',
      'custom'
    ];
    return ids
      .map((id) => CATEGORIES.find((c) => c.id === id))
      .filter((c): c is (typeof CATEGORIES)[number] => !!c);
  });

  let showMenu = $state(false);
  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let didLongPress = $state(false);

  function onPointerDown(): void {
    if (!onQuickPick) return;
    didLongPress = false;
    longPressTimer = setTimeout(() => {
      didLongPress = true;
      showMenu = true;
      vibrate(30);
    }, longPressMs);
  }

  function clearTimer(): void {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }

  function onPointerUp(): void {
    if (!onQuickPick) return;
    clearTimer();
    if (!didLongPress) onClick();
  }

  function onPointerCancel(): void {
    clearTimer();
    didLongPress = false;
  }

  function pickCategory(id: DeadlineCategory): void {
    showMenu = false;
    onQuickPick?.(id);
  }

  function closeMenu(): void {
    showMenu = false;
  }
</script>

{#if onQuickPick}
  <button
    type="button"
    onpointerdown={onPointerDown}
    onpointerup={onPointerUp}
    onpointercancel={onPointerCancel}
    onpointerleave={onPointerCancel}
    aria-label={label}
    aria-haspopup="menu"
    aria-expanded={showMenu}
    class="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-4 z-20 inline-flex h-14 min-h-[44px] w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(30,92,58,0.25)] transition-transform hover:scale-[1.03] focus-visible:outline-accent md:bottom-8 md:right-8"
  >
    <Plus size={22} aria-hidden="true" strokeWidth={2} />
  </button>
{:else}
  <button
    type="button"
    onclick={onClick}
    aria-label={label}
    class="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-4 z-20 inline-flex h-14 min-h-[44px] w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(30,92,58,0.25)] transition-transform hover:scale-[1.03] focus-visible:outline-accent md:bottom-8 md:right-8"
  >
    <Plus size={22} aria-hidden="true" strokeWidth={2} />
  </button>
{/if}

{#if showMenu && onQuickPick}
  <button
    type="button"
    aria-label={t.current.actions.close}
    class="fixed inset-0 z-[45] bg-[rgba(26,25,23,0.25)]"
    onclick={closeMenu}
  ></button>
  <div
    role="menu"
    aria-label={t.current.settingsV2.quickAddLabel}
    class="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+9rem)] right-4 z-50 flex flex-col-reverse items-end gap-2 md:bottom-[6.5rem] md:right-8"
  >
    {#each quickCategories as cat, i (cat.id)}
      {@const Icon = getCategoryIcon(cat.icon)}
      {@const label = t.language === 'en' ? cat.labelEn : cat.labelBg}
      <button
        role="menuitem"
        type="button"
        onclick={() => pickCategory(cat.id)}
        style={`animation-delay: ${i * 40}ms;`}
        class="pointer-events-auto inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border bg-surface px-3 py-2 text-sm text-text shadow-[var(--shadow-card)] transition-transform hover:border-[var(--color-border-strong)] active:scale-[0.98]"
      >
        {#if Icon}
          <Icon size={16} class="text-accent" aria-hidden="true" strokeWidth={1.75} />
        {/if}
        <span>{label}</span>
      </button>
    {/each}
  </div>
{/if}
