import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, MessageSquare, Tag as TagIcon, Settings as SettingsIcon,
  LogOut, Plus, Pencil, Trash2, Upload, AlertCircle, CheckCircle2, X, Mail, Phone,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  useAuth, useProducts, useInquiries, isFirebaseConfigured, getSettings, saveSettings,
  type Inquiry,
} from "@/lib/admin-data";
import { CATEGORIES, BRANDS, type Product, type Category, type Brand } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Fujitomo Electronics" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Tab = "dashboard" | "products" | "inquiries" | "brands" | "settings";

function AdminPage() {
  const { user, loading, login, logout } = useAuth();
  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) return <LoginScreen onLogin={login} />;
  return <Dashboard email={user.email ?? ""} onLogout={logout} />;
}

/* ============ LOGIN ============ */
function LoginScreen({ onLogin }: { onLogin: (e: string, p: string) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string; password: string }>();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/30 py-12 px-4">
      <div className="w-full max-w-md bg-white border border-border p-8">
        <div className="flex justify-center mb-6"><Logo /></div>
        <h1 className="text-2xl font-black text-brand-black text-center">Admin Login</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">Sign in to manage your store</p>

        {!isFirebaseConfigured() && (
          <div className="mt-5 bg-brand-red/10 border border-brand-red p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-bold text-brand-red">Firebase not configured</div>
              <div className="text-muted-foreground mt-1">Replace the placeholder values in <code className="font-mono text-xs bg-muted px-1">src/lib/firebase.ts</code> with your real credentials to enable login.</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(async (d) => {
          setError(null);
          try { await onLogin(d.email, d.password); }
          catch (e: any) { setError(e?.message ?? "Login failed"); }
        })} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-brand-black">Email</label>
            <input type="email" {...register("email", { required: "Required" })} className="mt-1.5 w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
            {errors.email && <span className="text-xs text-brand-red">{errors.email.message}</span>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-brand-black">Password</label>
            <input type="password" {...register("password", { required: "Required", minLength: { value: 6, message: "Min 6 characters" } })} className="mt-1.5 w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
            {errors.password && <span className="text-xs text-brand-red">{errors.password.message}</span>}
          </div>
          {error && <div className="text-sm text-brand-red bg-brand-red/10 p-3 border border-brand-red">{error}</div>}
          <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white font-bold py-3 hover:bg-brand-red-dark transition disabled:opacity-60">
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============ DASHBOARD ============ */
function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const { products, save, remove, uploadImage } = useProducts();
  const { inquiries, updateStatus, remove: removeInquiry } = useInquiries();

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    { id: "brands", label: "Brands", icon: TagIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {!isFirebaseConfigured() && (
        <div className="bg-brand-red text-white text-xs text-center py-2 px-4">
          <AlertCircle className="inline h-3.5 w-3.5 mr-1" />
          Demo mode — Firebase isn't configured, changes won't persist. Update <code className="font-mono bg-black/20 px-1">src/lib/firebase.ts</code> to go live.
        </div>
      )}
      <div className="mx-auto max-w-7xl container-px py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="bg-white border border-border self-start">
          <div className="p-5 border-b border-border">
            <div className="text-[10px] font-bold tracking-[0.2em] text-brand-red">ADMIN</div>
            <div className="text-sm font-bold text-brand-black truncate mt-1">{email || "Demo user"}</div>
          </div>
          <nav className="flex lg:flex-col overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-semibold transition whitespace-nowrap ${tab === t.id ? "bg-brand-red text-white" : "hover:bg-muted text-brand-black"}`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
            <button onClick={onLogout} className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-brand-black hover:bg-muted border-t border-border mt-auto">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </nav>
        </aside>

        <section>
          {tab === "dashboard" && <DashboardOverview products={products} inquiries={inquiries} onTab={setTab} />}
          {tab === "products" && <ProductsManager products={products} save={save} remove={remove} uploadImage={uploadImage} />}
          {tab === "inquiries" && <InquiriesManager inquiries={inquiries} updateStatus={updateStatus} remove={removeInquiry} />}
          {tab === "brands" && <BrandsManager />}
          {tab === "settings" && <SettingsManager />}
        </section>
      </div>
    </div>
  );
}

/* ============ Overview ============ */
function DashboardOverview({ products, inquiries, onTab }: { products: Product[]; inquiries: Inquiry[]; onTab: (t: Tab) => void }) {
  const unread = inquiries.filter((i) => i.status === "new").length;
  const stats = [
    { label: "Total Products", value: products.length, tab: "products" as const },
    { label: "Featured", value: products.filter((p) => p.featured).length, tab: "products" as const },
    { label: "Inquiries", value: inquiries.length, tab: "inquiries" as const },
    { label: "Unread Inquiries", value: unread, tab: "inquiries" as const, accent: true },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-brand-black">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <button key={s.label} onClick={() => onTab(s.tab)} className={`text-left p-6 border transition ${s.accent ? "bg-brand-red text-white border-brand-red" : "bg-white border-border hover:border-brand-red"}`}>
            <div className={`text-xs font-bold tracking-[0.2em] uppercase ${s.accent ? "text-white/80" : "text-muted-foreground"}`}>{s.label}</div>
            <div className="text-4xl font-black mt-2">{s.value}</div>
          </button>
        ))}
      </div>

      <div className="bg-white border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-black text-brand-black">Recent Messages</h2>
          <button onClick={() => onTab("inquiries")} className="text-sm font-bold text-brand-red hover:underline">View all →</button>
        </div>
        {inquiries.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">No inquiries yet. Submissions from the contact form will appear here.</div>
        ) : (
          <ul className="divide-y divide-border">
            {inquiries.slice(0, 5).map((i) => (
              <li key={i.id} className="p-5 flex items-start gap-4">
                <div className={`h-2 w-2 mt-2 rounded-full ${i.status === "new" ? "bg-brand-red" : "bg-muted-foreground/40"}`} />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-brand-black">{i.name} <span className="font-normal text-xs text-muted-foreground">— {i.phone}</span></div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{i.message}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ============ Products manager ============ */
function ProductsManager({ products, save, remove, uploadImage }: {
  products: Product[];
  save: (p: Product) => Promise<void>;
  remove: (id: string) => Promise<void>;
  uploadImage: (f: File) => Promise<string>;
}) {
  const [editing, setEditing] = useState<Product | null>(null);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-brand-black">Products</h1>
        <button onClick={() => setEditing({ id: "", name: "", brand: "INNO", category: "Fusion Splicers", description: "", image: "" })}
          className="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-4 py-2.5 hover:bg-brand-red-dark transition">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="bg-white border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Image</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Brand</th>
              <th className="text-left p-3">Featured</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30">
                <td className="p-3"><img src={p.image} alt="" className="h-12 w-12 object-cover" /></td>
                <td className="p-3 font-semibold text-brand-black">{p.name}</td>
                <td className="p-3 text-muted-foreground">{p.category}</td>
                <td className="p-3"><span className="text-xs font-bold bg-brand-black text-white px-2 py-1">{p.brand}</span></td>
                <td className="p-3">{p.featured ? <CheckCircle2 className="h-4 w-4 text-brand-red" /> : <span className="text-muted-foreground">—</span>}</td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(p)} className="p-2 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) remove(p.id); }} className="p-2 hover:bg-brand-red hover:text-white"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && <ProductEditor product={editing} onClose={() => setEditing(null)} onSave={async (p) => { await save(p); setEditing(null); }} uploadImage={uploadImage} />}
      </AnimatePresence>
    </div>
  );
}

function ProductEditor({ product, onClose, onSave, uploadImage }: {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => Promise<void>;
  uploadImage: (f: File) => Promise<string>;
}) {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<Product>({ defaultValues: product });
  const image = watch("image");
  const [uploading, setUploading] = useState(false);
  const isNew = !product.id;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-black text-brand-black">{isNew ? "Add Product" : "Edit Product"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit(async (d) => {
          const id = d.id || d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50);
          await onSave({ ...d, id });
        })} className="p-5 space-y-4">
          {isNew && (
            <Field label="ID (optional, slug)">
              <input {...register("id")} placeholder="auto-generated from name" className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
            </Field>
          )}
          <Field label="Name" error={errors.name?.message}>
            <input {...register("name", { required: "Required" })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select {...register("category")} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red bg-white">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Brand">
              <select {...register("brand")} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red bg-white">
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Description" error={errors.description?.message}>
            <textarea rows={3} {...register("description", { required: "Required", maxLength: 1000 })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
          </Field>

          <Field label="Image">
            <div className="flex items-center gap-4">
              {image && <img src={image} alt="" className="h-20 w-20 object-cover border border-border" />}
              <label className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-bold text-sm cursor-pointer hover:border-brand-red transition">
                <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  setUploading(true);
                  try { const url = await uploadImage(f); setValue("image", url); } finally { setUploading(false); }
                }} />
              </label>
              <input {...register("image", { required: "Required" })} placeholder="or paste URL" className="flex-1 border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
            </div>
            {errors.image && <span className="text-xs text-brand-red mt-1 block">{errors.image.message}</span>}
          </Field>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="h-4 w-4 accent-brand-red" />
            <span className="text-sm font-bold">Show on homepage (featured)</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 border border-border font-bold py-3 hover:bg-muted">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-red text-white font-bold py-3 hover:bg-brand-red-dark disabled:opacity-60">
              {isSubmitting ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ============ Inquiries ============ */
function InquiriesManager({ inquiries, updateStatus, remove }: {
  inquiries: Inquiry[];
  updateStatus: (id: string, s: Inquiry["status"]) => Promise<void>;
  remove: (id: string) => Promise<void>;
}) {
  const [filter, setFilter] = useState<"all" | "new" | "read" | "resolved">("all");
  const list = inquiries.filter((i) => filter === "all" || i.status === filter);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-brand-black">Inquiries</h1>
      <div className="flex gap-2 flex-wrap">
        {(["all", "new", "read", "resolved"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`text-xs font-bold uppercase tracking-wider px-4 py-2 transition ${filter === f ? "bg-brand-red text-white" : "bg-white border border-border hover:border-brand-red"}`}>
            {f} ({f === "all" ? inquiries.length : inquiries.filter((i) => i.status === f).length})
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="bg-white border border-border p-12 text-center text-muted-foreground text-sm">No inquiries to show.</div>
      ) : (
        <div className="space-y-3">
          {list.map((i) => (
            <div key={i.id} className="bg-white border border-border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-2 w-2 rounded-full ${i.status === "new" ? "bg-brand-red" : i.status === "resolved" ? "bg-green-500" : "bg-muted-foreground/40"}`} />
                    <span className="font-bold text-brand-black">{i.name}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{i.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-1">
                    {i.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{i.phone}</span>}
                    {i.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{i.email}</span>}
                  </div>
                  {i.subject && <div className="font-semibold mt-2">{i.subject}</div>}
                  <p className="text-sm text-foreground mt-2">{i.message}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {i.status !== "read" && <button onClick={() => updateStatus(i.id!, "read")} className="text-xs font-bold border border-border px-3 py-1.5 hover:border-brand-red">Mark read</button>}
                  {i.status !== "resolved" && <button onClick={() => updateStatus(i.id!, "resolved")} className="text-xs font-bold bg-brand-black text-white px-3 py-1.5 hover:bg-brand-red">Resolve</button>}
                  <button onClick={() => { if (confirm("Delete this inquiry?")) remove(i.id!); }} className="text-xs font-bold text-brand-red hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ Brands manager (lightweight) ============ */
function BrandsManager() {
  const KEY = "admin-brand-descriptions";
  const [items, setItems] = useState<{ name: string; description: string }[]>([]);
  useEffect(() => {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(KEY) : null;
    setItems(raw ? JSON.parse(raw) : BRANDS.map((b) => ({ name: b, description: "" })));
  }, []);
  const update = (i: number, description: string) => {
    const next = items.map((it, idx) => idx === i ? { ...it, description } : it);
    setItems(next); localStorage.setItem(KEY, JSON.stringify(next));
  };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-brand-black">Brands</h1>
      <p className="text-sm text-muted-foreground">Edit each brand's description. Logo uploads will sync to Firebase Storage once configured.</p>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={it.name} className="bg-white border border-border p-5">
            <div className="font-black text-brand-black text-lg">{it.name}</div>
            <textarea
              value={it.description}
              onChange={(e) => update(i, e.target.value)}
              placeholder="Short brand description shown on the Brands page"
              rows={2}
              className="mt-2 w-full border border-input px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Settings ============ */
function SettingsManager() {
  const [watermarkEnabled, setWE] = useState(true);
  const [saved, setSaved] = useState(false);
  useEffect(() => { getSettings().then((s) => setWE(s.watermarkEnabled)); }, []);
  const persist = async (v: boolean) => {
    setWE(v); await saveSettings({ watermarkEnabled: v });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-brand-black">Settings</h1>
      <div className="bg-white border border-border p-6 max-w-2xl">
        <h2 className="font-black text-brand-black">Product Image Watermark</h2>
        <p className="text-sm text-muted-foreground mt-1">Overlay the Fujitomo logo and phone number on product images.</p>
        <label className="flex items-center gap-3 mt-5 cursor-pointer">
          <input type="checkbox" checked={watermarkEnabled} onChange={(e) => persist(e.target.checked)} className="h-5 w-5 accent-brand-red" />
          <span className="font-bold">Enable watermark overlay</span>
        </label>
        {saved && <div className="mt-3 text-xs text-brand-red font-bold">Saved ✓</div>}
      </div>
    </div>
  );
}

/* ============ Reusable ============ */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-black">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-brand-red mt-1 block">{error}</span>}
    </label>
  );
}
