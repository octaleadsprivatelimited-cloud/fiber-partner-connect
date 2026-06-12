// Brands data — Firestore-backed with localStorage fallback.
import { useEffect, useState, useCallback } from "react";
import {
  collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy,
  serverTimestamp, updateDoc, setDoc,
} from "firebase/firestore";
import { getFirebase } from "./firebase";
import { isFirebaseConfigured } from "./admin-data";
import { BRANDS } from "./products";

export interface BrandItem {
  id?: string;
  name: string;
  description?: string;
  logo?: string;        // base64 data URL or remote URL
  order?: number;
  createdAt?: any;
}

const LOCAL_KEY = "admin-brands-v2";
const LEGACY_KEY = "admin-brand-descriptions";

function readLocal(): BrandItem[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
    // Migrate legacy localStorage from old BrandsManager
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy) as BrandItem[];
      if (Array.isArray(parsed)) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(parsed));
        return parsed;
      }
    }
  } catch { /* noop */ }
  return BRANDS.map((b) => ({ id: `seed-${b}`, name: b }));
}

function writeLocal(list: BrandItem[]) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
    window.dispatchEvent(new StorageEvent("storage", { key: LOCAL_KEY }));
  }
}

export function useBrands() {
  const [items, setItems] = useState<BrandItem[]>(() => readLocal());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setItems(readLocal());
    if (typeof window !== "undefined") window.addEventListener("storage", sync);

    const fb = getFirebase();
    let unsub: (() => void) | undefined;
    if (fb && isFirebaseConfigured()) {
      setLoading(true);
      try {
        const q = query(collection(fb.db, "brands"), orderBy("order", "asc"));
        unsub = onSnapshot(
          q,
          (snap) => {
            const list = snap.docs.map((d, i) => ({
              id: d.id, order: i, ...(d.data() as any),
            })) as BrandItem[];
            if (list.length) {
              setItems(list);
              writeLocal(list); // mirror to local for offline/fallback
            } else {
              setItems(readLocal());
            }
            setLoading(false);
          },
          (e) => { console.warn("Brands read failed, using local:", e); setItems(readLocal()); setLoading(false); },
        );
      } catch (e) { console.warn(e); setLoading(false); }
    }
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("storage", sync);
      unsub?.();
    };
  }, []);

  const add = useCallback(async (data: Omit<BrandItem, "id">) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      const item: BrandItem = { ...data, id: `local-${Date.now()}` };
      writeLocal([...readLocal(), item]);
      return;
    }
    try {
      await addDoc(collection(fb.db, "brands"), {
        ...data, order: Date.now(), createdAt: serverTimestamp(),
      });
    } catch (e: any) {
      console.warn("Brand save failed, saving locally:", e);
      const item: BrandItem = { ...data, id: `local-${Date.now()}` };
      writeLocal([...readLocal(), item]);
      throw new Error(
        e?.code === "permission-denied"
          ? "Permission denied by Firestore rules. The brand was saved only on this device. Verify your admin UID exists in the /admins collection and that the brands rules allow admin writes."
          : (e?.message || "Failed to save brand to Firestore. Saved locally only.")
      );
    }
  }, []);

  const update = useCallback(async (id: string, patch: Partial<BrandItem>) => {
    if (!id || id.startsWith("local-") || id.startsWith("seed-")) {
      const list = readLocal();
      const exists = list.some((b) => b.id === id);
      const next = exists
        ? list.map((b) => (b.id === id ? { ...b, ...patch } : b))
        : [...list, { id: id || `local-${Date.now()}`, name: patch.name ?? "", ...patch }];
      writeLocal(next);
      const fb = getFirebase();
      if (fb && isFirebaseConfigured()) {
        try { await addDoc(collection(fb.db, "brands"), { ...patch, order: Date.now(), createdAt: serverTimestamp() }); }
        catch (e: any) {
          throw new Error(
            e?.code === "permission-denied"
              ? "Permission denied by Firestore rules. Saved locally only — verify your admin UID is in the /admins collection."
              : (e?.message || "Failed to sync brand to Firestore.")
          );
        }
      }
      return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try { await updateDoc(doc(fb.db, "brands", id), patch as any); }
    catch (e: any) {
      throw new Error(
        e?.code === "permission-denied"
          ? "Permission denied by Firestore rules. Brand was not updated. Verify your admin UID is in the /admins collection."
          : (e?.message || "Failed to update brand in Firestore.")
      );
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    if (!id || id.startsWith("local-") || id.startsWith("seed-")) {
      writeLocal(readLocal().filter((b) => b.id !== id));
      return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try { await deleteDoc(doc(fb.db, "brands", id)); }
    catch (e) { console.warn(e); }
  }, []);

  return { items, loading, add, update, remove };
}
