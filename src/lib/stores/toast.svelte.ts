// Toast queue. Components push messages, ToastContainer renders them.

export type ToastVariant = 'default' | 'success' | 'danger';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  /** ms before auto-dismiss; 0 = sticky. */
  duration: number;
}

let nextId = 1;

class ToastStore {
  items = $state<Toast[]>([]);

  push(message: string, opts: { variant?: ToastVariant; duration?: number } = {}) {
    const id = nextId++;
    const toast: Toast = {
      id,
      message,
      variant: opts.variant ?? 'default',
      duration: opts.duration ?? 3000
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
  danger: (msg: string) => toastStore.push(msg, { variant: 'danger', duration: 5000 })
};
