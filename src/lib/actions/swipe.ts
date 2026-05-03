// Use-action that attaches left / right swipe gestures to an element.
// Mobile-first: ignores scroll-like vertical drags, translates X as the
// finger moves, fades slightly, snaps back on release and fires callbacks
// past the threshold. Pointer events are used so it also covers mouse on
// touch-emulated browsers.

export interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** Minimum horizontal displacement, in px, for a swipe to register. */
  threshold?: number;
  /** If true, the action is disabled (listeners detached, no transform). */
  disabled?: boolean;
}

export function swipe(node: HTMLElement, opts: SwipeOptions) {
  let options: SwipeOptions = opts;
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let locked: 'h' | 'v' | null = null;
  let pointerId: number | null = null;

  const HINT_MAX = 120;

  function clamp(dx: number): number {
    return Math.max(-HINT_MAX, Math.min(HINT_MAX, dx));
  }

  function reset(animated: boolean): void {
    node.style.transition = animated ? 'transform 200ms ease, opacity 200ms ease' : 'none';
    node.style.transform = 'translateX(0)';
    node.style.opacity = '1';
  }

  function onPointerDown(e: PointerEvent): void {
    if (options.disabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    tracking = true;
    locked = null;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    node.style.transition = 'none';
  }

  function onPointerMove(e: PointerEvent): void {
    if (!tracking || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (locked === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      locked = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
      if (locked === 'v') {
        // Let the page scroll; bail out cleanly.
        tracking = false;
        return;
      }
    }

    if (locked === 'h') {
      // Prevent scroll when horizontal gesture has taken over.
      if (e.cancelable) e.preventDefault();
      const x = clamp(dx);
      node.style.transform = `translateX(${x}px)`;
      node.style.opacity = String(Math.max(0.5, 1 - Math.abs(x) / (HINT_MAX * 2)));
    }
  }

  function onPointerEnd(e: PointerEvent): void {
    if (!tracking || e.pointerId !== pointerId) return;
    tracking = false;
    pointerId = null;
    if (locked !== 'h') {
      reset(true);
      return;
    }

    const dx = e.clientX - startX;
    const threshold = options.threshold ?? 60;
    reset(true);

    if (dx > threshold) options.onSwipeRight?.();
    else if (dx < -threshold) options.onSwipeLeft?.();
  }

  function onPointerCancel(): void {
    tracking = false;
    pointerId = null;
    reset(true);
  }

  node.style.touchAction = 'pan-y';
  node.addEventListener('pointerdown', onPointerDown);
  node.addEventListener('pointermove', onPointerMove, { passive: false });
  node.addEventListener('pointerup', onPointerEnd);
  node.addEventListener('pointercancel', onPointerCancel);

  return {
    update(next: SwipeOptions) {
      options = next;
    },
    destroy() {
      node.removeEventListener('pointerdown', onPointerDown);
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerup', onPointerEnd);
      node.removeEventListener('pointercancel', onPointerCancel);
    }
  };
}

/** Trigger device haptics if the browser supports it. Safe no-op otherwise. */
export function vibrate(pattern: number | number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Some Android browsers throw if called too often; ignore.
    }
  }
}
