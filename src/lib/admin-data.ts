// Firebase-backed data hooks for the admin panel.
// Falls back to in-memory state when Firebase config is still the placeholder,
// so the UI is fully usable for design/testing before real keys are added.
import { useEffect, useState, useCallback } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, serverTimestamp, setDoc, getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged, type User,
} from "firebase/auth";
import { getFirebase } from "./firebase";
import { PRODUCTS as SEED_PRODUCTS, type Product } from "./products";
import { compressImage } from "./image-compress";

export function isFirebaseConfigured() {
  const fb = getFirebase();
  if (!fb) return false;
  const key = (fb.app.options as { apiKey?: string }).apiKey ?? "";
  return !!key && !key.startsWith("REPLACE");
}

/* ------------- Auth ------------- */
export const DEMO_CREDENTIALS = {
  email: "admin@satyapowertechnologys.in",
  password: "satya@2013",
};
const DEMO_SESSION_KEY = "spt_demo_admin";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      // demo mode: restore session from localStorage
      if (typeof window !== "undefined") {
        const saved = window.localStorage.getItem(DEMO_SESSION_KEY);
        if (saved) setUser({ email: saved } as User);
      }
      setLoading(false);
      return;
    }
    return onAuthStateChanged(fb.auth, (u) => { setUser(u); setLoading(false); });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      // Demo mode authentication
      if (
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        if (typeof window !== "undefined")
          window.localStorage.setItem(DEMO_SESSION_KEY, email);
        setUser({ email } as User);
        return;
      }
      throw new Error("Invalid demo credentials. Use the credentials shown below.");
    }
    await signInWithEmailAndPassword(fb.auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    const fb = getFirebase();
    if (fb && isFirebaseConfigured()) {
      await signOut(fb.auth);
      return;
    }
    if (typeof window !== "undefined")
      window.localStorage.removeItem(DEMO_SESSION_KEY);
    setUser(null);
  }, []);

  return { user, loading, login, logout };
}

/* ------------- Products ------------- */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    setLoading(true);
    const q = query(collection(fb.db, "products"), orderBy("name"));
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
      // If Firestore is empty, fall back to the seeded demo catalog so the
      // admin and storefront still show content out of the box.
      setProducts(list.length ? list : SEED_PRODUCTS);
      setLoading(false);
    }, () => {
      // Read failed (rules/offline) — keep seed data visible.
      setProducts(SEED_PRODUCTS);
      setLoading(false);
    });
  }, []);

  const save = async (p: Product) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      setProducts((prev) => prev.find((x) => x.id === p.id) ? prev.map((x) => x.id === p.id ? p : x) : [...prev, p]);
      return;
    }
    try {
      if (p.id && (await getDoc(doc(fb.db, "products", p.id))).exists()) {
        const { id, ...rest } = p;
        await updateDoc(doc(fb.db, "products", id), rest);
      } else if (p.id) {
        const { id, ...rest } = p;
        await setDoc(doc(fb.db, "products", id), rest);
      } else {
        await addDoc(collection(fb.db, "products"), p);
      }
    } catch (e) {
      console.warn("Firestore save failed, updating locally:", e);
      setProducts((prev) => prev.find((x) => x.id === p.id) ? prev.map((x) => x.id === p.id ? p : x) : [...prev, p]);
    }
  };

  const remove = async (id: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    try { await deleteDoc(doc(fb.db, "products", id)); }
    catch (e) {
      console.warn("Firestore delete failed, removing locally:", e);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Always compress first to keep payloads small.
    const compressed = await compressImage(file, { maxSize: 1200, quality: 0.8 });
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return compressed;
    try {
      // Convert data URL back to a Blob for Storage upload.
      const blob = await (await fetch(compressed)).blob();
      const r = ref(fb.storage, `uploads/${Date.now()}-${file.name.replace(/\.[^.]+$/, "")}.jpg`);
      await uploadBytes(r, blob);
      return await getDownloadURL(r);
    } catch (e) {
      console.warn("Storage upload failed, using inline data URL:", e);
      return compressed;
    }
  };

  return { products, loading, save, remove, uploadImage };
}

/* ------------- Inquiries ------------- */
export interface Inquiry {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
  status?: "new" | "read" | "resolved";
  createdAt?: any;
}

const INQUIRY_LOCAL_KEY = "admin-inquiries";

function readLocalInquiries(): Inquiry[] {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem(INQUIRY_LOCAL_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Inquiry[]; } catch { return []; }
}
function writeLocalInquiries(list: Inquiry[]) {
  if (typeof localStorage !== "undefined")
    localStorage.setItem(INQUIRY_LOCAL_KEY, JSON.stringify(list));
}

export async function submitInquiry(data: Omit<Inquiry, "id" | "status" | "createdAt">) {
  // Always persist locally so the admin panel sees the message even when
  // Firestore rules block writes / the user is offline.
  const local: Inquiry = {
    ...data,
    id: `local-${Date.now()}`,
    status: "new",
    createdAt: Date.now(),
  };
  const list = [local, ...readLocalInquiries()];
  writeLocalInquiries(list);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new StorageEvent("storage", { key: INQUIRY_LOCAL_KEY }));
  }

  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) return;
  try {
    await addDoc(collection(fb.db, "inquiries"), { ...data, status: "new", createdAt: serverTimestamp() });
  } catch (e) {
    console.warn("Firestore inquiry write failed, kept locally:", e);
  }
}

export function useInquiries() {
  const [remote, setRemote] = useState<Inquiry[]>([]);
  const [local, setLocal] = useState<Inquiry[]>(() => readLocalInquiries());

  useEffect(() => {
    const sync = () => setLocal(readLocalInquiries());
    sync();
    if (typeof window !== "undefined") {
      window.addEventListener("storage", sync);
    }
    const fb = getFirebase();
    let unsub: (() => void) | undefined;
    if (fb && isFirebaseConfigured()) {
      try {
        const q = query(collection(fb.db, "inquiries"), orderBy("createdAt", "desc"));
        unsub = onSnapshot(
          q,
          (snap) => setRemote(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))),
          (e) => console.warn("Firestore inquiry read failed:", e),
        );
      } catch (e) { console.warn(e); }
    }
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("storage", sync);
      unsub?.();
    };
  }, []);

  const inquiries = [...local, ...remote];

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    if (id.startsWith("local-")) {
      const next = readLocalInquiries().map((i) => i.id === id ? { ...i, status } : i);
      writeLocalInquiries(next); setLocal(next); return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try { await updateDoc(doc(fb.db, "inquiries", id), { status }); }
    catch (e) { console.warn(e); }
  };
  const remove = async (id: string) => {
    if (id.startsWith("local-")) {
      const next = readLocalInquiries().filter((i) => i.id !== id);
      writeLocalInquiries(next); setLocal(next); return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try { await deleteDoc(doc(fb.db, "inquiries", id)); }
    catch (e) { console.warn(e); }
  };
  return { inquiries, updateStatus, remove };
}

/* ------------- Settings ------------- */
export interface AdminSettings { watermarkEnabled: boolean; }
export async function getSettings(): Promise<AdminSettings> {
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem("admin-settings") : null;
    return raw ? JSON.parse(raw) : { watermarkEnabled: true };
  }
  const snap = await getDoc(doc(fb.db, "settings", "global"));
  return (snap.exists() ? snap.data() : { watermarkEnabled: true }) as AdminSettings;
}
export async function saveSettings(s: AdminSettings) {
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) {
    localStorage.setItem("admin-settings", JSON.stringify(s)); return;
  }
  await setDoc(doc(fb.db, "settings", "global"), s);
}
