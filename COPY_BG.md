# COPY_BG.md — Bulgarian Copy Guidelines

All user-visible Bulgarian strings live in **one place**: `src/lib/copy/bg.ts`. This file is the single source of truth. Components must never hard-code Bulgarian text.

## Tone

- **Calm, direct, short.** Think of the voice of a quiet friend who happens to be organized.
- **Second-person informal ("ти").** Consistent with how modern Bulgarian productivity apps address users.
- **No exclamation marks** in UI copy. Ever.
- **No marketing superlatives** — no "революционно", "магически", "супер", "ултра", "асистент", "автоматично се грижим".
- **No English loan-anglicisms** when a clean Bulgarian word exists ("срок" not "deadline", "напомняне" not "reminder").
- **No emoji.** Iconography carries visual meaning.
- **No long explanatory paragraphs.** If you can't say it in one line, question whether it belongs in UI.

## Preferred phrases

| Instead of | Use |
|---|---|
| "Уведомления" (stiff) | **"Напомняния"** |
| "Данните са сигурни" (vague) | **"Данните са само на това устройство."** |
| "Добавете нов срок!" | **"Добави срок"** |
| "Няма намерени резултати." | **"Няма срокове."** |
| "Безплатен план с ограничения" | **"Безплатният план включва 1 кола."** |
| "Отиди към Plus" | **"Виж Plus →"** |

## Bulgarian plural rules (implemented in `bg.ts`)

```
1 ден  · 2+ дни
1 месец · 2+ месеца
1 кола  · 2+ коли
1 човек · 2+ хора
1 срок  · 2+ срока
1 комплект · 2+ комплекта
```

The helpers `pluralDays(n)` and `pluralMonths(n)` are exported from `bg.ts` and used in `urgency.inDays(n)` / `urgency.inMonths(n)`.

## Urgency phrasing (implemented in `urgency.ts` + `bg.ts`)

| Condition | Text |
|---|---|
| `days < 0` | **Просрочено** |
| `days === 0` | **Днес** |
| `days === 1` | **Утре** |
| `2 ≤ days ≤ 60` | **След {n} дни** |
| `days > 60` | **След {n} месеца** |

## Privacy strings (always rendered verbatim)

- **Без профил.**
- **Без ЕГН.**
- **Без банкови данни.**
- **Данните са само на това устройство.**

These four lines appear at the end of the onboarding sequence and inside Settings → Поверителност.

## Plan-limit phrasing

- "Безплатният план включва 1 кола."
- "Безплатният план включва 1 човек."
- "Безплатният план включва 1 комплект документи."
- "Безплатният план включва 10 собствени срока."

Always paired with a soft inline link: **"Виж Plus →"**. Never a modal.

## Onboarding (in order)

1. "Срокник пази важните ти срокове." / "Кола, документи, сметки — на едно място."
2. "Без профил. Без ЕГН." / "Данните се пазят само на това устройство."
3. "Започни с кола, документ или сметка." / CTA: "Добави първи срок" / Skip: "По-късно"

## Delete-everything confirmation

- Warning body: *"Това ще изтрие всички срокове, коли, документи и хора от това устройство. Действието е необратимо."*
- Hint: *"Напиши ИЗТРИЙ за потвърждение."*
- Confirm word: **ИЗТРИЙ**

## Calendar hint (shown on the deadline form)

> "За сигурно напомняне добави срока и в календара."

This is deliberate — it manages expectations about browser notification reliability without sounding defeatist.

## Rules for new copy

1. If the string will be shown to the user, it goes in `bg.ts`. No exceptions.
2. Before adding a new string, check whether an existing one already covers the meaning.
3. Prefer nouns and imperatives over full sentences ("Запази", not "Запазване на промените").
4. Run every string through the tone test: *"Does a calm, competent friend say this out loud?"* If it sounds like marketing or like a government form, rewrite.
