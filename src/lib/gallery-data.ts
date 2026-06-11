// Gallery data — Firebase Firestore + Storage with localStorage fallback.
import { useEffect, useState, useCallback } from "react";
import {
  collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy,
  serverTimestamp, updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirebase } from "./firebase";
import { isFirebaseConfigured } from "./admin-data";
import { compressImage } from "./image-compress";

export interface GalleryItem {
  id: string;
  title: string;
  category?: string;
  image: string;          // download URL or data URL fallback
  storagePath?: string;   // for deletion in Storage
  createdAt?: number | any;
}

const LOCAL_KEY = "admin-gallery";

function readLocal(): GalleryItem[] {
  if (typeof localStorage === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); } catch { return []; }
}
function writeLocal(list: GalleryItem[]) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
    window.dispatchEvent(new StorageEvent("storage", { key: LOCAL_KEY }));
  }
}

export const GALLERY_CATEGORIES = [
  "Service Center",
  "Field Installation",
  "Products",
  "Training",
  "Team",
  "Events",
] as const;

export function useGallery() {
  const [remote, setRemote] = useState<GalleryItem[]>([]);
  const [local, setLocal] = useState<GalleryItem[]>(() => readLocal());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setLocal(readLocal());
    sync();
    if (typeof window !== "undefined") window.addEventListener("storage", sync);

    const fb = getFirebase();
    let unsub: (() => void) | undefined;
    if (fb && isFirebaseConfigured()) {
      setLoading(true);
      try {
        const q = query(collection(fb.db, "gallery"), orderBy("createdAt", "desc"));
        unsub = onSnapshot(
          q,
          (snap) => {
            setRemote(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
            setLoading(false);
          },
          (e) => { console.warn("Gallery read failed:", e); setLoading(false); },
        );
      } catch (e) { console.warn(e); setLoading(false); }
    }
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("storage", sync);
      unsub?.();
    };
  }, []);

  const items: GalleryItem[] = [...remote, ...local];

  const add = useCallback(async (data: { title: string; category?: string; file: File }) => {
    const compressed = await compressImage(data.file, { maxSize: 1600, quality: 0.82 });
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      const item: GalleryItem = {
        id: `local-${Date.now()}`,
        title: data.title,
        category: data.category,
        image: compressed,
        createdAt: Date.now(),
      };
      writeLocal([item, ...readLocal()]);
      return;
    }
    try {
      const blob = await (await fetch(compressed)).blob();
      const storagePath = `gallery/${Date.now()}-${data.file.name.replace(/\.[^.]+$/, "")}.jpg`;
      const r = ref(fb.storage, storagePath);
      await uploadBytes(r, blob);
      const url = await getDownloadURL(r);
      await addDoc(collection(fb.db, "gallery"), {
        title: data.title,
        category: data.category ?? "",
        image: url,
        storagePath,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Gallery upload failed, saving locally:", e);
      const item: GalleryItem = {
        id: `local-${Date.now()}`,
        title: data.title,
        category: data.category,
        image: compressed,
        createdAt: Date.now(),
      };
      writeLocal([item, ...readLocal()]);
    }
  }, []);

  const update = useCallback(async (id: string, patch: Partial<GalleryItem>) => {
    if (id.startsWith("local-")) {
      const next = readLocal().map((i) => i.id === id ? { ...i, ...patch } : i);
      writeLocal(next); return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try { await updateDoc(doc(fb.db, "gallery", id), patch as any); }
    catch (e) { console.warn(e); }
  }, []);

  const remove = useCallback(async (id: string) => {
    if (id.startsWith("local-")) {
      writeLocal(readLocal().filter((i) => i.id !== id)); return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    const item = remote.find((i) => i.id === id);
    try {
      await deleteDoc(doc(fb.db, "gallery", id));
      if (item?.storagePath) {
        try { await deleteObject(ref(fb.storage, item.storagePath)); }
        catch (e) { /* file may already be gone */ }
      }
    } catch (e) { console.warn(e); }
  }, [remote]);

  return { items, loading, add, update, remove };
}
