// High-level deadline actions wired to the toast store.
// Each action performs a repo write and immediately surfaces an Undo toast
// that reverts the status change if the user taps Undo within the window.
//
// Kept separate from repositories so repos stay free of UI side effects.

import type { Deadline, DeadlineStatus } from '$lib/types';
import { deadlinesRepo } from '$lib/db/repositories/deadlines';
import { toast } from '$lib/stores/toast.svelte';
import { vibrate } from '$lib/actions/swipe';
import { t } from '$lib/copy/i18n.svelte';

async function changeStatusWithUndo(
  deadline: Deadline,
  next: DeadlineStatus,
  message: string
): Promise<void> {
  const previous = deadline.status;
  if (previous === next) return;

  await deadlinesRepo.setStatus(deadline.id, next);
  toast.undo(
    message,
    t.current.undo,
    () => {
      // Revert — best-effort, ignore races.
      void deadlinesRepo.setStatus(deadline.id, previous);
    }
  );
}

export async function markDeadlineComplete(deadline: Deadline): Promise<void> {
  vibrate(50);
  await changeStatusWithUndo(deadline, 'done', t.current.toast.saved);
}

export async function archiveDeadline(deadline: Deadline): Promise<void> {
  vibrate([10, 50, 10]);
  await changeStatusWithUndo(deadline, 'archived', t.current.toast.archived);
}

export async function restoreDeadline(deadline: Deadline): Promise<void> {
  await changeStatusWithUndo(deadline, 'active', t.current.toast.restored);
}
