// Core domain types for Срокник.
// All user-visible strings stay out of this file — see $lib/copy/bg.ts and en.ts.

export type Relation = 'me' | 'partner' | 'child' | 'parent' | 'other';

export type DeadlineCategory =
  | 'vignette'
  | 'civil-liability'
  | 'technical-inspection'
  | 'drivers-license'
  | 'id-card'
  | 'passport'
  | 'electricity-bill'
  | 'water-bill'
  | 'internet-phone'
  | 'local-tax'
  | 'custom';

export type DeadlineStatus = 'active' | 'done' | 'archived';
export type Urgency = 'overdue' | 'today' | 'soon' | 'later';
export type Plan = 'free' | 'plus';
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'bg' | 'en';

export interface Person {
  id: string;
  name: string;
  relation: Relation;
  createdAt: string;
  updatedAt: string;
}

export interface Car {
  id: string;
  ownerPersonId: string;
  nickname: string;
  plateNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentSet {
  id: string;
  personId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deadline {
  id: string;
  title: string;
  category: DeadlineCategory;
  /** ISO date string, YYYY-MM-DD — interpreted in Europe/Sofia. */
  dueDate: string;
  /** Days before dueDate for each reminder offset. */
  reminderOffsets: number[];
  status: DeadlineStatus;
  linkedPersonId?: string;
  linkedCarId?: string;
  linkedDocumentSetId?: string;
  /** Optional provider id for utility / tax categories (e.g. 'evn', 'sofia'). */
  providerId?: string;
  notes?: string;
  officialUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  locale: 'bg-BG';
  language: Language;
  theme: Theme;
  plan: Plan;
  privacyMode: true;
  onboardingDone: boolean;
  /** True once a valid Срокник Plus license has been activated on this device. */
  plusActivated?: boolean;
  /** Unix ms of the most recent successful activation on this device. */
  plusActivatedAt?: number | null;
  /** Last 4 chars of the active license key, shown in settings. */
  plusLicenseKeyHint?: string | null;
  /** User preference for browser notifications being enabled (separate from OS permission). */
  browserNotificationsEnabled?: boolean;
}

export interface ExportSchema {
  version: 1;
  exportedAt: string;
  people: Person[];
  cars: Car[];
  documentSets: DocumentSet[];
  deadlines: Deadline[];
}

export interface Provider {
  id: string;
  labelBg: string;
  labelEn: string;
  /** Optional region / city tag, shown next to the label when picking. */
  regionBg?: string;
  regionEn?: string;
  /** General website. */
  websiteUrl: string;
  /** Direct deep link for login/pay/account, if available. */
  paymentUrl?: string;
}

export interface CategoryDefinition {
  id: DeadlineCategory;
  labelBg: string;
  labelEn: string;
  descriptionBg: string;
  descriptionEn: string;
  defaultReminderOffsets: number[];
  /** Lucide icon name. Resolved at render time. */
  icon: string;
  /** Universal info link (e.g. a regulator or central portal). */
  officialLinkLabel?: string;
  officialLinkUrl?: string;
  /** Universal payment / e-service link, when there is exactly one. */
  paymentLinkLabel?: string;
  paymentLinkUrl?: string;
  /** Optional list of providers. When present, the user picks one in Add flow. */
  providers?: Provider[];
}
