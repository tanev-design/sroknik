// Toast queue. Components push messages, ToastContainer renders them.

export type ToastVariant = 'default' | 'success' | 'danger';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  /** ms before auto-dismiss; 0 = sticky. */
  duration: number;
  /** Optional inline action (e.g. Undo). */
  action?: {
    label: string;
    /** Called when the user taps the action. Returns nothing; handler decides
     *  whether to dismiss the toast (the store does not auto-dismiss here so
     *  that async handlers can complete first). */
    onAction: () => void;
  };
}

let nextId = 1;

class ToastStore {
  items = $state<Toast[]>([]);

  push(
    message: string,
    opts: {
      variant?: ToastVariant;
      duration?: number;
      action?: Toast['action'];
    } = {}
  ) {
    const id = nextId++;
    const toast: Toast = {
      id,
      message,
      variant: opts.variant ?? 'default',
      duration: opts.duration ?? 3000,
      action: opts.action
    };
    this.items = [...this.items, toast];
    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }
    return id;
  }

  dismiss(id: number) {
    this.items = this.items.filter((t) => t.id !== id);
  }

  clear() {
    this.items = [];
  }
}

export const toastStore = new ToastStore();

// Convenience helpers
export const toast = {
  show: (msg: string) => toastStore.push(msg),
  success: (msg: string) => toastStore.push(msg, { variant: 'success' }),
  danger: (msg: string) => toastStore.push(msg, { variant: 'danger', duration: 5000 }),
  /**
   * Push a message with an Undo action. The action is given a longer window
   * by default (4s) and dismisses on interaction.
   */
  undo: (message: string, label: string, onUndo: () => void, duration = 4000): number => {
    let id = -1;
    id = toastStore.push(message, {
      duration,
      action: {
        label,
        onAction: () => {
          onUndo();
          toastStore.dismiss(id);
        }
      }
    });
    return id;
  }
};
