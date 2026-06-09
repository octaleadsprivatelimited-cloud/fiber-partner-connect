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

export function isFirebaseConfigured() {
  const fb = getFirebase();
  if (!fb) return false;
  // @ts-expect-error read options
  const key = fb.app.options.apiKey as string;
  return !!key && !key.startsWith("REPLACE");
}

/* ------------- Auth ------------- */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fb = getFirebase();
    if (!fb) { setLoading(false); return; }
    return onAuthStateChanged(fb.auth, (u) => { setUser(u); setLoading(false); });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      throw new Error("Firebase is not configured. Add real credentials in src/lib/firebase.ts");
    }
    await signInWithEmailAndPassword(fb.auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    const fb = getFirebase();
    if (fb) await signOut(fb.auth);
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
      setProducts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) })));
      setLoading(false);
    }, () => setLoading(false));
  }, []);

  const save = async (p: Product) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      setProducts((prev) => prev.find((x) => x.id === p.id) ? prev.map((x) => x.id === p.id ? p : x) : [...prev, p]);
      return;
    }
    if (p.id && (await getDoc(doc(fb.db, "products", p.id))).exists()) {
      const { id, ...rest } = p;
      await updateDoc(doc(fb.db, "products", id), rest);
    } else if (p.id) {
      const { id, ...rest } = p;
      await setDoc(doc(fb.db, "products", id), rest);
    } else {
      await addDoc(collection(fb.db, "products"), p);
    }
  };

  const remove = async (id: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    await deleteDoc(doc(fb.db, "products", id));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      return URL.createObjectURL(file);
    }
    const r = ref(fb.storage, `products/${Date.now()}-${file.name}`);
    await uploadBytes(r, file);
    return getDownloadURL(r);
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

export async function submitInquiry(data: Omit<Inquiry, "id" | "status" | "createdAt">) {
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) {
    console.warn("Inquiry (Firebase not configured):", data);
    return;
  }
  await addDoc(collection(fb.db, "inquiries"), { ...data, status: "new", createdAt: serverTimestamp() });
}

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  useEffect(() => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    const q = query(collection(fb.db, "inquiries"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => setInquiries(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))));
  }, []);

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i)); return;
    }
    await updateDoc(doc(fb.db, "inquiries", id), { status });
  };
  const remove = async (id: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      setInquiries((prev) => prev.filter((i) => i.id !== id)); return;
    }
    await deleteDoc(doc(fb.db, "inquiries", id));
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
