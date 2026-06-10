import { useEffect, useState } from "react";
import {
  Wrench, Gauge, ClipboardCheck, MapPin, Package, Headphones,
  Settings, Cpu, Zap, ShieldCheck, Truck, type LucideIcon,
} from "lucide-react";
import { SERVICES as SEED } from "./services";

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export const ICONS: Record<string, LucideIcon> = {
  Wrench, Gauge, ClipboardCheck, MapPin, Package, Headphones,
  Settings, Cpu, Zap, ShieldCheck, Truck,
};
// fallback if Tool isn't exported in this lucide version (it was removed)

export const ICON_NAMES = Object.keys(ICONS);

const KEY = "admin-services";

const SEED_ITEMS: ServiceItem[] = SEED.map((s) => {
  // find icon name matching the lucide component
  const entry = Object.entries(ICONS).find(([, comp]) => comp === s.icon);
  return {
    id: s.id,
    iconName: entry?.[0] ?? "Wrench",
    title: s.title,
    description: s.description,
  };
});

export function loadServices(): ServiceItem[] {
  if (typeof localStorage === "undefined") return SEED_ITEMS;
  const raw = localStorage.getItem(KEY);
  if (!raw) return SEED_ITEMS;
  try {
    const parsed = JSON.parse(raw) as ServiceItem[];
    return Array.isArray(parsed) && parsed.length ? parsed : SEED_ITEMS;
  } catch {
    return SEED_ITEMS;
  }
}
export function saveServices(list: ServiceItem[]) {
  if (typeof localStorage !== "undefined")
    localStorage.setItem(KEY, JSON.stringify(list));
}

export function useServicesStore() {
  const [items, setItems] = useState<ServiceItem[]>(() => loadServices());
  useEffect(() => {
    setItems(loadServices());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setItems(loadServices());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const persist = (next: ServiceItem[]) => { setItems(next); saveServices(next); };
  return {
    items,
    upsert: (item: ServiceItem) =>
      persist(items.find((x) => x.id === item.id)
        ? items.map((x) => (x.id === item.id ? item : x))
        : [...items, item]),
    remove: (id: string) => persist(items.filter((x) => x.id !== id)),
  };
}
