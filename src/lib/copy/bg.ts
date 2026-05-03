// Bulgarian dictionary — primary source of truth for UI copy.
// Developer comments stay in English.
// Never hardcode user-facing Bulgarian text inside components.

// --- Bulgarian plural agreement -----------------------------------------
export function pluralDays(n: number): string {
  return n === 1 ? 'ден' : 'дни';
}

export function pluralMonths(n: number): string {
  return n === 1 ? 'месец' : 'месеца';
}

export function pluralDeadlines(n: number): string {
  return n === 1 ? 'срок' : 'срока';
}

export function pluralCars(n: number): string {
  return n === 1 ? 'кола' : 'коли';
}

export function pluralPeople(n: number): string {
  return n === 1 ? 'човек' : 'хора';
}

export const copy = {
  appName: 'Срокник',
  tagline: 'Личен календар за важни срокове.',
  taglineLong: 'Коли, документи и плащания, подредени локално.',
  todayDate: (formatted: string): string => formatted,

  nav: {
    today: 'Днес',
    deadlines: 'Срокове',
    documents: 'Документи',
    cars: 'Коли',
    settings: 'Настройки',
    plus: 'Plus',
    howItWorks: 'Доверие',
    legal: 'Правна информация',
    welcome: 'Начало',
    more: 'Още'
  },

  actions: {
    add: 'Добави срок',
    addFirst: 'Добави първи срок',
    edit: 'Редактирай',
    delete: 'Изтрий',
    save: 'Запази',
    saving: 'Запазване…',
    cancel: 'Отказ',
    close: 'Затвори',
    confirm: 'Потвърди',
    done: 'Готово',
    archive: 'Архивирай',
    restore: 'Възстанови',
    backLater: 'По-късно',
    continue: 'Продължи',
    open: 'Отвори',
    openOfficial: 'Отвори официалния сайт',
    payOnline: 'Плати онлайн',
    payAt: (provider: string): string => `Плати при ${provider}`,
    show: 'Покажи',
    hide: 'Скрий'
  },

  today: {
    next: 'Следва',
    overdue: 'Просрочени',
    soon: 'Скоро',
    later: 'По-късно',
    laterShow: (n: number): string => `Още ${n} ${pluralDeadlines(n)}`,
    overdueCount: (n: number): string => `${n} ${n === 1 ? 'просрочен' : 'просрочени'}`,
    empty: 'Нямаш активни срокове.',
    emptySub: 'Добави първия важен срок и Срокник ще го подреди по дата, категория и връзка.'
  },

  dashboard: {
    overview: 'Общ преглед',
    activeDeadlines: 'Активни срокове',
    urgentNow: 'Изискват внимание',
    savedLocally: 'Локално съхранение',
    ready: 'Готово',
    quickStart: 'Бърз старт',
    quickStartBody:
      'Избери категория, дата и по желание човек или кола. Срокник пази само информацията, която ти е нужна за напомнянето.',
    trustTitle: 'Защо можеш да му имаш доверие',
    trustBody:
      'Профилът е по желание, без ЕГН, без качване на документи и без рекламно проследяване. Данните остават в браузъра на това устройство, освен ако сам не пожелаеш синхронизация.',
    legalTitle: 'Готово за публичен сайт',
    legalBody:
      'Има ясни страници за поверителност, cookies и условия. Не използваме фалшиви сертификати, а обясняваме точно какво прави приложението.',
    openTrust: 'Виж как работи',
    openLegal: 'Правна информация'
  },

  sections: {
    urgent: 'Спешно',
    soon: 'Скоро',
    later: 'По-късно'
  },

  urgency: {
    overdue: 'Просрочено',
    today: 'Днес',
    tomorrow: 'Утре',
    inDays: (n: number): string => `След ${n} ${pluralDays(n)}`,
    inMonths: (n: number): string => `След ${n} ${pluralMonths(n)}`
  },

  deadline: {
    titleField: 'Заглавие',
    titlePlaceholder: 'Например: Винетка',
    categoryField: 'Категория',
    providerField: 'Доставчик',
    providerHelper: 'По избор — позволява директна връзка към плащане',
    providerNone: 'Без доставчик',
    dueDateField: 'Срок',
    reminderField: 'Напомни ме',
    reminderHelper: 'Дни преди срока',
    linkField: 'Свържи с',
    personLink: 'Човек',
    carLink: 'Кола',
    documentLink: 'Документ',
    notesField: 'Бележка',
    notesPlaceholder: 'По избор',
    officialUrlField: 'Официален линк',
    officialUrlHelper: 'По избор',
    addedReminder: 'Добавено',
    empty: 'Няма активни срокове.',
    emptyAll: 'Няма срокове.',
    emptyArchived: 'Няма архивирани срокове.',
    emptyDone: 'Няма завършени срокове.',
    noUrgent: 'Няма спешни срокове.',
    addFirst: 'Добави първи срок',
    exportICS: 'Добави в календар',
    googleCalendar: 'Google Calendar',
    appleCalendar: 'Apple / Outlook',
    openOfficial: 'Отвори официалния сайт',
    stayLocalHint: 'Този срок не напуска устройството ти.',
    calendarHint: 'За сигурно напомняне добави срока и в календара.',
    filterAll: 'Всички',
    filterActive: 'Активни',
    filterDone: 'Завършени',
    filterArchived: 'Архив',
    sortByDate: 'Сортирай по дата',
    searchPlaceholder: 'Търси…'
  },

  add: {
    titleNew: 'Нов срок',
    titleEdit: 'Редактирай срок',
    what: 'Какво?',
    when: 'Кога?',
    forWhom: 'За кого? (по желание)',
    optional: 'по желание'
  },

  person: {
    title: 'Човек',
    nameField: 'Име',
    namePlaceholder: 'Например: Иван',
    relationField: 'Роля',
    addPerson: 'Добави човек',
    relation: {
      me: 'Аз',
      partner: 'Партньор',
      child: 'Дете',
      parent: 'Родител',
      other: 'Друг'
    },
    empty: 'Няма добавени хора.'
  },

  car: {
    title: 'Кола',
    nicknameField: 'Наименование',
    nicknamePlaceholder: 'Например: Голф',
    plateField: 'Регистрационен номер',
    plateOptional: 'незадължително',
    platePlaceholder: 'CB1234AB',
    ownerField: 'Собственик',
    addCar: 'Добави кола',
    empty: 'Няма добавени коли.',
    linkedDeadlines: (n: number): string =>
      n === 0 ? 'Няма активни срокове' : `${n} ${n === 1 ? 'активен срок' : 'активни срока'}`
  },

  documents: {
    title: 'Документи',
    setTitleField: 'Заглавие на комплекта',
    setTitlePlaceholder: 'Например: Лични документи',
    personField: 'Човек',
    addSet: 'Добави комплект',
    empty: 'Няма добавени документи.',
    linkedCount: (n: number): string => (n === 1 ? '1 срок' : `${n} ${pluralDeadlines(n)}`)
  },

  privacy: {
    sectionTitle: 'Поверителност',
    headline: 'По-малко събрани данни означава по-малък риск.',
    noProfile: 'Профилът е по желание.',
    noEGN: 'Без ЕГН.',
    noBankData: 'Без банкови данни в безплатния план.',
    noUploads: 'Без качване на документи.',
    noTracking: 'Без анализ, без реклами, без проследяване.',
    localOnly: 'Данните са само на това устройство.',
    noCloud: 'Безплатният план не съхранява сроковете ти в облак.',
    youDecide: 'Ти решаваш кога да свалиш архив и кога да изтриеш данните.',
    onlyWhatNeeded: 'Не събираме данни, които не са нужни за сроковете ти.'
  },

  auth: {
    signIn: 'Вход',
    signUp: 'Регистрация',
    signOut: 'Изход',
    continueWithoutLogin: 'Продължи без вход',
    optional: 'По желание',
    requiredForPlus: 'Влез в профил, за да отключиш Plus',
    title: 'Вход в Срокник',
    subtitle: 'Влезни, за да синхронизираш срокове или да отключиш Plus. По избор — безплатният план работи и без профил.',
    emailField: 'Имейл',
    emailPlaceholder: 'ти@example.com',
    passwordField: 'Парола',
    passwordPlaceholder: 'Поне 6 знака',
    google: 'Продължи с Google',
    github: 'Продължи с GitHub',
    emailMode: 'Влез с имейл',
    signUpMode: 'Създай профил',
    switchToSignUp: 'Нов в Срокник? Създай профил',
    switchToSignIn: 'Имаш профил? Влез',
    confirmEmailHint: 'Изпратихме ти имейл за потвърждение. Провери пощата.',
    invalidCredentials: 'Грешен имейл или парола.',
    weakPassword: 'Паролата е твърде кратка.',
    networkError: 'Няма връзка. Опитай отново.',
    or: 'или',
    unavailable: 'Опционалният вход не е настроен в това копие.'
  },

  onboarding: {
    step1Title: 'Всички важни срокове, подредени спокойно.',
    step1Sub: 'Коли, документи и плащания, без излишни данни.',
    step2Title: 'Профилът е по желание.',
    step2Sub: 'Безплатният план работи без вход. Влез само ако искаш Plus или синхронизация.',
    step3Title: 'Започни с първия срок.',
    step3Sub: 'Кола, документ или сметка.',
    step3Cta: 'Добави първи срок',
    skip: 'По-късно',
    progress: (current: number, total: number): string => `${current} от ${total}`
  },

  settings: {
    title: 'Настройки',
    sections: {
      privacy: 'Поверителност',
      reminders: 'Напомняния',
      data: 'Данни',
      language: 'Език',
      plus: 'Plus',
      about: 'За приложението'
    },
    privacyRow: 'Какво пази Срокник',
    privacyRowValue: 'На устройството',
    deleteAll: 'Изтрий всички данни',
    deleteAllWarning:
      'Това ще изтрие всички срокове, коли, документи и хора от това устройство. Действието е необратимо.',
    deleteAllConfirmHint: 'Напиши ИЗТРИЙ за потвърждение.',
    deleteAllConfirmWord: 'ИЗТРИЙ',
    deletedAll: 'Данните са изтрити.',
    account: 'Акаунт (по желание)',
    signInGoogle: 'Вход с Google',
    signInGitHub: 'Вход с GitHub',
    signInEmail: 'Вход с имейл',
    signIn: 'Влез или създай профил',
    signOut: 'Изход',
    accountIntro: 'Влезни, за да отключиш Plus и синхронизация. Безплатният план работи и без профил.',
    syncing: 'Синхронизиране с облака...',
    signedInAs: 'Вписан като',
    notifications: 'Браузърни известия',
    notificationsEnable: 'Разреши известия',
    notificationsEnabled: 'Разрешени',
    notificationsDenied: 'Блокирани от браузъра',
    notificationsDisabled: 'Изключени',
    notificationsHint:
      'Известията работят, само докато браузърът е отворен. За сигурно напомняне ползвай календара.',
    calendarExport: 'Календарен експорт (.ics)',
    export: 'Свали архив (JSON)',
    exportICS: 'Свали всички срокове (.ics)',
    import: 'Зареди архив',
    importReplace: 'Замени всичко',
    importMerge: 'Добави към съществуващите',
    importInvalid: 'Файлът не е валиден Срокник архив.',
    importPreview: (people: number, cars: number, docs: number, deadlines: number): string =>
      `Намерени: ${deadlines} ${pluralDeadlines(deadlines)}, ${cars} ${pluralCars(cars)}, ${docs} ${docs === 1 ? 'комплект' : 'комплекта'}, ${people} ${pluralPeople(people)}.`,
    languageLabel: 'Език',
    languageBg: 'Български',
    languageEn: 'English',
    plusLink: 'Срокник Plus',
    plusValue: 'Скоро',
    aboutLink: 'За Срокник',
    howItWorks: 'Как работи',
    version: 'Версия',
    theme: 'Тема',
    themeLight: 'Светла',
    themeDark: 'Тъмна',
    themeSystem: 'Системна'
  },

  trust: {
    cardTitle: 'Локално по дизайн',
    cardBody:
      'Безплатният план пази сроковете локално. Профилът е по желание — нужен е само за Plus и синхронизация.'
  },

  welcome: {
    eyebrow: 'Срокник',
    heroTitle: 'Важните ти срокове, на едно спокойно място.',
    heroBody:
      'Винетка, ГО, технически преглед, лична карта, паспорт и сметки — Срокник ти напомня навреме. Безплатно. Без задължителен профил.',
    primaryCta: 'Към таблото',
    secondaryCta: 'Влез или създай профил',
    guestCta: 'Продължи без вход',
    guestNote: 'Безплатният план работи и без профил.',
    feature1Title: 'Локално по подразбиране',
    feature1Body:
      'Сроковете се пазят в браузъра на устройството ти. Профилът е по желание и се ползва само за синхронизация и Plus.',
    feature2Title: 'Български първо',
    feature2Body:
      'Категориите и линковете към официални системи са направени за България. Английският е допълнителен език.',
    feature3Title: 'Без шум',
    feature3Body:
      'Без рекламни cookies, без проследяване, без натрапчиви известия. Срокник работи тихо.',
    plansTitle: 'Два плана. Един чист подход.',
    freePlan: 'Безплатно',
    freePlanLine: 'Достатъчно за един човек, една кола и до 10 срока. Без профил.',
    plusPlan: 'Plus',
    plusPlanLine: 'Без лимити, синхронизация, повече коли и хора. Изисква вход и абонамент.',
    finePrint:
      'Без профил си в гост режим — всички данни остават локално. С профил можеш да синхронизираш и да отключиш Plus.'
  },

  cookies: {
    noticeTitle: 'Без рекламни cookies',
    noticeBody:
      'Срокник използва само необходимо локално съхранение за език, настройки и работа на приложението. Няма аналитики и рекламно проследяване.',
    accept: 'Разбрах',
    learnMore: 'Политика за cookies',
    title: 'Политика за cookies',
    subtitle: 'Какво се пази в браузъра и защо.',
    necessaryTitle: 'Необходимо локално съхранение',
    necessaryBody:
      'Използваме IndexedDB и localStorage, за да пазим срокове, настройки, език, архивни действия и показването на това съобщение. Това е нужно, за да работи приложението.',
    noOptionalTitle: 'Без незадължителни cookies',
    noOptionalBody:
      'В текущата версия няма маркетинг cookies, рекламни идентификатори, аналитики или пиксели за проследяване.',
    futureTitle: 'Ако добавим аналитики',
    futureBody:
      'Незадължителни cookies или подобни технологии ще се включват само след ясен избор и възможност за отказ.'
  },

  legal: {
    title: 'Правна информация',
    subtitle: 'Прозрачни правила за публична употреба.',
    privacyTitle: 'Поверителност',
    privacyBody:
      'Срокник е local-first приложение. Данните за срокове, коли, хора и документи се пазят в браузъра на устройството и не се изпращат към сървър на Срокник.',
    termsTitle: 'Условия за ползване',
    termsBody:
      'Срокник помага да организираш срокове, но не замества официални регистри, институции, доставчици или правен съвет. Проверявай критичните дати и в официалния източник.',
    cookiesTitle: 'Cookies',
    cookiesBody:
      'Не използваме незадължителни cookies. Необходимото локално съхранение служи за работа на приложението, език и настройки.',
    gdprTitle: 'GDPR подход',
    gdprBody:
      'Минимизиране на данните, ясен контрол, експорт и изтриване от устройството. За публичен запуск юрист трябва да потвърди финалните текстове според оператора на сайта.',
    openPrivacy: 'Поверителност',
    openCookies: 'Cookies',
    openTerms: 'Условия'
  },

  plus: {
    title: 'Срокник Plus',
    subtitle: 'Повече хора, коли и документи. Plus отключва всички функции.',
    comingSoonBadge: 'Скоро',
    intro:
      'Срокник Plus отключва пълния набор функции. За покупка е нужен вход — така можеш да управляваш абонамента си от всяко устройство.',
    loginRequired: 'Влез в профил, за да отключиш покупка на Plus.',
    paymentLockedTitle: 'Покупката е достъпна след вход',
    paymentLockedBody: 'Влезни с Google, GitHub или имейл. Плащанията се обработват от наш сигурен платежен партньор.',
    upgradeCta: 'Купи Plus',
    upgradeComingSoon: 'Плащанията скоро',
    notLockedBehindAccount: 'Безплатният план остава достъпен без профил.',
    compareFree: 'Безплатен',
    comparePlus: 'Plus',
    featurePeople: (n: number): string => `${n} ${pluralPeople(n)}`,
    featurePeopleInf: 'Повече хора',
    featureCars: (n: number): string => `${n} ${pluralCars(n)}`,
    featureCarsInf: 'Повече коли',
    featureDocuments: (n: number): string => `${n} ${n === 1 ? 'комплект' : 'комплекта'} документи`,
    featureDocumentsInf: 'Без лимит документи',
    featureCustom: (n: number): string => `${n} собствени ${pluralDeadlines(n)}`,
    featureCustomInf: 'Без лимит срокове',
    featureICS: 'Календарен експорт',
    featureNotifications: 'Браузърни известия',
    noPaymentNote: 'Plus все още не се продава. Ще обявим цена, когато е готов.'
  },

  planLimit: {
    carReached: 'Безплатният план включва 1 кола.',
    personReached: 'Безплатният план включва 1 човек.',
    documentReached: 'Безплатният план включва 1 комплект документи.',
    customReached: 'Безплатният план включва 10 собствени срока.',
    cta: 'Виж Plus'
  },

  empty: {
    cars: 'Няма добавени коли.',
    people: 'Няма добавени хора.',
    documents: 'Няма добавени документи.'
  },

  offline: {
    title: 'Няма връзка с интернет.',
    subtitle: 'Срокник работи локално — отвори приложението отново, когато имаш връзка.'
  },

  toast: {
    saved: 'Запазено',
    deleted: 'Изтрито',
    archived: 'Архивирано',
    restored: 'Възстановено',
    copied: 'Копирано',
    exportedICS: 'Изтеглен .ics файл',
    exportedJSON: 'Изтеглен архив',
    imported: 'Архивът е зареден'
  },

  errors: {
    generic: 'Нещо се обърка. Опитай отново.',
    invalidDate: 'Моля, избери валиден срок.',
    invalidTitle: 'Моля, въведи заглавие.',
    importFailed: 'Файлът не може да бъде зареден.'
  },

  howItWorks: {
    title: 'Как работи Срокник',
    headline: 'Срокник е направен така, че да пази само нужното.',
    onDeviceTitle: 'На устройството',
    onDeviceBody:
      'Сроковете, колите, хората и комплектите документи се пазят в браузъра на това устройство чрез IndexedDB. Срокник не изпраща тези данни към сървър.',
    notCollectedTitle: 'Какво не събираме',
    notCollected: [
      'ЕГН',
      'Сканирани документи',
      'Аналитики, реклами, проследяване',
      'Платежни данни в безплатния план',
      'Никакви данни без съгласие'
    ],
    controlTitle: 'Контрол',
    controlBody:
      'Можеш да свалиш архив (JSON), да го импортираш на друго устройство или да изтриеш всичко с потвърждение. Срокник не пази копие при себе си.',
    bgFirstTitle: 'Български първо',
    bgFirstBody:
      'Категориите, текстовете и линковете към официални системи са направени първо за България. Английският е допълнителен език, не основа на продукта.',
    cta: 'Добави първи срок',
    pageTitle: 'Как работи',
    dataFlowInput: 'Въвеждаш дата',
    dataFlowProcess: 'Изчислява се в браузъра',
    dataFlowStorage: 'Пази се в IndexedDB на устройството',
    dataFlowOutcome: 'Никога не напуска устройството',
    dataFlow: 'Данните са само на това устройство.',
    noServer: 'Безплатният план не ползва наш сървър. Никой освен теб не вижда срокниците ти.',
    openSource: 'Кодът е публичен — можеш да провериш всеки ред.',
    foundBug: 'Намери грешка?',
    openIssue: 'Отвори issue',
    dataSources: 'Данните за срокове са от:',
    dataLastVerified: 'Последна проверка на данните:',
    trustTitle: 'Защо да се довериш на Срокник',
    timelineTitle: (docName: string): string => `Срок на валидност — ${docName}`,
    feesTitle: (docName: string): string => `Такси — ${docName}`,
    feesColService: 'Услуга',
    feesColDuration: 'Срок',
    feesColPrice: 'Цена',
    safeZone: 'Зона на сигурност',
    recommendedRenewal: 'Препоръчителна зона за подмяна',
    penaltyZone: 'Зона на глоба',
    issuedLabel: 'Издаване',
    expiresLabel: 'Изтича',
    moreLink: 'Виж как работи Срокник'
  },

  infoPanel: {
    seeDetails: 'Виж подробности',
    hideDetails: 'Скрий',
    validity: 'Валидност',
    fees: 'Такси',
    fineRange: 'Глоба при просрочие',
    requiredDocuments: 'Необходими документи',
    officialSource: 'Официален сайт',
    reminderDefault: 'Препоръчително напомняне',
    importantNote: 'Важно',
    feesVaryByProvider: 'Цените варират по доставчик. Запази датата — Срокник ще те напомни предварително.',
    serviceStandard: 'Обикновена',
    serviceStandardDays: '30 дни',
    serviceFast: 'Бърза',
    serviceFastDays: '3 дни',
    serviceExpress: 'Експресна',
    serviceExpressHours: '8 часа',
    serviceRegular: 'Стандарт',
    daysSuffix: (n: number): string => `${n} ${pluralDays(n)}`
  },

  currency: {
    dualDisplayNote: 'До 8 август 2026 г. цените се показват в евро и в лева.'
  },

  signature: {
    line: 'Направено с внимание от tanev.design · Пловдив',
    href: 'https://tanev.design'
  },

  dbError: {
    title: 'Базата данни не е достъпна',
    body:
      'Срокник използва вграденото хранилище на браузъра. Провери дали не си в режим инкогнито или дали браузърът не блокира локално съхранение.'
  },

  undo: 'Отмени',

  onboardingV2: {
    step1: {
      title: 'Никога повече пропуснат срок',
      body:
        'Срокник следи твоите лични срокове — винетка, технически преглед, лична карта, сметки. Всичко на едно място, без регистрация.',
      cta: 'Добави първия си срок'
    },
    step2: {
      title: 'Данните са само на твоето устройство',
      body:
        'Нищо не се качва в облака. Нито ЕГН, нито банкови данни, нито документи. Срокник работи изцяло в браузъра ти — дори без интернет.',
      cta: 'Разбрах'
    },
    step3: {
      title: 'Настрой известия',
      body:
        'Срокник може да те напомня навреме — 30 дни, 14 дни или 3 дни преди срока. Ти избираш кога.',
      cta: 'Позволи известия',
      ctaSkip: 'По-късно'
    }
  },

  plusV2: {
    eyebrow: 'Срокник Plus',
    headline: 'За хора с повече срокове',
    lede:
      'Безплатният план е достатъчен за един човек с една кола. Plus е за семейства, хора с повече превозни средства, или ако искаш да следиш повече от 10 срока.',
    subscriptionLabel: '€3 на месец или €25 на година',
    oneTimeLabel: 'Еднократно плащане · Без абонамент',
    planMonthly: 'Месечен абонамент · €3',
    planYearly: 'Годишен абонамент · €25',
    planActive: 'Plus абонамент',
    manageCta: 'Управлявай абонамента',
    renewsOn: (date: string): string => `Подновява се на ${date}.`,
    activeUntil: (date: string): string => `Активен до ${date}.`,
    pastDueNotice:
      'Плащането не премина. Отвори „Управлявай абонамента“, за да обновиш картата си.',
    canceledNotice: 'Абонаментът е прекратен.',
    loadingCheckout: 'Зарежда плащане…',
    autoActivating: 'Активираме твоя абонамент…',
    autoActivateFailed: 'Не успяхме да активираме автоматично.',
    autoActivateFailedHint:
      'Презареди страницата след малко. Ако проблемът продължи, пиши на support@sroknik.com и ще те активираме ръчно.',
    buyCta: 'Купи Срокник Plus',
    priceEur: '€3 / мес',
    priceBgn: 'или €25 / год',
    stripeNote:
      'Плащането се обработва от Stripe. Ние не виждаме данните ти за плащане. Plus се активира автоматично веднага след успешно плащане.',
    haveKey: 'Вече имаш лицензен ключ?',
    keyPlaceholder: 'SRKN-XXXX-XXXX-XXXX-XXXX',
    activating: '…',
    activateCta: 'Активирай',
    activeTitle: 'Срокник Plus е активиран',
    activeKeyLabel: 'Ключ',
    activateErrors: {
      invalidFormat: 'Ключът трябва да е във формат SRKN-XXXX-XXXX-XXXX-XXXX.',
      notFound: 'Ключът не е намерен.',
      revoked: 'Ключът е деактивиран.',
      inactive: 'Абонаментът не е активен. Провери в Stripe или поднови плащането.',
      tooManyActivations: 'Ключът е достигнал лимита на устройства (3).',
      rateLimited: 'Твърде много опити. Опитай пак след час.',
      networkError: 'Грешка при свързване. Провери интернет връзката.',
      serverError: 'Временна грешка на сървъра. Опитай пак след малко.'
    },
    comparisonTitle: 'Сравнение на плановете',
    colFree: 'Безплатен',
    colPlus: 'Plus',
    rows: [
      { label: 'Хора / семейство', free: '1', plus: '6' },
      { label: 'Коли', free: '1', plus: '5' },
      { label: 'Комплекти документи', free: '1', plus: 'Неограничено' },
      { label: 'Собствени срокове', free: '10', plus: 'Неограничено' },
      { label: 'Браузърни известия', free: '\u2713', plus: '\u2713' },
      { label: 'Календарен (.ics) експорт', free: '\u2713', plus: '\u2713' },
      { label: 'JSON резервно копие', free: '\u2713', plus: '\u2713' },
      { label: 'Работи офлайн', free: '\u2713', plus: '\u2713' },
      { label: 'Без реклами, завинаги', free: '\u2713', plus: '\u2713' }
    ],
    trust: {
      dataYoursTitle: 'Данните са твои',
      dataYoursBody: 'Нищо не се качва в облака. Plus само разширява лимитите.',
      cancelTitle: 'Отказваш по всяко време',
      cancelBody: 'Прекратяваш с един клик от Stripe — без обаждания, без формуляри.',
      noRiskTitle: 'Без рискове',
      noRiskBody: 'Безплатните функции остават безплатни завинаги. Plus само добавя.'
    },
    faqTitle: 'Въпроси',
    faq: [
      {
        q: 'Какво се случва с данните ми, ако не продължа?',
        a: 'Данните ти остават на устройството ти и са напълно достъпни. Plus само позволява добавяне на нови записи над лимита — съществуващите никога не се заключват.'
      },
      {
        q: 'Мога ли да използвам Plus на телефон и компютър?',
        a: 'Да — абонаментът работи на до 3 устройства. На всяко ново устройство просто отвори страницата Plus след плащане и ще се активира автоматично.'
      },
      {
        q: 'Как се активира Plus след плащане?',
        a: 'Автоматично. След успешно плащане Stripe те връща в приложението и Plus се включва за секунди — без ключове, без копиране.'
      },
      {
        q: 'Как се отказвам от абонамента?',
        a: 'От страницата Plus, бутон „Управлявай абонамента“ — отваря се порталът на Stripe, прекратяваш с един клик. Plus остава активен до края на платения период.'
      },
      {
        q: 'Каква е разликата между месечен и годишен план?',
        a: 'Месечният е €3 и се таксува автоматично всеки месец. Годишният е €25 и спестява €11 спрямо 12 месечни плащания. И двата дават едни и същи функции.'
      },
      {
        q: 'Продавате ли ми данните?',
        a: 'Не. Не пазим нищо освен хеш на имейла ти, нужен само за да валидираме абонамента.'
      }
    ]
  },

  emptyStates: {
    today: {
      title: 'Нямаш нищо за днес',
      subtitle: 'Всичките ти срокове са навреме. Добавяй нови с бутона +.'
    },
    deadlines: {
      title: 'Все още няма срокове',
      subtitle: 'Добави първия — винетка, гражданска отговорност, или нещо свое.',
      cta: '+ Добави срок'
    },
    cars: {
      title: 'Няма добавени коли',
      subtitle: 'Добави кола, за да свързваш срокове с конкретен автомобил.',
      cta: '+ Добави кола'
    },
    documents: {
      title: 'Няма комплекти документи',
      subtitle: 'Групирай срокове по човек — лична карта, паспорт, шофьорска.',
      cta: '+ Добави комплект'
    },
    completed: {
      title: 'Нямаш завършени срокове',
      subtitle: 'Маркирай срок като завършен, за да се появи тук.'
    },
    archived: {
      title: 'Архивът е празен',
      subtitle: 'Архивираните срокове се пазят тук без да запълват основния списък.'
    }
  },

  planLimitV2: {
    cars: { hit: 'Достигнал си лимита от 1 кола.', plus: 'Plus добавя до 5 коли.' },
    people: { hit: 'Достигнал си лимита от 1 човек.', plus: 'Plus добавя до 6 профила.' },
    deadlines: { hit: 'Достигнал си лимита от 10 срока.', plus: 'Plus дава неограничени срокове.' },
    documents: {
      hit: 'Достигнал си лимита от 1 комплект.',
      plus: 'Plus дава неограничени комплекти.'
    },
    ctaViewPlus: 'Виж Plus'
  },

  settingsV2: {
    plan: 'План',
    planFree: 'Безплатен план',
    planPlusActive: 'Срокник Plus активен',
    planUsage: (deadlines: number, cars: number): string =>
      `${deadlines}/10 срока \u00B7 ${cars}/1 кола`,
    seePlus: 'Виж Plus',
    quickAddLabel: 'Бърз избор на категория',
    calendarPickerPlaceholder: 'Избери дата',
    weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
  }
};

export type Copy = typeof copy;
