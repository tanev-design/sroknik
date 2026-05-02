// English mirror of bg.ts. Same shape, same keys.
// Translations kept short, sentence case, no exclamation marks.

import type { Copy } from './bg';

function pluralDays(n: number): string {
  return n === 1 ? 'day' : 'days';
}

function pluralMonths(n: number): string {
  return n === 1 ? 'month' : 'months';
}

function pluralDeadlines(n: number): string {
  return n === 1 ? 'deadline' : 'deadlines';
}

function pluralCars(n: number): string {
  return n === 1 ? 'car' : 'cars';
}

function pluralPeople(n: number): string {
  return n === 1 ? 'person' : 'people';
}

export const copy: Copy = {
  appName: 'Sroknik',
  tagline: 'A personal calendar for important deadlines.',
  taglineLong: 'Cars, documents and payments, organized locally.',
  todayDate: (formatted: string): string => formatted,

  nav: {
    today: 'Today',
    deadlines: 'Deadlines',
    documents: 'Documents',
    cars: 'Cars',
    settings: 'Settings',
    plus: 'Plus',
    howItWorks: 'Trust',
    legal: 'Legal',
    more: 'More'
  },

  actions: {
    add: 'Add deadline',
    addFirst: 'Add first deadline',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    saving: 'Saving…',
    cancel: 'Cancel',
    close: 'Close',
    confirm: 'Confirm',
    done: 'Done',
    archive: 'Archive',
    restore: 'Restore',
    backLater: 'Later',
    continue: 'Continue',
    open: 'Open',
    openOfficial: 'Open official site',
    payOnline: 'Pay online',
    payAt: (provider: string): string => `Pay at ${provider}`,
    show: 'Show',
    hide: 'Hide'
  },

  today: {
    next: 'Up next',
    overdue: 'Overdue',
    soon: 'Soon',
    later: 'Later',
    laterShow: (n: number): string => `${n} more ${pluralDeadlines(n)}`,
    overdueCount: (n: number): string => `${n} overdue`,
    empty: 'No active deadlines.',
    emptySub:
      'Add the first important date and Sroknik will organize it by date, category and link.'
  },

  dashboard: {
    overview: 'Overview',
    activeDeadlines: 'Active deadlines',
    urgentNow: 'Need attention',
    savedLocally: 'Local storage',
    ready: 'Ready',
    quickStart: 'Quick start',
    quickStartBody:
      'Choose a category, date and optionally a person or car. Sroknik stores only what the reminder needs.',
    trustTitle: 'Why it is trustworthy',
    trustBody:
      'No account, no national ID number, no document uploads and no ad tracking. Your data stays in this browser on this device.',
    legalTitle: 'Ready for a public website',
    legalBody:
      'Privacy, cookie and terms pages are included. We avoid fake certificates and explain exactly what the app does.',
    openTrust: 'See how it works',
    openLegal: 'Legal information'
  },

  sections: {
    urgent: 'Urgent',
    soon: 'Soon',
    later: 'Later'
  },

  urgency: {
    overdue: 'Overdue',
    today: 'Today',
    tomorrow: 'Tomorrow',
    inDays: (n: number): string => `In ${n} ${pluralDays(n)}`,
    inMonths: (n: number): string => `In ${n} ${pluralMonths(n)}`
  },

  deadline: {
    titleField: 'Title',
    titlePlaceholder: 'For example: Vignette',
    categoryField: 'Category',
    providerField: 'Provider',
    providerHelper: 'Optional — enables a direct payment link',
    providerNone: 'No provider',
    dueDateField: 'Due date',
    reminderField: 'Remind me',
    reminderHelper: 'Days before the due date',
    linkField: 'Link with',
    personLink: 'Person',
    carLink: 'Car',
    documentLink: 'Document',
    notesField: 'Note',
    notesPlaceholder: 'Optional',
    officialUrlField: 'Official link',
    officialUrlHelper: 'Optional',
    addedReminder: 'Added',
    empty: 'No active deadlines.',
    emptyAll: 'No deadlines.',
    emptyArchived: 'No archived deadlines.',
    emptyDone: 'No completed deadlines.',
    noUrgent: 'No urgent deadlines.',
    addFirst: 'Add first deadline',
    exportICS: 'Add to calendar',
    openOfficial: 'Open official site',
    stayLocalHint: 'This deadline stays on your device.',
    calendarHint: 'For a reliable reminder, also add the deadline to your calendar.',
    filterAll: 'All',
    filterActive: 'Active',
    filterDone: 'Completed',
    filterArchived: 'Archive',
    sortByDate: 'Sort by date',
    searchPlaceholder: 'Search…'
  },

  add: {
    titleNew: 'New deadline',
    titleEdit: 'Edit deadline',
    what: 'What?',
    when: 'When?',
    forWhom: 'For whom? (optional)',
    optional: 'optional'
  },

  person: {
    title: 'Person',
    nameField: 'Name',
    namePlaceholder: 'For example: John',
    relationField: 'Role',
    addPerson: 'Add person',
    relation: {
      me: 'Me',
      partner: 'Partner',
      child: 'Child',
      parent: 'Parent',
      other: 'Other'
    },
    empty: 'No people added yet.'
  },

  car: {
    title: 'Car',
    nicknameField: 'Name',
    nicknamePlaceholder: 'For example: Golf',
    plateField: 'License plate',
    plateOptional: 'optional',
    platePlaceholder: 'CB1234AB',
    ownerField: 'Owner',
    addCar: 'Add car',
    empty: 'No cars added yet.',
    linkedDeadlines: (n: number): string =>
      n === 0 ? 'No active deadlines' : `${n} active ${pluralDeadlines(n)}`
  },

  documents: {
    title: 'Documents',
    setTitleField: 'Document set name',
    setTitlePlaceholder: 'For example: Personal documents',
    personField: 'Person',
    addSet: 'Add set',
    empty: 'No documents added yet.',
    linkedCount: (n: number): string => (n === 1 ? '1 deadline' : `${n} ${pluralDeadlines(n)}`)
  },

  privacy: {
    sectionTitle: 'Privacy',
    headline: 'Less collected data means less risk.',
    noProfile: 'No account.',
    noEGN: 'No national ID number.',
    noBankData: 'No bank data.',
    noUploads: 'No document uploads.',
    noTracking: 'No analytics, no ads, no tracking.',
    localOnly: 'Your data stays on this device.',
    noCloud: 'Sroknik does not store your deadlines in the cloud.',
    youDecide: 'You choose when to export or delete your data.',
    onlyWhatNeeded: 'We do not collect data that your deadlines do not need.'
  },

  onboarding: {
    step1Title: 'All important deadlines, calmly organized.',
    step1Sub: 'Cars, documents and payments, without unnecessary data.',
    step2Title: 'No account. No national ID number.',
    step2Sub: 'No bank data. Your data stays on this device.',
    step3Title: 'Start with your first deadline.',
    step3Sub: 'A car, document, or bill.',
    step3Cta: 'Add first deadline',
    skip: 'Later',
    progress: (current: number, total: number): string => `${current} of ${total}`
  },

  trust: {
    cardTitle: 'Local by design',
    cardBody:
      'Deadlines are stored in this browser on this device. Export and deletion stay under your control.'
  },

  cookies: {
    noticeTitle: 'No advertising cookies',
    noticeBody:
      'Sroknik only uses necessary local storage for language, settings and app functionality. There is no analytics or ad tracking.',
    accept: 'Got it',
    learnMore: 'Cookie policy',
    title: 'Cookie policy',
    subtitle: 'What is stored in the browser and why.',
    necessaryTitle: 'Necessary local storage',
    necessaryBody:
      'We use IndexedDB and localStorage to store deadlines, settings, language, archive actions and whether this notice has been shown. This is necessary for the app to work.',
    noOptionalTitle: 'No optional cookies',
    noOptionalBody:
      'The current version has no marketing cookies, advertising identifiers, analytics or tracking pixels.',
    futureTitle: 'If analytics are added',
    futureBody:
      'Optional cookies or similar technologies will be enabled only after a clear choice and the ability to refuse.'
  },

  legal: {
    title: 'Legal information',
    subtitle: 'Transparent rules for public use.',
    privacyTitle: 'Privacy',
    privacyBody:
      'Sroknik is a local-first app. Deadline, car, person and document data is stored in this browser on this device and is not sent to a Sroknik server.',
    termsTitle: 'Terms of use',
    termsBody:
      'Sroknik helps you organize deadlines, but it does not replace official registries, institutions, providers or legal advice. Always verify critical dates with the official source.',
    cookiesTitle: 'Cookies',
    cookiesBody:
      'We do not use optional cookies. Necessary local storage supports app functionality, language and settings.',
    gdprTitle: 'GDPR approach',
    gdprBody:
      'Data minimization, clear control, export and deletion from the device. Before public launch, a lawyer should confirm the final texts for the website operator.',
    openPrivacy: 'Privacy',
    openCookies: 'Cookies',
    openTerms: 'Terms'
  },

  settings: {
    title: 'Settings',
    sections: {
      privacy: 'Privacy',
      reminders: 'Reminders',
      data: 'Data',
      language: 'Language',
      plus: 'Plus',
      about: 'About'
    },
    privacyRow: 'What Sroknik stores',
    privacyRowValue: 'On this device',
    deleteAll: 'Delete all data',
    deleteAllWarning:
      'This will delete all deadlines, cars, documents and people from this device. This cannot be undone.',
    deleteAllConfirmHint: 'Type DELETE to confirm.',
    deleteAllConfirmWord: 'DELETE',
    deletedAll: 'All data deleted.',
    notifications: 'Browser notifications',
    notificationsEnable: 'Enable notifications',
    notificationsEnabled: 'Enabled',
    notificationsDenied: 'Blocked by browser',
    notificationsDisabled: 'Disabled',
    notificationsHint:
      'Notifications only work while the browser is open. For reliable reminders use your calendar.',
    calendarExport: 'Calendar export (.ics)',
    export: 'Download archive (JSON)',
    exportICS: 'Download all deadlines (.ics)',
    import: 'Load archive',
    importReplace: 'Replace everything',
    importMerge: 'Merge with existing',
    importInvalid: 'This file is not a valid Sroknik archive.',
    importPreview: (people: number, cars: number, docs: number, deadlines: number): string =>
      `Found: ${deadlines} ${pluralDeadlines(deadlines)}, ${cars} ${pluralCars(cars)}, ${docs} ${docs === 1 ? 'set' : 'sets'}, ${people} ${pluralPeople(people)}.`,
    languageLabel: 'Language',
    languageBg: 'Български',
    languageEn: 'English',
    plusLink: 'Sroknik Plus',
    plusValue: 'Coming soon',
    aboutLink: 'About Sroknik',
    howItWorks: 'How it works',
    version: 'Version',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System'
  },

  plus: {
    title: 'Sroknik Plus',
    subtitle: 'More people, cars, and documents on one device.',
    comingSoonBadge: 'Coming soon',
    intro:
      'Sroknik Plus is coming soon. No date, no waitlist, no pre-payment. When it’s ready, you’ll see it here.',
    notLockedBehindAccount: 'Plus will not be locked behind an account.',
    compareFree: 'Free',
    comparePlus: 'Plus',
    featurePeople: (n: number): string => `${n} ${pluralPeople(n)}`,
    featurePeopleInf: 'More people',
    featureCars: (n: number): string => `${n} ${pluralCars(n)}`,
    featureCarsInf: 'More cars',
    featureDocuments: (n: number): string =>
      `${n} document ${n === 1 ? 'set' : 'sets'}`,
    featureDocumentsInf: 'Unlimited document sets',
    featureCustom: (n: number): string => `${n} custom ${pluralDeadlines(n)}`,
    featureCustomInf: 'Unlimited deadlines',
    featureICS: 'Calendar export',
    featureNotifications: 'Browser notifications',
    noPaymentNote: 'Plus is not for sale yet. Pricing will be announced when it’s ready.'
  },

  planLimit: {
    carReached: 'The free plan includes 1 car.',
    personReached: 'The free plan includes 1 person.',
    documentReached: 'The free plan includes 1 document set.',
    customReached: 'The free plan includes 10 custom deadlines.',
    cta: 'See Plus'
  },

  empty: {
    cars: 'No cars added yet.',
    people: 'No people added yet.',
    documents: 'No documents added yet.'
  },

  offline: {
    title: 'No internet connection.',
    subtitle: 'Sroknik works locally — open the app again when you have a connection.'
  },

  toast: {
    saved: 'Saved',
    deleted: 'Deleted',
    archived: 'Archived',
    restored: 'Restored',
    copied: 'Copied',
    exportedICS: 'Downloaded .ics file',
    exportedJSON: 'Downloaded archive',
    imported: 'Archive loaded'
  },

  errors: {
    generic: 'Something went wrong. Try again.',
    invalidDate: 'Please pick a valid date.',
    invalidTitle: 'Please enter a title.',
    importFailed: 'This file could not be loaded.'
  },

  howItWorks: {
    title: 'How Sroknik works',
    headline: 'Sroknik is designed to store only what is necessary.',
    onDeviceTitle: 'On this device',
    onDeviceBody:
      'Deadlines, cars, people and document sets are stored in your browser on this device using IndexedDB. Sroknik does not send this data to a server.',
    notCollectedTitle: 'What we don’t collect',
    notCollected: [
      'National ID number',
      'Bank data',
      'Scanned documents',
      'Email, password, account',
      'Analytics, ads, tracking'
    ],
    controlTitle: 'Control',
    controlBody:
      'You can download an archive (JSON), import it on another device or delete everything with confirmation. Sroknik keeps no copy.',
    bgFirstTitle: 'Bulgarian first',
    bgFirstBody:
      'Categories, copy and links to official systems are made for Bulgaria first. English is an additional language, not the basis of the product.',
    cta: 'Add first deadline'
  }
} as const;
