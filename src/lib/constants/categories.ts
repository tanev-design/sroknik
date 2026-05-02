import type { CategoryDefinition, DeadlineCategory, Provider } from '$lib/types';

// Universal default reminders (days before due date).
const DEFAULT_OFFSETS: number[] = [30, 7, 1];
const SHORT_OFFSETS: number[] = [7, 1]; // monthly bills
const VIGNETTE_OFFSETS: number[] = [14, 7, 1];
const ID_CARD_OFFSETS: number[] = [90, 30, 7, 1]; // 3 months recommended
const DRIVERS_LICENSE_OFFSETS: number[] = [90, 30, 7, 1];
const PASSPORT_OFFSETS: number[] = [180, 60, 14, 1]; // airlines often need ≥6 months

// -----------------------------------------------------------------------------
// Provider directories — verified Bulgarian portals with deep links to login /
// pay / e-service entry points. Every URL is the canonical entry point for that
// provider. URLs that change frequently (slug-based service IDs) point to the
// stable category root rather than a deep slug that may rot.
// -----------------------------------------------------------------------------

const CIVIL_LIABILITY_PROVIDERS: Provider[] = [
  {
    id: 'lev-ins',
    labelBg: 'Лев Инс',
    labelEn: 'Lev Ins',
    websiteUrl: 'https://www.lev-ins.com/',
    paymentUrl: 'https://www.lev-ins.com/zastrahovki/grazhdanska-otgovornost'
  },
  {
    id: 'bulstrad',
    labelBg: 'Булстрад',
    labelEn: 'Bulstrad',
    websiteUrl: 'https://www.bulstrad.bg/',
    paymentUrl: 'https://www.bulstrad.bg/online'
  },
  {
    id: 'dzi',
    labelBg: 'ДЗИ',
    labelEn: 'DZI',
    websiteUrl: 'https://www.dzi.bg/',
    paymentUrl: 'https://www.dzi.bg/zastrahovki/grazhdanska-otgovornost'
  },
  {
    id: 'allianz',
    labelBg: 'Алианц',
    labelEn: 'Allianz',
    websiteUrl: 'https://www.allianz.bg/',
    paymentUrl: 'https://www.allianz.bg/bg_BG/individual/insurance/auto/civil-liability.html'
  },
  {
    id: 'armeec',
    labelBg: 'Армеец',
    labelEn: 'Armeec',
    websiteUrl: 'https://www.armeec.bg/',
    paymentUrl: 'https://eshop.armeec.bg/'
  },
  {
    id: 'euroins',
    labelBg: 'Евроинс',
    labelEn: 'Euroins',
    websiteUrl: 'https://www.euroins.bg/',
    paymentUrl: 'https://www.euroins.bg/grazhdanska-otgovornost'
  },
  {
    id: 'generali',
    labelBg: 'Дженерали',
    labelEn: 'Generali',
    websiteUrl: 'https://www.generali.bg/',
    paymentUrl: 'https://www.generali.bg/produkti/avtomobilno-zastrahovane'
  },
  {
    id: 'uniqa',
    labelBg: 'УНИКА',
    labelEn: 'UNIQA',
    websiteUrl: 'https://www.uniqa.bg/',
    paymentUrl: 'https://www.uniqa.bg/bg/grazhdanska-otgovornost'
  },
  {
    id: 'boleroins',
    labelBg: 'BoleroIns (сравнение)',
    labelEn: 'BoleroIns (comparison)',
    websiteUrl: 'https://www.boleroins.bg/',
    paymentUrl: 'https://www.boleroins.bg/grajdanska-otgovornost/'
  },
  {
    id: 'iznai',
    labelBg: 'Iznai (сравнение)',
    labelEn: 'Iznai (comparison)',
    websiteUrl: 'https://www.iznai.bg/',
    paymentUrl: 'https://www.iznai.bg/zastrahovki/grazhdanska-otgovornost/'
  }
];

const TECHNICAL_INSPECTION_PROVIDERS: Provider[] = [
  {
    id: 'daibg',
    labelBg: 'ИА „Автомобилна администрация“',
    labelEn: 'Automobile Administration Agency',
    websiteUrl: 'https://www.daibg.com/',
    paymentUrl: 'https://www.daibg.com/'
  },
  {
    id: 'eurotest',
    labelBg: 'Евротест',
    labelEn: 'Eurotest',
    websiteUrl: 'https://eurotest.bg/'
  },
  {
    id: 'autounion',
    labelBg: 'Auto Union',
    labelEn: 'Auto Union',
    websiteUrl: 'https://autounion.bg/'
  },
  {
    id: 'automotor',
    labelBg: 'Automotor',
    labelEn: 'Automotor',
    websiteUrl: 'https://automotorbg.com/'
  }
];

