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
const PRODUCTS_LOCAL_KEY = "admin-products-v2";

function readLocalProducts(): Product[] {
  if (typeof localStorage === "undefined") return SEED_PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_LOCAL_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch { /* noop */ }
  return SEED_PRODUCTS;
}

async function imageUrlToBase64(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) return url;
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn("Failed to convert image to base64:", url, e);
    return url;
  }
}

// notify=false when called from Firestore listener to prevent the storage
// event from triggering sync() and overwriting React state with stripped images.
function writeLocalProducts(list: Product[], notify = false) {
  if (typeof localStorage !== "undefined") {
    // Strip heavy base64 strings from local storage cache to keep payload small and prevent QuotaExceededError
    const cleaned = list.map((p) => {
      const copy = { ...p };
      if (copy.image && copy.image.startsWith("data:")) {
        copy.image = "";
      }
      if (copy.pdf && copy.pdf.startsWith("data:")) {
        copy.pdf = "";
      }
      return copy;
    });
    localStorage.setItem(PRODUCTS_LOCAL_KEY, JSON.stringify(cleaned));
    if (notify) {
      window.dispatchEvent(new StorageEvent("storage", { key: PRODUCTS_LOCAL_KEY }));
    }
  }
}

export function useProducts() {
  // Initialise from seed data (has real images) so cards are never blank while Firestore loads.
  // readLocalProducts() has images stripped to avoid QuotaExceededError, so don't use it here.
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setProducts(readLocalProducts());
    if (typeof window !== "undefined") window.addEventListener("storage", sync);
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      return () => {
        if (typeof window !== "undefined") window.removeEventListener("storage", sync);
      };
    }
    setLoading(true);

    const globalRef = doc(fb.db, "settings", "global");
    getDoc(globalRef).then(async (globalSnap) => {
      const alreadySeeded = globalSnap.exists() && (globalSnap.data() as any).productsSeeded;
      if (!alreadySeeded) {
        console.log("Seeding products to Firestore on startup...");
        const promises = SEED_PRODUCTS.map(async (seed) => {
          const { id, ...rest } = seed;
          const docRef = doc(fb.db, "products", id);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            const base64 = await imageUrlToBase64(rest.image);
            await setDoc(docRef, { ...rest, image: base64 });
          }
        });
        await Promise.all(promises);
        await setDoc(globalRef, { productsSeeded: true }, { merge: true });
      }
    }).catch((err) => console.warn("Products seed check failed:", err));

    const q = query(collection(fb.db, "products"), orderBy("name"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => {
        const data = d.data() as Omit<Product, "id">;
        // If Firestore has an empty/missing image for a seed product,
        // immediately fall back to the bundled asset so the card is never blank.
        if (!data.image) {
          const seed = SEED_PRODUCTS.find((s) => s.id === d.id);
          if (seed) data.image = seed.image;
        }
        return { id: d.id, ...data };
      });

      // Async: migrate old hashed-path images → base64 in Firestore for future loads.
      list.forEach(async (p) => {
        const isLegacyPath = p.image &&
          (p.image.startsWith("/src/assets/") || p.image.startsWith("/assets/") ||
           (p.image.includes("product-") && !p.image.startsWith("data:")));
        if (isLegacyPath) {
          const seedProduct = SEED_PRODUCTS.find((sp) => sp.id === p.id);
          if (seedProduct) {
            console.log(`Migrating product image to base64 for ${p.id}...`);
            try {
              const base64 = await imageUrlToBase64(seedProduct.image);
              if (base64.startsWith("data:")) {
                await updateDoc(doc(fb.db, "products", p.id), { image: base64 });
              }
            } catch (err) {
              console.warn(`Failed to migrate image for ${p.id}:`, err);
            }
          }
        }
      });

      setProducts(list);
      // notify=false: don't dispatch storage event or we'll overwrite state with stripped images
      writeLocalProducts(list, false);
      setLoading(false);
    }, () => {
      // Read failed (rules/offline) — keep seed data visible.
      setProducts(readLocalProducts());
      setLoading(false);
    });
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("storage", sync);
      unsub();
    };
  }, []);

  const save = async (p: Product) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      const next = readLocalProducts().find((x) => x.id === p.id) ? readLocalProducts().map((x) => x.id === p.id ? p : x) : [...readLocalProducts(), p];
      writeLocalProducts(next, true);
      setProducts(next);
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
      const next = readLocalProducts().find((x) => x.id === p.id) ? readLocalProducts().map((x) => x.id === p.id ? p : x) : [...readLocalProducts(), p];
      writeLocalProducts(next);
      setProducts(next);
    }
  };

  const remove = async (id: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      const next = readLocalProducts().filter((p) => p.id !== id);
      writeLocalProducts(next);
      setProducts(next);
      return;
    }
    try { await deleteDoc(doc(fb.db, "products", id)); }
    catch (e) {
      console.warn("Firestore delete failed, removing locally:", e);
      const next = readLocalProducts().filter((p) => p.id !== id);
      writeLocalProducts(next);
      setProducts(next);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Compress aggressively so it fits under Firestore's 1MB document limit.
    const compressed = await compressImage(file, { maxSize: 800, quality: 0.7 });
    return compressed;
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

import logoUrl from "../assets/satya-logo-v1.png";

/* ------------- Company Information ------------- */
export interface CompanyInfo {
  name: string; tagline: string; phone: string; phoneAlt: string; email: string;
  address: string; gstin: string; founded: string; ceo: string; website: string;
  logo: string;
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  const fb = getFirebase();
  const raw = typeof localStorage !== "undefined" ? localStorage.getItem("admin-company-info") : null;
  const localDefault = raw ? JSON.parse(raw) : null;

  if (!fb || !isFirebaseConfigured()) {
    return localDefault || {
      name: "SATYA POWER TECHNOLOGYS", tagline: "Service first, Sales next",
      phone: "+91 95428 40444", phoneAlt: "+91 86881 51526",
      email: "satyapowertechnologys@gmail.com",
      address: "2-3/107, Koneru Street, C.B Devam, Peddapuram, AP - 533437",
      gstin: "37BILPL7684K1ZD", founded: "2013", ceo: "Mr. V Dorababu",
      website: "www.satyapowertechnologys.in",
      logo: logoUrl
    };
  }
  try {
    const snap = await getDoc(doc(fb.db, "settings", "company"));
    if (snap.exists()) {
      const data = snap.data() as CompanyInfo;
      if (!data.logo) {
        data.logo = logoUrl;
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("admin-company-info", JSON.stringify(data));
      }
      return data;
    } else {
      const initial = {
        name: "SATYA POWER TECHNOLOGYS", tagline: "Service first, Sales next",
        phone: "+91 95428 40444", phoneAlt: "+91 86881 51526",
        email: "satyapowertechnologys@gmail.com",
        address: "2-3/107, Koneru Street, C.B Devam, Peddapuram, AP - 533437",
        gstin: "37BILPL7684K1ZD", founded: "2013", ceo: "Mr. V Dorababu",
        website: "www.satyapowertechnologys.in",
        logo: logoUrl
      };
      await setDoc(doc(fb.db, "settings", "company"), initial);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("admin-company-info", JSON.stringify(initial));
      }
      return initial;
    }
  } catch (e) {
    console.warn("Failed to fetch company info from Firestore:", e);
  }
  return localDefault || {
    name: "SATYA POWER TECHNOLOGYS", tagline: "Service first, Sales next",
    phone: "+91 95428 40444", phoneAlt: "+91 86881 51526",
    email: "satyapowertechnologys@gmail.com",
    address: "2-3/107, Koneru Street, C.B Devam, Peddapuram, AP - 533437",
    gstin: "37BILPL7684K1ZD", founded: "2013", ceo: "Mr. V Dorababu",
    website: "www.satyapowertechnologys.in",
    logo: logoUrl
  };
}

export async function saveCompanyInfo(c: CompanyInfo) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("admin-company-info", JSON.stringify(c));
  }
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) return;
  await setDoc(doc(fb.db, "settings", "company"), c);
}
