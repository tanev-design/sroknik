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
      'Няма профил, няма ЕГН, няма качване на документи и няма рекламно проследяване. Данните остават в браузъра на това устройство.',
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
    noProfile: 'Без профил.',
    noEGN: 'Без ЕГН.',
    noBankData: 'Без банкови данни.',
    noUploads: 'Без качване на документи.',
    noTracking: 'Без анализ, без реклами, без проследяване.',
    localOnly: 'Данните са само на това устройство.',
    noCloud: 'Срокник не съхранява сроковете ти в облак.',
    youDecide: 'Ти решаваш кога да свалиш архив и кога да изтриеш данните.',
    onlyWhatNeeded: 'Не събираме данни, които не са нужни за сроковете ти.'
  },

  onboarding: {
    step1Title: 'Всички важни срокове, подредени спокойно.',
    step1Sub: 'Коли, документи и плащания, без излишни данни.',
    step2Title: 'Без профил. Без ЕГН.',
    step2Sub: 'Без банкови данни. Данните са само на това устройство.',
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
      'Сроковете се пазят в браузъра на устройството. Архивът и изтриването са под твой контрол.'
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
    subtitle: 'Повече хора, коли и документи на едно устройство.',
    comingSoonBadge: 'Скоро',
    intro:
      'Срокник Plus идва скоро. Без дата, без листа на изчакващи, без предварителни плащания. Когато е готов, ще го видиш тук.',
    notLockedBehindAccount: 'Plus няма да бъде заключван зад акаунт.',
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
      'Банкови данни',
      'Сканирани документи',
      'Имейл, парола, акаунт',
      'Аналитики, реклами, проследяване'
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
    noServer: 'Срокник няма сървър. Никой освен теб не вижда срокниците ти.',
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
  }
};

export type Copy = typeof copy;