const ELECTRICITY_PROVIDERS: Provider[] = [
  {
    id: 'electrohold',
    labelBg: 'Електрохолд',
    labelEn: 'Electrohold',
    regionBg: 'Западна България',
    regionEn: 'Western Bulgaria',
    websiteUrl: 'https://electrohold.bg/',
    paymentUrl: 'https://my.electrohold.bg/'
  },
  {
    id: 'evn',
    labelBg: 'EVN България',
    labelEn: 'EVN Bulgaria',
    regionBg: 'Южна България',
    regionEn: 'Southern Bulgaria',
    websiteUrl: 'https://www.evn.bg/',
    paymentUrl: 'https://my.evn.bg/'
  },
  {
    id: 'energo-pro',
    labelBg: 'Енерго-Про',
    labelEn: 'Energo-Pro',
    regionBg: 'Североизточна България',
    regionEn: 'North-eastern Bulgaria',
    websiteUrl: 'https://www.energo-pro.bg/',
    paymentUrl: 'https://my.energo-pro.bg/'
  }
];

const WATER_PROVIDERS: Provider[] = [
  {
    id: 'sofiyska-voda',
    labelBg: 'Софийска вода',
    labelEn: 'Sofia Water',
    regionBg: 'София',
    regionEn: 'Sofia',
    websiteUrl: 'https://www.sofiyskavoda.bg/',
    paymentUrl: 'https://my.sofiyskavoda.bg/'
  },
  {
    id: 'vik-plovdiv',
    labelBg: 'ВиК Пловдив',
    labelEn: 'VK Plovdiv',
    regionBg: 'Пловдив',
    regionEn: 'Plovdiv',
    websiteUrl: 'https://www.vik.bg/',
    paymentUrl: 'https://www.vik.bg/customers/'
  },
  {
    id: 'vik-varna',
    labelBg: 'ВиК Варна',
    labelEn: 'VK Varna',
    regionBg: 'Варна',
    regionEn: 'Varna',
    websiteUrl: 'https://vikvarna.com/',
    paymentUrl: 'https://vikvarna.com/uslugi/elektronni-uslugi'
  },
  {
    id: 'vik-burgas',
    labelBg: 'ВиК Бургас',
    labelEn: 'VK Burgas',
    regionBg: 'Бургас',
    regionEn: 'Burgas',
    websiteUrl: 'https://www.vikburgas.com/',
    paymentUrl: 'https://www.vikburgas.com/elektronni-uslugi'
  },
  {
    id: 'vik-stara-zagora',
    labelBg: 'ВиК Стара Загора',
    labelEn: 'VK Stara Zagora',
    regionBg: 'Стара Загора',
    regionEn: 'Stara Zagora',
    websiteUrl: 'https://www.wik-stz.com/'
  },
  {
    id: 'vik-ruse',
    labelBg: 'ВиК Русе',
    labelEn: 'VK Ruse',
    regionBg: 'Русе',
    regionEn: 'Ruse',
    websiteUrl: 'https://www.vik-ruse.com/'
  },
  {
    id: 'vik-veliko-tarnovo',
    labelBg: 'ВиК Велико Търново',
    labelEn: 'VK Veliko Tarnovo',
    regionBg: 'Велико Търново',
    regionEn: 'Veliko Tarnovo',
    websiteUrl: 'https://vikvt.com/'
  },
  {
    id: 'vik-pleven',
    labelBg: 'ВиК Плевен',
    labelEn: 'VK Pleven',
    regionBg: 'Плевен',
    regionEn: 'Pleven',
    websiteUrl: 'https://vik-pleven.com/'
  }
];

const INTERNET_PROVIDERS: Provider[] = [
  {
    id: 'vivacom',
    labelBg: 'Виваком',
    labelEn: 'Vivacom',
    websiteUrl: 'https://www.vivacom.bg/',
    paymentUrl: 'https://my.vivacom.bg/'
  },
  {
    id: 'a1',
    labelBg: 'A1',
    labelEn: 'A1',
    websiteUrl: 'https://www.a1.bg/',
    paymentUrl: 'https://my.a1.bg/'
  },
  {
    id: 'yettel',
    labelBg: 'Yettel',
    labelEn: 'Yettel',
    websiteUrl: 'https://www.yettel.bg/',
    paymentUrl: 'https://my.yettel.bg/'
  },
  {
    id: 'bulsatcom',
    labelBg: 'Булсатком',
    labelEn: 'Bulsatcom',
    websiteUrl: 'https://www.bulsatcom.bg/',
    paymentUrl: 'https://my.bulsatcom.bg/'
  },
  {
    id: 'net-1',
    labelBg: 'Net1',
    labelEn: 'Net1',
    websiteUrl: 'https://www.net1.bg/'
  }
];

