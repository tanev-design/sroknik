# DESIGN.md — Срокник Visual System

> **Intent:** Handcrafted, premium, calm, trustworthy. Not productivity-app energetic, not SaaS-template generic, not government-portal stern.

## Visual direction

- **Calm + private** — warm off-white surfaces, ink-like text, muted accents. No hype.
- **Minimal color** — accent only for CTAs and urgency signals. Everything else sits in a quiet range of warm greys.
- **No decoration for its own sake** — no glassmorphism, no gradient hero blocks, no 3D, no mascot, no illustrations.
- **No emoji in UI.** Category meaning comes from an icon (Lucide) + a Bulgarian label.
- **Not governmental** — we feel like a well-made personal tool, not an institutional form.

## Color tokens

All tokens live in `src/app.css` inside Tailwind v4's `@theme` block and are available as `bg-*`, `text-*`, `border-*` utilities.

| Token | Hex | Role |
|-------|-----|------|
| `--color-bg` | `#F9F7F4` | Page background (warm off-white) |
| `--color-surface` | `#FFFFFF` | Cards, sheets, inputs |
| `--color-border` | `#E8E4DF` | Hairlines, subtle dividers |
| `--color-text` | `#1A1917` | Primary ink |
| `--color-muted` | `#7A736B` | Secondary text, icons |
| `--color-accent` | `#1E5C3A` | Deep forest green — primary CTA & positive |
| `--color-accent-light` | `#EBF3EE` | Accent wash backgrounds |
| `--color-danger` | `#B84040` | Overdue + destructive actions |
| `--color-danger-light` | `#F6E6E6` | Destructive confirm background |
| `--color-warning` | `#9A6B1A` | "Today" urgency indicator |
| `--color-warning-light` | `#F6ECDB` | — |

## Typography

- **Font:** IBM Plex Sans (Cyrillic + Latin subsets) loaded from Google Fonts in `app.html`.
- **Fallback:** `system-ui, sans-serif`.
- **Body:** 16px / line-height 1.6.
- **Headings:** 500–600 weight, not bold. Tracking slightly tight on `h1`.
- **Labels:** 14px medium.
- **Micro (captions / section eyebrows):** 12px, uppercase, tracking-wide, `text-muted`.

## Spacing & layout

| Token | Value | Notes |
|-------|-------|-------|
| App shell max width | 960px | centered on desktop |
| Horizontal padding | 16px mobile · 32px desktop | |
| Card padding | 16px mobile · 20px desktop | |
| Section gap | 24px (`gap-6`) | |
| Card radius | `--radius-card: 14px` | |
| Control radius | `--radius-control: 10px` | |
| Min touch target | 44px × 44px | enforced on every interactive element |
| Bottom nav height | 56px + safe-area inset | hidden ≥ 768px (`md:hidden`) |
| FAB position | `bottom-20 right-4` (mobile), `bottom-8 right-8` (desktop) | never overlaps bottom nav |

## Urgency coding

Deadlines carry a 4px colored strip on the left edge of `DeadlineCard`:

| Urgency | Strip | Relative date text | Threshold |
|---------|-------|---------------------|-----------|
| `overdue` | `--color-danger` | same red | `days < 0` |
| `today` | `--color-warning` | same amber | `days === 0` |
| `soon` | `--color-accent` | accent green | `1 ≤ days ≤ 14` |
| `later` | `--color-border` | muted grey | `days > 14` |

Relative date phrasing is Bulgarian with correct plural forms (`След 1 ден`, `След 5 дни`, `След 3 месеца`). Months are only used past ~60 days out.

## Component rules

- **`DeadlineCard`** — urgency strip + title (medium weight) + small muted category label + right-aligned relative date (colored by urgency) + absolute date beneath. Entire card is keyboard-focusable and acts as the primary "open details" affordance.
- **`BottomNav`** — 4 tabs: Днес · Срокове · Документи · Още. Mobile only. Active tab in accent; inactive in muted.
- **`TopBar`** — page title + optional subtitle + right-aligned actions slot. No hamburger.
- **`AddDeadlineSheet` / `DeadlineDetailSheet`** — Bits UI `Dialog.Root` → full-height bottom sheet on mobile, centered popover on desktop. Focus is trapped automatically. Every sheet shows `"Данните остават на устройството."` at its foot.
- **`EmptyState`** — dashed border surface, centered, title + optional subtitle + CTA slot. No illustrations.
- **`PlanLimitNotice`** — inline, non-blocking, muted accent-light background, small copy, soft `Виж Plus →` link. Never a modal.
- **`OfficialLinkButton`** — secondary button style, external-link icon, `target="_blank"` + `rel="noopener noreferrer"`.

## MVP shortcuts (not compromises to trust)

- **Date picker** — the prompt asks for a custom, non-native date picker. The MVP uses a styled `<input type="date">` because on iOS/Android it yields a predictable wheel picker that matches native expectations. A custom calendar popover is a post-MVP upgrade target — it does not affect the data model.
- **PWA icons** — shipped as SVG. Works on modern Chromium/Safari. Generate PNG variants (see `README.md`) before a public launch for broader home-screen support.

## Accessibility

- All interactive targets ≥ 44×44px.
- Focus ring: 2px `--color-accent` outline at 2px offset, radius 6px.
- Bits UI dialogs trap focus; `Dialog.Close` is always reachable.
- Icons in interactive elements carry `aria-hidden="true"`; the adjacent text label is the accessible name.
- Tap highlights removed on mobile (`-webkit-tap-highlight-color: transparent`) to avoid double feedback.

## What we deliberately avoid

- Glassmorphism, blur-heavy surfaces, neumorphism, skeuomorphism.
- Large gradient heroes, neon palettes, "AI app" glow effects.
- Modals for limit enforcement (they read as aggressive upsell).
- Hidden hamburger menus or nested settings trees.
- Lorem ipsum of any kind — onboarding and empty states are localized first.
