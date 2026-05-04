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
    privacy: 'Privacy',
    terms: 'Terms',
    cookies: 'Cookies',
    support: 'Contact',
    legal: 'Legal',
    welcome: 'Welcome',
    more: 'More',
    mainGroup: 'Main',
    profileGroup: 'Profile',
    infoGroup: 'Information'
  },

  actions: {
    add: 'Add deadline',
    addFirst: 'Add first deadline',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    saving: 'Saving…',
    cancel: 'Cancel',
    back: 'Back',
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

  todayQuickCategories: {
    title: 'Add by category',
    subtitle: 'Pick a ready-made deadline type. The form will prefill the basics.',
    action: 'Add',
    items: {
      vignette: 'Vignette',
      civilLiability: 'Insurance',
      technicalInspection: 'Inspection',
      idCard: 'ID card',
      electricityBill: 'Power',
      custom: 'Other'
    }
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
      'Optional account, no national ID number, no document uploads and no ad tracking. Your data stays in this browser on this device.',
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
    googleCalendar: 'Google Calendar',
    appleCalendar: 'Apple / Outlook',
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

  categoryGroups: {
    vehicles: 'Vehicles',
    documents: 'Documents',
    bills: 'Bills',
    other: 'Other',
    vehiclesHint: 'Vignette, insurance, inspection and driver’s license.',
    documentsHint: 'ID card, passport and personal documents.',
    billsHint: 'Power, water, internet and local taxes.',
    otherHint: 'Everything outside the ready-made categories.'
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
    noProfile: 'Account is optional.',
    noEGN: 'No national ID number.',
    noBankData: 'We never collect bank data — Free or Plus.',
    noUploads: 'No document uploads.',
    noTracking: 'No analytics, no ads, no tracking.',
    localOnly: 'Your data stays on this device.',
    noCloud: 'The free plan does not store your deadlines in the cloud.',
    youDecide: 'You choose when to export or delete your data.',
    onlyWhatNeeded: 'We do not collect data that your deadlines do not need.',
    pageTitle: 'Privacy',
    pageSubtitle: 'What Sroknik processes and which rights you have.',
    version: '1.1',
    lastUpdated: '4 May 2026',
    sections: [
      {
        id: 'who',
        title: 'Who we are',
        body: [
          'Sroknik is a local app for personal deadlines. The public contact address is support@sroknik.com.',
          'We do not publish personal team email addresses. Support and legal questions use the official address only.'
        ]
      },
      {
        id: 'data',
        title: 'What data we collect',
        body: [
          'Deadlines, cars, document sets, people and settings are stored in the browser through IndexedDB and localStorage.',
          'On the free plan this data is not sent to a Sroknik server. We do not ask for national ID numbers, scanned documents or bank details.'
        ],
        accent: true
      },
      {
        id: 'stripe',
        title: 'Stripe and Plus',
        body: [
          'Plus payments are processed by Stripe. Sroknik does not see or store your card number.',
          'For Plus we may store minimal subscription information: status, period, price and a technical activation identifier.'
        ]
      },
      {
        id: 'rights',
        title: 'GDPR rights',
        body: [
          'You have rights to access, rectification, deletion, restriction, portability and objection where those rights apply.',
          'You can complain to the Bulgarian Commission for Personal Data Protection. You can also contact us first at support@sroknik.com.'
        ]
      },
      {
        id: 'contact',
        title: 'Contact',
        body: 'For privacy and data questions: support@sroknik.com.'
      }
    ]
  },

  auth: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    continueWithoutLogin: 'Continue without login',
    optional: 'Optional',
    requiredForPlus: 'Sign in to unlock Plus',
    title: 'Sign in to Sroknik',
    subtitle: 'Sign in to unlock Plus and manage your subscription. Optional — the free plan works without an account.',
    emailField: 'Email',
    emailPlaceholder: 'you@example.com',
    passwordField: 'Password',
    passwordPlaceholder: 'At least 6 characters',
    google: 'Continue with Google',
    github: 'Continue with GitHub',
    emailMode: 'Sign in with email',
    signUpMode: 'Create account',
    switchToSignUp: 'New to Sroknik? Create an account',
    switchToSignIn: 'Have an account? Sign in',
    confirmEmailHint: 'Confirmation email sent. Check your inbox.',
    invalidCredentials: 'Wrong email or password.',
    weakPassword: 'Password is too short.',
    networkError: 'No connection. Try again.',
    or: 'or',
    unavailable: 'Optional sign-in is not configured in this build.'
  },

  onboarding: {
    step1Title: 'All important deadlines, clearly organized.',
    step1Sub: 'Cars, documents and payments, without unnecessary data.',
    step2Title: 'Account is optional.',
    step2Sub: 'The free plan works without an account. Sign in only for Plus or subscription management.',
    step3Title: 'Start with your first deadline.',
    step3Sub: 'A car, document, or bill.',
    step3Cta: 'Add first deadline',
    skip: 'Later',
    progress: (current: number, total: number): string => `${current} of ${total}`
  },

  trust: {
    cardTitle: 'Local by design',
    cardBody:
      'The free plan keeps deadlines locally. Sign-in is optional — needed for Plus and subscription management.'
  },

  welcome: {
    eyebrow: 'Sroknik',
    heroTitle: 'Sroknik keeps your important deadlines safe.',
    heroBody:
      'Vignette, third-party motor insurance, technical inspection, ID card, passport and bills. Sroknik reminds you in time. Free. No account required.',
    primaryCta: 'Open dashboard',
    secondaryCta: 'Sign in or create account',
    guestCta: 'Continue without login',
    guestNote: 'The free plan works without an account.',
    feature1Title: 'Local by default',
    feature1Body:
      'Deadlines are stored in your browser. Sign-in is optional and used for Plus and subscription management.',
    feature2Title: 'Bulgarian first',
    feature2Body:
      'Categories and links to official systems are made for Bulgaria first. English is an additional language.',
    feature3Title: 'No ads or tracking',
    feature3Body:
      'No tracking. No ads. No unnecessary notifications.',
    plansTitle: 'Two plans. A clear choice.',
    freePlan: 'Free',
    freePlanLine: 'Enough for one person, one car, up to 10 deadlines. No account.',
    plusPlan: 'Plus',
    plusPlanLine: 'More people, more cars and unlimited deadlines. Requires sign-in and a subscription.',
    finePrint:
      'Without an account you stay in guest mode — all data is local. With an account you can unlock Plus.'
  },

  cookies: {
    noticeTitle: 'No advertising cookies',
    noticeBody:
      'Sroknik only uses necessary local storage for language, settings and app functionality. There is no analytics or ad tracking.',
    accept: 'Got it',
    learnMore: 'Cookie policy',
    title: 'Cookie policy',
    subtitle: 'What is stored in the browser and why.',
    version: '1.1',
    lastUpdated: '4 May 2026',
    necessaryTitle: 'Necessary local storage',
    necessaryBody:
      'We use IndexedDB and localStorage to store deadlines, settings, language, archive actions and whether this notice has been shown. This is necessary for the app to work.',
    noOptionalTitle: 'No optional cookies',
    noOptionalBody:
      'The current version has no marketing cookies, advertising identifiers, analytics or tracking pixels.',
    futureTitle: 'If analytics are added',
    futureBody:
      'Optional cookies or similar technologies will be enabled only after a clear choice and the ability to refuse.',
    banner: {
      title: 'Cookie control',
      body:
        'Necessary local storage keeps the app working. Analytics and marketing are enabled only if you choose them.',
      acceptAll: 'Accept all',
      necessaryOnly: 'Necessary only',
      customize: 'Customize',
      save: 'Save choice',
      categoryNecessary: 'Necessary',
      categoryAnalytics: 'Analytics',
      categoryMarketing: 'Marketing',
      reopenSettings: 'Change consent'
    },
    settings: {
      title: 'Cookie settings',
      body: 'You can change your choice at any time.',
      necessaryBody: 'Required for language, settings, consent and local app functionality.',
      analyticsBody: 'Helps us understand which screens work well. Off by default.',
      marketingBody: 'Used for campaigns and measurement. Off by default.',
      locked: 'Always on',
      currentState: 'Current state',
      enabled: 'On',
      disabled: 'Off',
      notSet: 'No saved choice yet.',
      lastUpdated: 'Last updated'
    },
    sections: [
      {
        id: 'what',
        title: 'What is a cookie',
        body:
          'A cookie is a small browser record. Similar technologies such as localStorage and IndexedDB keep settings and app data.'
      },
      {
        id: 'categories',
        title: 'Categories',
        body: [
          'Necessary: language, settings, consent and local data required for the app to work.',
          'Analytics and marketing: off by default. They are enabled only after explicit consent.'
        ],
        accent: true
      },
      {
        id: 'current',
        title: 'Current state',
        body:
          'The settings below show the consent saved in this browser. You can change it at any time.'
      }
    ]
  },

  terms: {
    pageTitle: 'Terms of use',
    pageSubtitle: 'Rules for using Sroknik and Plus.',
    version: '1.1',
    lastUpdated: '4 May 2026',
    sections: [
      {
        id: 'service',
        title: 'The service',
        body: [
          'Sroknik helps you organize personal deadlines for cars, documents, bills and other tasks.',
          'The app does not replace official registries, institutions, providers or legal advice. Always verify critical dates with the official source.'
        ],
        accent: true
      },
      {
        id: 'plus',
        title: 'Plus subscription',
        body:
          'Plus costs €3 per month or €25 per year through Stripe. The plan adds higher limits and subscription management.'
      },
      {
        id: 'refunds',
        title: 'Cancellation and refunds',
        body:
          'You can cancel through Stripe. Plus remains active until the end of the paid period. For payment issues, contact support@sroknik.com.'
      },
      {
        id: 'liability',
        title: 'Liability',
        body:
          'Sroknik keeps the data you enter locally and calculates reminders from it. You are responsible for the accuracy of the deadlines you enter.'
      },
      {
        id: 'changes',
        title: 'Changes',
        body:
          'We may update these terms. The visible version and updated date show which text applies.'
      },
      {
        id: 'law',
        title: 'Applicable law',
        body: 'Bulgarian law applies to these terms.'
      }
    ]
  },

  legal: {
    title: 'Legal information',
    subtitle: 'Transparent rules for public use.',
    version: '1.1',
    lastUpdated: '4 May 2026',
    versionLabel: 'Version',
    lastUpdatedLabel: 'Updated',
    contentsTitle: 'Contents',
    footerNavLabel: 'Information pages',
    footerLocalLine: 'Data stays on the device.',
    privacyTitle: 'Privacy',
    privacyBody:
      'Sroknik is a local-first app. Deadline, car, person and document data is stored in this browser on this device and is not sent to a Sroknik server.',
    termsTitle: 'Terms of use',
    termsBody:
      'Sroknik helps you organize deadlines, but it does not replace official registries, institutions, providers or legal advice. Always verify critical dates with the official source.',
    cookiesTitle: 'Cookies',
    cookiesBody:
      'We do not use optional cookies. Necessary local storage supports app functionality, language and settings.',
    supportTitle: 'Contact',
    supportBody: 'Contact us about a problem, Plus question or legal request.',
    gdprTitle: 'GDPR approach',
    gdprBody:
      'Data minimization, clear control, export and deletion from the device.',
    openPrivacy: 'Privacy',
    openCookies: 'Cookies',
    openTerms: 'Terms',
    sections: [
      {
        id: 'imprint',
        title: 'Imprint',
        body: [
          'Operator: Sroknik.',
          'Website: sroknik.com.',
          'Public contact: support@sroknik.com.'
        ],
        accent: true
      },
      {
        id: 'version',
        title: 'Document version',
        body: 'This page is version 1.1 from 4 May 2026.'
      },
      {
        id: 'contact',
        title: 'Contact',
        body:
          'For support, privacy, terms and Plus: support@sroknik.com. Personal email addresses are not published.'
      }
    ]
  },

  support: {
    title: 'Contact',
    subtitle: 'Support, questions and feedback.',
    version: '1.0',
    lastUpdated: '4 May 2026',
    formTitle: 'Feedback',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Example: Plus issue',
    messageLabel: 'Message',
    messagePlaceholder: 'Briefly describe what happened.',
    sendCta: 'Send email',
    sections: [
      {
        id: 'email',
        title: 'Email',
        body: 'The public contact address is support@sroknik.com.'
      },
      {
        id: 'faq',
        title: 'FAQ',
        body:
          'Check the Trust page and the Plus section first. They describe local storage, limits and payments.'
      },
      {
        id: 'response',
        title: 'Response',
        body:
          'Include the screen, browser and device. That makes the issue faster to verify.',
        accent: true
      }
    ]
  },

  loginPage: {
    metaTitle: 'Sign in to Sroknik',
    metaDescription: 'Sign in to Sroknik for Plus and account management.',
    title: 'Sign in',
    subtitle: 'An account is needed for Plus and subscription management.',
    eyebrow: 'Account',
    heading: 'Sign in or create an account.',
    body:
      'The free plan works without sign-in. The account is used for Plus, subscription management and future account features.',
    points: [
      'No national ID number and no document uploads.',
      'Payments go through Stripe.',
      'You can continue without sign-in.'
    ],
    signedInTitle: 'You are signed in',
    continueCta: 'Continue'
  },

  seo: {
    appDescription:
      'Sroknik keeps important car, document and bill deadlines locally in the browser.',
    plusDescription:
      'Sroknik Plus adds more people, cars, devices and unlimited deadlines.',
    privacyTitle: 'Privacy | Sroknik',
    privacyDescription:
      'How Sroknik keeps data local, how Stripe processes Plus and which rights you have.',
    termsTitle: 'Terms | Sroknik',
    termsDescription: 'Rules for using Sroknik, Plus, cancellation and liability.',
    cookiesTitle: 'Cookies | Sroknik',
    cookiesDescription: 'Cookie categories, local storage and consent settings.',
    legalTitle: 'Legal information | Sroknik',
    legalDescription: 'Imprint, document version and public contact for Sroknik.',
    supportTitle: 'Contact | Sroknik',
    supportDescription: 'Support and feedback for Sroknik.',
    howItWorksTitle: 'How it works | Sroknik',
    howItWorksDescription:
      'How Sroknik stores deadlines locally, what it does not collect and where data comes from.'
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
    account: 'Account (optional)',
    signInGoogle: 'Sign in with Google',
    signInGitHub: 'Sign in with GitHub',
    signInEmail: 'Sign in with email',
    signIn: 'Sign in or create account',
    signOut: 'Sign out',
    accountIntro: 'Sign in to unlock Plus and subscription management. The free plan works without an account.',
    syncing: 'Checking account...',
    signedInAs: 'Signed in as',
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
    subtitle: 'More people, cars and documents. Plus unlocks every feature.',
    comingSoonBadge: 'Coming soon',
    intro:
      'Sroknik Plus unlocks the full feature set. Purchasing requires sign-in so you can manage your subscription on any device.',
    loginRequired: 'Sign in to unlock the Plus purchase.',
    paymentLockedTitle: 'Purchase available after sign-in',
    paymentLockedBody: 'Sign in with Google, GitHub, or email. Payments go through our secure payment partner.',
    upgradeCta: 'Buy Plus',
    upgradeComingSoon: 'Payments coming soon',
    notLockedBehindAccount: 'The free plan stays accessible without an account.',
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
      'Scanned documents',
      'Analytics, ads, tracking',
      'Payment data on the free plan',
      'No data without consent'
    ],
    controlTitle: 'Control',
    controlBody:
      'You can download an archive (JSON), import it on another device or delete everything with confirmation. Sroknik keeps no copy.',
    bgFirstTitle: 'Bulgarian first',
    bgFirstBody:
      'Categories, copy and links to official systems are made for Bulgaria first. English is an additional language, not the basis of the product.',
    cta: 'Add first deadline',
    pageTitle: 'How it works',
    dataFlowInput: 'You enter a date',
    dataFlowProcess: 'It’s computed in the browser',
    dataFlowStorage: 'Stored in IndexedDB on this device',
    dataFlowOutcome: 'Never leaves your device',
    dataFlow: 'Your data stays only on this device.',
    noServer: 'On the free plan there is no server. No one but you sees your deadlines.',
    openSource: 'The code is public — you can verify every line.',
    foundBug: 'Found a bug?',
    openIssue: 'Open an issue',
    dataSources: 'Deadline data sourced from:',
    dataLastVerified: 'Data last verified:',
    trustTitle: 'Why you can trust Sroknik',
    timelineTitle: (docName: string): string => `Validity — ${docName}`,
    feesTitle: (docName: string): string => `Fees — ${docName}`,
    feesColService: 'Service',
    feesColDuration: 'Duration',
    feesColPrice: 'Price',
    safeZone: 'Safe zone',
    recommendedRenewal: 'Recommended renewal window',
    penaltyZone: 'Penalty zone',
    issuedLabel: 'Issued',
    expiresLabel: 'Expires',
    moreLink: 'See how Sroknik works'
  },

  infoPanel: {
    seeDetails: 'See details',
    hideDetails: 'Hide',
    validity: 'Validity',
    fees: 'Fees',
    fineRange: 'Fine for being overdue',
    requiredDocuments: 'Required documents',
    officialSource: 'Official site',
    reminderDefault: 'Recommended reminder',
    importantNote: 'Important',
    feesVaryByProvider: 'Prices vary by provider. Save the date — Sroknik will remind you in advance.',
    serviceStandard: 'Standard',
    serviceStandardDays: '30 days',
    serviceFast: 'Fast',
    serviceFastDays: '3 days',
    serviceExpress: 'Express',
    serviceExpressHours: '8 hours',
    serviceRegular: 'Standard',
    daysSuffix: (n: number): string => `${n} ${pluralDays(n)}`
  },

  currency: {
    dualDisplayNote: 'Until 8 August 2026 prices are shown in euros and in leva.'
  },

  signature: {
    line: 'by tanev.design',
    href: 'https://tanev.design'
  },

  dbError: {
    title: 'Database is not available',
    body:
      'Sroknik uses your browser\u2019s built-in storage. Check that you are not in a private window and that the browser is not blocking local storage.'
  },

  undo: 'Undo',

  onboardingV2: {
    step1: {
      title: 'Never miss another deadline',
      body:
        'Sroknik tracks your personal deadlines \u2014 vignette, technical inspection, ID card, bills. All in one place, no sign-up.',
      cta: 'Add your first deadline'
    },
    step2: {
      title: 'Your data stays on your device',
      body:
        'Nothing is uploaded to the cloud. No national ID, no bank details, no documents. Sroknik runs entirely in your browser \u2014 even offline.',
      cta: 'Got it'
    },
    step3: {
      title: 'Set up reminders',
      body:
        'Sroknik can remind you in time \u2014 30 days, 14 days or 3 days before the deadline. You choose when.',
      cta: 'Enable notifications',
      ctaSkip: 'Later'
    }
  },

  plusV2: {
    eyebrow: 'Sroknik Plus',
    headline: 'For people with more deadlines',
    lede:
      'The free plan is enough for one person with one car. Plus is for families, people with more vehicles, or anyone tracking more than 10 deadlines.',
    subscriptionLabel: '\u20ac3 / month or \u20ac25 / year',
    oneTimeLabel: 'One-time payment \u00b7 No subscription',
    planMonthly: 'Monthly subscription \u00b7 \u20ac3',
    planYearly: 'Yearly subscription \u00b7 \u20ac25',
    planActive: 'Plus subscription',
    manageCta: 'Manage subscription',
    renewsOn: (date: string): string => `Renews on ${date}.`,
    activeUntil: (date: string): string => `Active until ${date}.`,
    pastDueNotice: 'Payment failed. Open \u201cManage subscription\u201d to update your card.',
    canceledNotice: 'Subscription canceled.',
    loadingCheckout: 'Loading checkout\u2026',
    autoActivating: 'Activating your subscription\u2026',
    autoActivateFailed: 'Could not activate automatically.',
    autoActivateFailedHint:
      'Reload this page in a moment. If the issue persists, contact support@sroknik.com and we will activate your account manually.',
    buyCta: 'Buy Sroknik Plus',
    priceEur: '\u20ac3 / mo',
    priceBgn: 'or \u20ac25 / yr',
    stripeNote:
      'Payment is processed by Stripe. We do not see your payment details. Plus activates automatically as soon as the payment succeeds.',
    haveKey: 'Already have a license key?',
    keyPlaceholder: 'SRKN-XXXX-XXXX-XXXX-XXXX',
    activating: '\u2026',
    activateCta: 'Activate',
    activeTitle: 'Sroknik Plus is active',
    activeKeyLabel: 'Key',
    activateErrors: {
      invalidFormat: 'Key must be in the format SRKN-XXXX-XXXX-XXXX-XXXX.',
      notFound: 'Key not found.',
      revoked: 'This key has been revoked.',
      inactive: 'Subscription is not active. Check Stripe or update your payment.',
      tooManyActivations: 'This key has reached its device limit (3).',
      rateLimited: 'Too many attempts. Try again in an hour.',
      networkError: 'Connection error. Check your internet connection.',
      serverError: 'Temporary server error. Try again in a moment.'
    },
    comparisonTitle: 'Plan comparison',
    colFree: 'Free',
    colPlus: 'Plus',
    rows: [
      { label: 'People / family', free: '1', plus: '6' },
      { label: 'Cars', free: '1', plus: '5' },
      { label: 'Document sets', free: '1', plus: 'Unlimited' },
      { label: 'Custom deadlines', free: '10', plus: 'Unlimited' },
      { label: 'Browser notifications', free: '\u2713', plus: '\u2713' },
      { label: 'Calendar (.ics) export', free: '\u2713', plus: '\u2713' },
      { label: 'JSON backup', free: '\u2713', plus: '\u2713' },
      { label: 'Works offline', free: '\u2713', plus: '\u2713' },
      { label: 'No ads, forever', free: '\u2713', plus: '\u2713' }
    ],
    trust: {
      dataYoursTitle: 'Your data stays yours',
      dataYoursBody: 'Nothing is uploaded to the cloud. Plus only raises the limits.',
      cancelTitle: 'Cancel anytime',
      cancelBody: 'One click in the Stripe portal — no calls, no forms.',
      noRiskTitle: 'No risk',
      noRiskBody: 'Free features stay free forever. Plus only adds on top.'
    },
    faqTitle: 'Questions',
    faq: [
      {
        q: 'What happens to my data if I don\u2019t continue?',
        a: 'Your data stays on your device and remains fully accessible. Plus only allows adding new records above the limit \u2014 existing ones are never locked.'
      },
      {
        q: 'Can I use Plus on phone and desktop?',
        a: 'Yes \u2014 your subscription works on up to 3 devices. On every new device, just open the Plus page after paying and it activates automatically.'
      },
      {
        q: 'How does activation work after payment?',
        a: 'Automatically. Stripe sends you back to the app and Plus turns on within seconds \u2014 no keys, no copy-paste.'
      },
      {
        q: 'How do I cancel?',
        a: 'From the Plus page, click \u201cManage subscription\u201d \u2014 the Stripe portal opens, and you cancel in one click. Plus stays active until the end of the period you already paid for.'
      },
      {
        q: 'What is the difference between monthly and yearly?',
        a: 'Monthly is \u20ac3 charged automatically every month. Yearly is \u20ac25 and saves \u20ac11 versus 12 monthly payments. Both unlock the exact same features.'
      },
      {
        q: 'Do you sell my data?',
        a: 'No. We store nothing beyond a hash of your email, used only to validate the subscription.'
      }
    ]
  },

  plusPremium: {
    eyebrow: 'Paid plan',
    headline: 'Plus is for more deadlines, people and devices.',
    lede:
      'The free plan covers the personal minimum. Plus unlocks family-scale capacity, more cars and unlimited records.',
    badge: 'Big upgrade',
    valueTitle: 'What you get',
    billingTitle: 'Payment and management',
    billingBody:
      'Payment runs through Stripe. You manage the subscription in the Stripe portal. We do not see your card details.',
    deviceTitle: 'Up to 3 devices',
    deviceBody: 'Activate the license on a phone, laptop and one more device.',
    limitsTitle: 'More capacity',
    limitsBody: '6 people, 5 cars, unlimited deadlines and document sets.',
    privacyTitle: 'No ads',
    privacyBody: 'Plus does not add tracking. Deadline data stays on your device.',
    comparisonTitle: 'The difference is immediate',
    checkoutTitle: 'Unlock Plus',
    includedTitle: 'Included in Plus',
    peopleMetric: 'People / family',
    carsMetric: 'Cars',
    documentSetsMetric: 'Document sets',
    unlimitedMetric: 'Unlimited',
    recordsMetric: 'Deadlines and sets',
    backupTitle: 'JSON backup'
  },

  emptyStates: {
    today: {
      title: 'Nothing for today',
      subtitle: 'All your deadlines are on time. Add new ones with the + button.'
    },
    deadlines: {
      title: 'No deadlines yet',
      subtitle: 'Add the first one \u2014 vignette, civil liability, or something of your own.',
      cta: '+ Add deadline'
    },
    cars: {
      title: 'No cars added',
      subtitle: 'Add a car to link deadlines to a specific vehicle.',
      cta: '+ Add car'
    },
    documents: {
      title: 'No document sets',
      subtitle: 'Group deadlines by person \u2014 ID card, passport, driver\u2019s licence.',
      cta: '+ Add set'
    },
    completed: {
      title: 'No completed deadlines',
      subtitle: 'Mark a deadline complete to see it here.'
    },
    archived: {
      title: 'Archive is empty',
      subtitle: 'Archived deadlines stay here without cluttering the main list.'
    }
  },

  planLimitV2: {
    cars: { hit: 'You reached the limit of 1 car.', plus: 'Plus adds up to 5 cars.' },
    people: { hit: 'You reached the limit of 1 person.', plus: 'Plus adds up to 6 profiles.' },
    deadlines: { hit: 'You reached the limit of 10 deadlines.', plus: 'Plus gives unlimited deadlines.' },
    documents: {
      hit: 'You reached the limit of 1 document set.',
      plus: 'Plus gives unlimited sets.'
    },
    ctaViewPlus: 'See Plus'
  },

  settingsV2: {
    plan: 'Plan',
    planFree: 'Free plan',
    planPlusActive: 'Sroknik Plus active',
    planUsage: (deadlines: number, cars: number): string =>
      `${deadlines}/10 deadlines \u00b7 ${cars}/1 car`,
    seePlus: 'See Plus',
    quickAddLabel: 'Quick category pick',
    calendarPickerPlaceholder: 'Pick a date',
    weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
} as const;