const LOCAL_TAX_PROVIDERS: Provider[] = [
  {
    id: 'localtaxes-bg',
    labelBg: 'localtaxes.bg (всички общини)',
    labelEn: 'localtaxes.bg (all municipalities)',
    websiteUrl: 'https://www.localtaxes.bg/',
    paymentUrl: 'https://www.localtaxes.bg/'
  },
  {
    id: 'epay',
    labelBg: 'ePay',
    labelEn: 'ePay',
    websiteUrl: 'https://www.epay.bg/',
    paymentUrl: 'https://www.epay.bg/v3main/login'
  },
  {
    id: 'easypay',
    labelBg: 'Easypay',
    labelEn: 'Easypay',
    websiteUrl: 'https://www.easypay.bg/',
    paymentUrl: 'https://www.easypay.bg/'
  },
  {
    id: 'sofia',
    labelBg: 'Столична община',
    labelEn: 'Sofia Municipality',
    regionBg: 'София',
    regionEn: 'Sofia',
    websiteUrl: 'https://www.sofia.bg/',
    paymentUrl: 'https://payment.sofia.bg/'
  },
  {
    id: 'plovdiv',
    labelBg: 'Община Пловдив',
    labelEn: 'Plovdiv Municipality',
    regionBg: 'Пловдив',
    regionEn: 'Plovdiv',
    websiteUrl: 'https://www.plovdiv.bg/',
    paymentUrl: 'https://www.plovdiv.bg/'
  },
  {
    id: 'varna',
    labelBg: 'Община Варна',
    labelEn: 'Varna Municipality',
    regionBg: 'Варна',
    regionEn: 'Varna',
    websiteUrl: 'https://www.varna.bg/',
    paymentUrl: 'https://www.lt.varna.bg/'
  },
  {
    id: 'burgas',
    labelBg: 'Община Бургас',
    labelEn: 'Burgas Municipality',
    regionBg: 'Бургас',
    regionEn: 'Burgas',
    websiteUrl: 'https://www.burgas.bg/',
    paymentUrl: 'https://www.localtax.burgas.bg/'
  },
  {
    id: 'ruse',
    labelBg: 'Община Русе',
    labelEn: 'Ruse Municipality',
    regionBg: 'Русе',
    regionEn: 'Ruse',
    websiteUrl: 'https://www.ruse-bg.eu/'
  },
  {
    id: 'stara-zagora',
    labelBg: 'Община Стара Загора',
    labelEn: 'Stara Zagora Municipality',
    regionBg: 'Стара Загора',
    regionEn: 'Stara Zagora',
    websiteUrl: 'https://www.starazagora.bg/'
  }
];

