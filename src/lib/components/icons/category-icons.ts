import type { ComponentType } from 'svelte';
import BadgeCheck from 'lucide-svelte/icons/badge-check';
import BookMarked from 'lucide-svelte/icons/book-marked';
import CalendarClock from 'lucide-svelte/icons/calendar-clock';
import Droplets from 'lucide-svelte/icons/droplets';
import IdCard from 'lucide-svelte/icons/id-card';
import Landmark from 'lucide-svelte/icons/landmark';
import Receipt from 'lucide-svelte/icons/receipt';
import ShieldCheck from 'lucide-svelte/icons/shield-check';
import Wifi from 'lucide-svelte/icons/wifi';
import Wrench from 'lucide-svelte/icons/wrench';
import Zap from 'lucide-svelte/icons/zap';

const categoryIconMap: Record<string, ComponentType> = {
  BadgeCheck,
  BookMarked,
  CalendarClock,
  Droplets,
  IdCard,
  Landmark,
  Receipt,
  ShieldCheck,
  Wifi,
  Wrench,
  Zap
};

export function getCategoryIcon(name: string): ComponentType {
  return categoryIconMap[name] ?? CalendarClock;
}
