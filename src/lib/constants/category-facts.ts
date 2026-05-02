import type { DeadlineCategory } from '$lib/types';

export interface FeeRow {
  serviceKey: 'standard' | 'fast' | 'express' | 'regular';
  durationKey: 'days30' | 'days3' | 'hours8' | 'standardOnly';
  euro: number;
  bgn: number;
}

export interface FineRange {
  euroMin: number;
  euroMax: number;
  bgnMin: number;
  bgnMax: number;
}

export interface CategoryFactsBg {
  /** Category id this fact set belongs to. */
  id: DeadlineCategory;
  /** Validity description, free Bulgarian text. */
  validityBg?: string;
  validityEn?: string;
  /** Optional one-line important note. */
  noteBg?: string;
  noteEn?: string;
  /** Fee rows shown in the info panel and in How-it-works fee tables. */
  fees?: FeeRow[];
  /** Range used for "глоба при просрочие" line. */
  fine?: FineRange;
  /** Required documents list (BG and EN parallel). */
  requiredDocsBg?: string[];
  requiredDocsEn?: string[];
  /** Whether to render a fee table in the info panel. Utilities show a soft note instead. */
  hasOfficialFees: boolean;
}

// All numeric values converted at the fixed rate 1 EUR = 1.95583 BGN.
// Verify against official MVR / egov.bg / rta.bg / bgtoll.bg pages and bump
// DATA_LAST_VERIFIED in data-version.ts whenever values change.

export const CATEGORY_FACTS: Record<DeadlineCategory, CategoryFactsBg> = {
  'id-card': {
    id: 'id-card',
    validityBg:
      '4 г. (14–18 г. възраст) · 10 г. (18–58 г.) · безсрочна (58+). Подмяна в 30-дневен срок след изтичане.',
    validityEn:
      '4 yrs (ages 14–18) · 10 yrs (18–58) · indefinite (58+). Renew within 30 days after expiry.',
    fees: [
      { serviceKey: 'standard', durationKey: 'days30', euro: 9.2, bgn: 18 },
      { serviceKey: 'fast', durationKey: 'days3', euro: 18.92, bgn: 37 },
      { serviceKey: 'express', durationKey: 'hours8', euro: 28.12, bgn: 55 }
    ],
    fine: { euroMin: 10.23, euroMax: 76.69, bgnMin: 20, bgnMax: 150 },
    requiredDocsBg: [
      'предишна лична карта (ако има)',
      'документ за платена такса',
      'удостоверение за раждане (само за първа карта)'
    ],
    requiredDocsEn: [
      'previous ID card (if any)',
      'proof of payment',
      'birth certificate (only for first ID)'
    ],
    hasOfficialFees: true
  },

  passport: {
    id: 'passport',
    validityBg: '5 г. (стандартен) · 1 г. (временен).',
    validityEn: '5 yrs (standard) · 1 yr (temporary).',
    noteBg:
      'Много авиолинии изискват паспорт с валидност ≥6 месеца от датата на връщане.',
    noteEn:
      'Many airlines require a passport with ≥6 months of validity from the return date.',
    fees: [
      { serviceKey: 'standard', durationKey: 'days30', euro: 20.45, bgn: 40 },
      { serviceKey: 'fast', durationKey: 'days3', euro: 40.9, bgn: 80 },
      { serviceKey: 'express', durationKey: 'hours8', euro: 61.36, bgn: 120 }
    ],
    fine: { euroMin: 10.23, euroMax: 76.69, bgnMin: 20, bgnMax: 150 },
    hasOfficialFees: true
  },

  'drivers-license': {
    id: 'drivers-license',
    validityBg:
      '10 г. (кат. AM, A, B, BE) · 5 г. (кат. C, CE, D, DE — професионални). Задължителен медицински преглед при подмяна.',
    validityEn:
      '10 yrs (cat. AM, A, B, BE) · 5 yrs (cat. C, CE, D, DE — professional). Medical check required at renewal.',
    noteBg:
      'Може да се поднови до 1 г. преди изтичане и до 1 г. след изтичане без санкция.',
    noteEn:
      'Can be renewed up to 1 year before expiry and up to 1 year after expiry without penalty.',
    fees: [
      { serviceKey: 'regular', durationKey: 'standardOnly', euro: 14.83, bgn: 29 },
      { serviceKey: 'fast', durationKey: 'days3', euro: 25.57, bgn: 50 }
    ],
    fine: { euroMin: 5.11, euroMax: 102.26, bgnMin: 10, bgnMax: 200 },
    hasOfficialFees: true
  },

  'technical-inspection': {
    id: 'technical-inspection',
    validityBg:
      'Нови коли: след 4 г., после 2 г., 1 г., после всяка година. След 10 г. — два пъти годишно.',
    validityEn:
      'New cars: after 4 yrs, then 2 yrs, 1 yr, then every year. After 10 yrs — twice a year.',
    noteBg:
      'Носи: талон, гражданска отговорност, лична карта. При неуспешен преглед: 1 повторна проверка в рамките на 20 дни — безплатна.',
    noteEn:
      'Bring: vehicle registration, civil liability policy, ID card. On failed inspection: 1 re-check within 20 days is free.',
    fine: { euroMin: 25.57, euroMax: 51.13, bgnMin: 50, bgnMax: 100 },
    hasOfficialFees: false
  },

  'civil-liability': {
    id: 'civil-liability',
    validityBg:
      'Задължителна за всеки регистриран автомобил. Цената варира спрямо стойността на автомобила и водача — пазаруването на оферти е задължително.',
    validityEn:
      'Mandatory for every registered vehicle. Price varies by vehicle value and driver — comparing offers is essential.',
    fine: { euroMin: 127.82, euroMax: 255.65, bgnMin: 250, bgnMax: 500 },
    hasOfficialFees: false
  },

  vignette: {
    id: 'vignette',
    validityBg:
      'Годишна, тримесечна, месечна, седмична или уикенд. Само електронна от 2019 г. Проверка на валидност: bgtoll.bg.',
    validityEn:
      'Annual, quarterly, monthly, weekly or weekend. Electronic-only since 2019. Check validity at bgtoll.bg.',
    fine: { euroMin: 153.39, euroMax: 153.39, bgnMin: 300, bgnMax: 300 },
    hasOfficialFees: false
  },

  'electricity-bill': { id: 'electricity-bill', hasOfficialFees: false },
  'water-bill': { id: 'water-bill', hasOfficialFees: false },
  'internet-phone': { id: 'internet-phone', hasOfficialFees: false },
  'local-tax': {
    id: 'local-tax',
    validityBg:
      'Плаща се на две вноски годишно (до 30 юни и до 31 октомври). Размерът зависи от общината и типа имот/превозно средство.',
    validityEn:
      'Paid in two installments per year (by 30 June and by 31 October). Amount depends on the municipality and property/vehicle type.',
    hasOfficialFees: false
  },
  custom: { id: 'custom', hasOfficialFees: false }
};

export function getCategoryFacts(id: DeadlineCategory): CategoryFactsBg {
  return CATEGORY_FACTS[id];
}