// -----------------------------------------------------------------------------
// Categories
// -----------------------------------------------------------------------------

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'vignette',
    labelBg: 'Винетка',
    labelEn: 'Vignette',
    descriptionBg: 'Електронна винетка за автомагистрали и първокласни пътища.',
    descriptionEn: 'Electronic toll vignette for Bulgarian motorways.',
    defaultReminderOffsets: VIGNETTE_OFFSETS,
    icon: 'Receipt',
    officialLinkLabel: 'bgtoll.bg',
    officialLinkUrl: 'https://www.bgtoll.bg/',
    paymentLinkLabel: 'check.bgtoll.bg',
    paymentLinkUrl: 'https://check.bgtoll.bg/'
  },
  {
    id: 'civil-liability',
    labelBg: 'Гражданска отговорност',
    labelEn: 'Civil liability insurance',
    descriptionBg: 'Задължителна автомобилна застраховка „Гражданска отговорност“.',
    descriptionEn: 'Mandatory motor vehicle civil liability insurance.',
    defaultReminderOffsets: DEFAULT_OFFSETS,
    icon: 'ShieldCheck',
    providers: CIVIL_LIABILITY_PROVIDERS
  },
  {
    id: 'technical-inspection',
    labelBg: 'Технически преглед',
    labelEn: 'Technical inspection',
    descriptionBg: 'Годишен технически преглед на автомобила.',
    descriptionEn: 'Annual technical inspection of your vehicle.',
    defaultReminderOffsets: DEFAULT_OFFSETS,
    icon: 'Wrench',
    officialLinkLabel: 'daibg.com',
    officialLinkUrl: 'https://www.daibg.com/',
    providers: TECHNICAL_INSPECTION_PROVIDERS
  },
  {
    id: 'drivers-license',
    labelBg: 'Шофьорска книжка',
    labelEn: 'Driver’s license',
    descriptionBg: 'Свидетелство за управление на МПС.',
    descriptionEn: 'Driver’s license — issuance and renewal via MVR.',
    defaultReminderOffsets: DRIVERS_LICENSE_OFFSETS,
    icon: 'IdCard',
    officialLinkLabel: 'e-uslugi.mvr.bg',
    officialLinkUrl: 'https://e-uslugi.mvr.bg/',
    paymentLinkLabel: 'Подай заявление',
    paymentLinkUrl: 'https://e-uslugi.mvr.bg/services/category/driving'
  },
  {
    id: 'id-card',
    labelBg: 'Лична карта',
    labelEn: 'ID card',
    descriptionBg: 'Български документ за самоличност.',
    descriptionEn: 'Bulgarian national identity card.',
    defaultReminderOffsets: ID_CARD_OFFSETS,
    icon: 'BadgeCheck',
    officialLinkLabel: 'e-uslugi.mvr.bg',
    officialLinkUrl: 'https://e-uslugi.mvr.bg/',
    paymentLinkLabel: 'Подай заявление',
    paymentLinkUrl: 'https://e-uslugi.mvr.bg/services/category/personal-documents'
  },
  {
    id: 'passport',
    labelBg: 'Паспорт',
    labelEn: 'Passport',
    descriptionBg: 'Български международен паспорт.',
    descriptionEn: 'Bulgarian international passport.',
    defaultReminderOffsets: PASSPORT_OFFSETS,
    icon: 'BookMarked',
    officialLinkLabel: 'e-uslugi.mvr.bg',
    officialLinkUrl: 'https://e-uslugi.mvr.bg/',
    paymentLinkLabel: 'Подай заявление',
    paymentLinkUrl: 'https://e-uslugi.mvr.bg/services/category/personal-documents'
  },
  {
    id: 'electricity-bill',
    labelBg: 'Сметка за ток',
    labelEn: 'Electricity bill',
    descriptionBg: 'Месечна сметка за електроенергия.',
    descriptionEn: 'Monthly electricity bill.',
    defaultReminderOffsets: SHORT_OFFSETS,
    icon: 'Zap',
    providers: ELECTRICITY_PROVIDERS
  },
  {
    id: 'water-bill',
    labelBg: 'Сметка за вода',
    labelEn: 'Water bill',
    descriptionBg: 'Месечна сметка за водоснабдяване и канализация.',
    descriptionEn: 'Monthly water and sewage bill.',
    defaultReminderOffsets: SHORT_OFFSETS,
    icon: 'Droplets',
    providers: WATER_PROVIDERS
  },
  {
    id: 'internet-phone',
    labelBg: 'Интернет / телефон',
    labelEn: 'Internet / phone',
    descriptionBg: 'Месечна сметка за интернет, телевизия или телефон.',
    descriptionEn: 'Monthly internet, TV or phone bill.',
    defaultReminderOffsets: SHORT_OFFSETS,
    icon: 'Wifi',
    providers: INTERNET_PROVIDERS
  },
  {
    id: 'local-tax',
    labelBg: 'Местен данък',
    labelEn: 'Local taxes',
    descriptionBg: 'Местен данък върху имот, превозно средство и такса смет.',
    descriptionEn: 'Local property tax, vehicle tax and waste fee.',
    defaultReminderOffsets: DEFAULT_OFFSETS,
    icon: 'Landmark',
    officialLinkLabel: 'localtaxes.bg',
    officialLinkUrl: 'https://www.localtaxes.bg/',
    providers: LOCAL_TAX_PROVIDERS
  },
  {
    id: 'custom',
    labelBg: 'Друг срок',
    labelEn: 'Other deadline',
    descriptionBg: 'Собствен срок, който не се вписва в другите категории.',
    descriptionEn: 'Custom deadline that doesn’t fit the other categories.',
    defaultReminderOffsets: DEFAULT_OFFSETS,
    icon: 'CalendarClock'
  }
];

const CATEGORY_MAP: Record<DeadlineCategory, CategoryDefinition> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<DeadlineCategory, CategoryDefinition>
);

export function getCategory(id: DeadlineCategory): CategoryDefinition {
  return CATEGORY_MAP[id];
}

export function getProvider(
  category: DeadlineCategory,
  providerId?: string
): Provider | undefined {
  if (!providerId) return undefined;
  const cat = CATEGORY_MAP[category];
  return cat.providers?.find((p) => p.id === providerId);
}

/** Resolve the best link for a deadline: provider payment > provider site > category payment > category official. */
export function resolveOfficialUrl(
  category: DeadlineCategory,
  providerId?: string
): { url: string; label: string } | undefined {
  const cat = CATEGORY_MAP[category];
  const provider = getProvider(category, providerId);
  if (provider) {
    return {
      url: provider.paymentUrl ?? provider.websiteUrl,
      label: provider.labelBg
    };
  }
  if (cat.paymentLinkUrl) {
    return { url: cat.paymentLinkUrl, label: cat.paymentLinkLabel ?? cat.paymentLinkUrl };
  }
  if (cat.officialLinkUrl) {
    return { url: cat.officialLinkUrl, label: cat.officialLinkLabel ?? cat.officialLinkUrl };
  }
  return undefined;
}
