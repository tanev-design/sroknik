# PRODUCT.md — Срокник

## Тesis

Повечето хора в България не пропускат срокове заради мързел, а заради стрес и фрагментация: винетката е в един имейл, гражданската в друг, личната карта някъде в нощно шкафче, сметките в три различни сайта.

Срокник събира тези лични срокове на едно място — без профил, без ЕГН, без банкови данни — и ти напомня навреме.

## Promise to the user

> "Срокник пази важните ти срокове."

- **Ясно** — виждаш какво следва и колко време имаш.
- **Частно** — данните не излизат от устройството ти.
- **Спокойно** — приложението не вика за внимание, само когато има смисъл.

## MVP scope (what ships)

| Capability | State |
|---|---|
| Днес (spешно / скоро / по-късно) | ✅ |
| Списък със срокове + филтри (всички / активни / завършени / архивирани) | ✅ |
| Добавяне / редакция / отбелязване като завършено / архивиране / изтриване | ✅ |
| 11 категории с настройки по подразбиране (винетка, ГО, ТП, лична карта, паспорт, шофьорска, ток, вода, интернет, местен данък, друг) | ✅ |
| Коли (име + рег. номер + собственик) | ✅ (1 кола безплатно) |
| Комплекти документи, обвързани с човек | ✅ (1 комплект безплатно) |
| ICS експорт — на отделен срок и на всички | ✅ |
| JSON експорт + импорт (замени / добави) | ✅ |
| "Изтрий всички данни" с typed потвърждение | ✅ |
| Onboarding (3 стъпки, dismissible) | ✅ |
| Инсталируемо PWA + офлайн страница | ✅ |
| Браузърни известия (opt-in в Настройки) | ✅ |
| Срокник Plus страница — сравнение + "Скоро" | ✅ |

## Non-goals for the MVP

- Sync между устройства.
- Споделяне с партньор/семейство.
- Интеграции с bgtoll / mvr / ДА / ИСПД.
- Разпознаване на документи (OCR).
- Платена версия и плащания.
- Mobile app (стои като PWA до следващата фаза).

## Plan limits

| | Free | Plus (coming soon) |
|---|---|---|
| Хора | 1 | 6 |
| Коли | 1 | 5 |
| Комплекти документи | 1 | Неограничено |
| Собствени срокове | 10 | Неограничено |
| Браузърни известия | ✅ | ✅ |
| Календарен експорт | ✅ | ✅ |

Limits never block read access to existing data. They only show inline notices at the point of adding the N+1-th item.

## Post-MVP roadmap (not committed)

1. **Plus payment flow.** Pick a light-touch payment path (Stripe + minimal PII) that preserves the "no account" stance. Possibly a license-key model.
2. **Custom calendar popover.** Replace `<input type="date">` with an in-app mobile-friendly calendar to better control look + Bulgarian week starts.
3. **Device-to-device sync (end-to-end-encrypted).** Optional, opt-in. Zero-knowledge backup.
4. **Shared notebooks.** Sharing срокове with one партньор / дете.
5. **Deeper reminders.** Scheduled background notifications via a tiny Worker (only if we can keep the privacy promise).
6. **Richer content per category.** Short, Bulgarian, factual notes (e.g. what to bring to технически преглед) — static and versioned.

## Success signals

- User adds at least one срок in the first session.
- User returns within 14 days.
- User exports a backup at least once (signal of trust).
- Less than 2% of users clear all data within 7 days (signal that the product isn't noise).

## Out of scope forever (unless the business model changes)

- Serving ads.
- Selling or sharing user data.
- Dark patterns around Plus (no modal upsells, no "trial"-style dark friction).
- Requiring accounts for free tier.
