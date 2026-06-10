import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  LayoutDashboard, Package, MessageSquare, Tag as TagIcon, Settings as SettingsIcon,
  LogOut, Plus, Pencil, Trash2, Upload, AlertCircle, CheckCircle2, X, Mail, Phone,
  TrendingUp, TrendingDown, ShoppingBag, Users, Eye, Menu, Search, Bell,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  useAuth, useProducts, useInquiries, isFirebaseConfigured, getSettings, saveSettings,
  DEMO_CREDENTIALS,
  type Inquiry,
} from "@/lib/admin-data";
import { CATEGORIES, BRANDS, type Product, type Category, type Brand } from "@/lib/products";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: `Admin — ${SITE.name}` }, { name: "robots", content: "noindex" }] }),
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
              <div className="font-bold text-brand-red">Demo mode</div>
              <div className="text-muted-foreground mt-1">
                Sign in with the demo credentials below. Changes won't persist until Firebase keys are added in <code className="font-mono text-xs bg-muted px-1">src/lib/firebase.ts</code>.
              </div>
              <div className="mt-3 bg-white border border-brand-red/30 p-3 font-mono text-xs space-y-1">
                <div><span className="text-muted-foreground">Email:</span> <span className="font-bold text-brand-black select-all">{DEMO_CREDENTIALS.email}</span></div>
                <div><span className="text-muted-foreground">Password:</span> <span className="font-bold text-brand-black select-all">{DEMO_CREDENTIALS.password}</span></div>
              </div>
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { products, save, remove, uploadImage } = useProducts();
  const { inquiries, updateStatus, remove: removeInquiry } = useInquiries();

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    { id: "brands", label: "Brands", icon: TagIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const active = tabs.find((t) => t.id === tab);
  const unreadCount = inquiries.filter((i) => i.status === "new").length;

  const SidebarBody = (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Logo />
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {tabs.map((t) => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-brand-red/10 text-brand-red"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{t.label}</span>
              {t.id === "inquiries" && unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-brand-red text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{unreadCount}</span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-200 space-y-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-9 w-9 rounded-full bg-brand-red text-white grid place-items-center font-bold text-sm shrink-0">
            {(email || "A")[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-slate-900 truncate">{email || "Admin"}</div>
            <div className="text-[11px] text-slate-500">Administrator</div>
          </div>
        </div>
        <button onClick={onLogout} className="w-full inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold py-2 rounded-lg hover:bg-slate-100 transition text-sm">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {!isFirebaseConfigured() && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs text-center py-2 px-4">
          <AlertCircle className="inline h-3.5 w-3.5 mr-1" />
          Demo mode — Firebase isn't configured. Changes won't persist.
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[260px_1fr] min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col bg-white border-r border-slate-200 sticky top-0 h-screen">
          {SidebarBody}
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/40 z-40"
              />
              <motion.aside
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="lg:hidden fixed inset-y-0 left-0 w-[260px] bg-white z-50 flex flex-col shadow-xl"
              >
                {SidebarBody}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Right column */}
        <div className="flex flex-col min-w-0">
          {/* Top header */}
          <header className="h-14 sm:h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-slate-700" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider hidden sm:block">Admin Panel</div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">{active?.label}</h1>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand-red text-white grid place-items-center font-bold text-sm shrink-0 lg:hidden">
              {(email || "A")[0].toUpperCase()}
            </div>
          </header>

          <section className="p-4 sm:p-6 lg:p-8 min-w-0">
            {tab === "dashboard" && <DashboardOverview products={products} inquiries={inquiries} onTab={setTab} />}
            {tab === "products" && <ProductsManager products={products} save={save} remove={remove} uploadImage={uploadImage} />}
            {tab === "inquiries" && <InquiriesManager inquiries={inquiries} updateStatus={updateStatus} remove={removeInquiry} />}
            {tab === "brands" && <BrandsManager />}
            {tab === "settings" && <SettingsManager />}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ============ Overview ============ */
function DashboardOverview({ products, inquiries, onTab }: { products: Product[]; inquiries: Inquiry[]; onTab: (t: Tab) => void }) {
  const unread = inquiries.filter((i) => i.status === "new").length;
  const resolved = inquiries.filter((i) => i.status === "resolved").length;

  const stats = [
    {
      label: "Total Products", value: products.length, icon: ShoppingBag,
      iconBg: "bg-brand-red/10", iconColor: "text-brand-red",
      delta: "+12%", up: true, tab: "products" as const,
    },
    {
      label: "Inquiries", value: inquiries.length, icon: MessageSquare,
      iconBg: "bg-blue-50", iconColor: "text-blue-600",
      delta: "+8%", up: true, tab: "inquiries" as const,
    },
    {
      label: "Unread", value: unread, icon: Eye,
      iconBg: "bg-amber-50", iconColor: "text-amber-600",
      delta: unread > 0 ? "new" : "0", up: unread > 0, tab: "inquiries" as const,
    },
    {
      label: "Featured", value: products.filter((p) => p.featured).length, icon: Users,
      iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
      delta: "live", up: true, tab: "products" as const,
    },
  ];

  // Category distribution for bar chart
  const chartData = useMemo(() => {
    const byCat = new Map<string, number>();
    products.forEach((p) => byCat.set(p.category, (byCat.get(p.category) ?? 0) + 1));
    return Array.from(byCat.entries()).map(([name, count]) => ({
      name: name.length > 10 ? name.slice(0, 10) + "…" : name,
      products: count,
      featured: products.filter((p) => p.category === name && p.featured).length,
    }));
  }, [products]);

  // Inquiry status donut
  const pieData = [
    { name: "New", value: unread, color: "#dc2626" },
    { name: "Read", value: inquiries.filter((i) => i.status === "read").length, color: "#3b82f6" },
    { name: "Resolved", value: resolved, color: "#10b981" },
  ].filter((d) => d.value > 0);
  const pieFallback = pieData.length === 0 ? [{ name: "No data", value: 1, color: "#e5e7eb" }] : pieData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="text-sm text-slate-500 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onTab(s.tab)}
            className="text-left bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between">
              <div className={`h-9 w-9 rounded-lg grid place-items-center ${s.iconBg}`}>
                <s.icon className={`h-4.5 w-4.5 ${s.iconColor}`} />
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${s.up ? "text-emerald-600" : "text-slate-400"}`}>
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{s.delta}</span>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-bold text-slate-900">Products by Category</h2>
              <p className="text-xs text-slate-500 mt-1">Distribution across your catalog</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand-red" /> Products</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-slate-300" /> Featured</span>
            </div>
          </div>
          <div className="h-64 sm:h-72 mt-4">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">No product data yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(220,38,38,0.06)" }} contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                  <Bar dataKey="products" fill="#dc2626" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="featured" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900">Inquiry Status</h2>
          <p className="text-xs text-slate-500 mt-1">Breakdown of customer messages</p>
          <div className="h-48 sm:h-56 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieFallback} dataKey="value" innerRadius={50} outerRadius={78} paddingAngle={2}>
                  {pieFallback.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2 mt-2">
            {[
              { name: "New", value: unread, color: "#dc2626" },
              { name: "Read", value: inquiries.filter((i) => i.status === "read").length, color: "#3b82f6" },
              { name: "Resolved", value: resolved, color: "#10b981" },
            ].map((d) => (
              <li key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} /> {d.name}</span>
                <span className="font-semibold tabular-nums text-slate-900">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent messages */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Recent Messages</h2>
          <button onClick={() => onTab("inquiries")} className="text-sm font-semibold text-brand-red hover:underline">View all →</button>
        </div>
        {inquiries.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">No inquiries yet. Submissions from the contact form will appear here.</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {inquiries.slice(0, 5).map((i) => (
              <li key={i.id} className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                <div className={`h-9 w-9 rounded-full grid place-items-center text-white text-xs font-bold shrink-0 ${i.status === "new" ? "bg-brand-red" : i.status === "resolved" ? "bg-emerald-500" : "bg-blue-500"}`}>
                  {i.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm truncate">{i.name} <span className="font-normal text-xs text-slate-500">— {i.phone}</span></div>
                  <div className="text-sm text-slate-500 line-clamp-1 mt-0.5">{i.message}</div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 ${i.status === "new" ? "bg-red-50 text-brand-red" : i.status === "resolved" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{i.status ?? "new"}</span>
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Products</h2>
          <p className="text-sm text-slate-500 mt-1">{products.length} item{products.length === 1 ? "" : "s"} in your catalog</p>
        </div>
        <button onClick={() => setEditing({ id: "", name: "", brand: "INNO", category: "Fusion Splicers", description: "", image: "" })}
          className="inline-flex items-center gap-2 bg-brand-red text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-red-dark transition text-sm shadow-sm">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Mobile card list */}
      <div className="grid sm:hidden gap-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3">
            <img src={p.image} alt="" className="h-16 w-16 object-cover rounded-lg shrink-0 bg-slate-100" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900 text-sm truncate">{p.name}</div>
              <div className="text-xs text-slate-500 mt-0.5 truncate">{p.category}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded">{p.brand}</span>
                {p.featured && <span className="text-[10px] font-bold bg-red-50 text-brand-red px-1.5 py-0.5 rounded">FEATURED</span>}
              </div>
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <button onClick={() => setEditing(p)} className="p-1.5 rounded hover:bg-slate-100"><Pencil className="h-4 w-4 text-slate-600" /></button>
              <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) remove(p.id); }} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="h-4 w-4 text-brand-red" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="text-left p-3 font-semibold">Image</th>
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-left p-3 font-semibold">Brand</th>
                <th className="text-left p-3 font-semibold">Featured</th>
                <th className="text-right p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className="p-3"><img src={p.image} alt="" className="h-12 w-12 object-cover rounded-md bg-slate-100" /></td>
                  <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                  <td className="p-3 text-slate-600">{p.category}</td>
                  <td className="p-3"><span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded">{p.brand}</span></td>
                  <td className="p-3">{p.featured ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <span className="text-slate-300">—</span>}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button onClick={() => setEditing(p)} className="p-2 rounded hover:bg-slate-100"><Pencil className="h-4 w-4 text-slate-600" /></button>
                    <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) remove(p.id); }} className="p-2 rounded hover:bg-red-50 ml-1"><Trash2 className="h-4 w-4 text-brand-red" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-slate-900">{isNew ? "Add Product" : "Edit Product"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit(async (d) => {
          const id = d.id || d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50);
          await onSave({ ...d, id });
        })} className="p-5 space-y-4">
          {isNew && (
            <Field label="ID (optional, slug)">
              <input {...register("id")} placeholder="auto-generated from name" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
            </Field>
          )}
          <Field label="Name" error={errors.name?.message}>
            <input {...register("name", { required: "Required" })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category">
              <select {...register("category")} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red bg-white">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Brand">
              <select {...register("brand")} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red bg-white">
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Description" error={errors.description?.message}>
            <textarea rows={3} {...register("description", { required: "Required", maxLength: 1000 })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
          </Field>

          <Field label="Image">
            <div className="flex flex-wrap items-center gap-3">
              {image && <img src={image} alt="" className="h-20 w-20 object-cover rounded-lg border border-slate-200" />}
              <label className="inline-flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2.5 font-semibold text-sm cursor-pointer hover:border-brand-red hover:text-brand-red transition">
                <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  setUploading(true);
                  try { const url = await uploadImage(f); setValue("image", url); } finally { setUploading(false); }
                }} />
              </label>
              <input {...register("image", { required: "Required" })} placeholder="or paste URL" className="flex-1 min-w-[200px] border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
            </div>
            {errors.image && <span className="text-xs text-brand-red mt-1 block">{errors.image.message}</span>}
          </Field>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="h-4 w-4 accent-brand-red" />
            <span className="text-sm font-semibold text-slate-700">Show on homepage (featured)</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 font-semibold py-2.5 rounded-lg hover:bg-slate-50 text-sm">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-red text-white font-semibold py-2.5 rounded-lg hover:bg-brand-red-dark disabled:opacity-60 text-sm shadow-sm">
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

/* ============ Brands manager (grid) ============ */
interface BrandItem { name: string; description: string; logo?: string }
function BrandsManager() {
  const KEY = "admin-brand-descriptions";
  const [items, setItems] = useState<BrandItem[]>([]);
  const [editing, setEditing] = useState<{ index: number; item: BrandItem } | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(KEY) : null;
    setItems(raw ? JSON.parse(raw) : BRANDS.map((b) => ({ name: b, description: "" })));
  }, []);

  const persist = (next: BrandItem[]) => {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  const saveItem = (i: number, item: BrandItem) => {
    persist(i === -1 ? [...items, item] : items.map((it, idx) => idx === i ? item : it));
    setEditing(null); setAdding(false);
  };
  const removeItem = (i: number) => {
    if (!confirm(`Delete brand "${items[i].name}"?`)) return;
    persist(items.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-black">Brands</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage brand logos and descriptions shown on the public Brands page.</p>
        </div>
        <button onClick={() => setAdding(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold px-4 py-2.5 rounded-md hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> Add Brand
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={it.name + i} className="group bg-white rounded-xl border border-border p-5 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 grid place-items-center overflow-hidden shrink-0 border border-border">
                {it.logo
                  ? <img src={it.logo} alt={it.name} className="h-full w-full object-contain p-1" />
                  : <span className="font-black text-violet-700 text-lg">{it.name[0]}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-black text-brand-black text-lg truncate">{it.name}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Brand</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-3 flex-1 min-h-[3.75rem]">
              {it.description || <span className="italic text-muted-foreground/70">No description yet.</span>}
            </p>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <button onClick={() => setEditing({ index: i, item: it })} className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-border px-3 py-2 rounded-md hover:border-violet-500 hover:text-violet-700 transition">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button onClick={() => removeItem(i)} className="inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-border px-3 py-2 rounded-md hover:bg-brand-red hover:border-brand-red hover:text-white transition">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {(editing || adding) && (
          <BrandEditor
            initial={editing?.item ?? { name: "", description: "", logo: "" }}
            isNew={adding}
            onClose={() => { setEditing(null); setAdding(false); }}
            onSave={(item) => saveItem(editing?.index ?? -1, item)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function BrandEditor({ initial, isNew, onClose, onSave }: { initial: BrandItem; isNew: boolean; onClose: () => void; onSave: (item: BrandItem) => void }) {
  const [form, setForm] = useState<BrandItem>(initial);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="bg-white w-full max-w-lg rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-black text-brand-black">{isNew ? "Add Brand" : "Edit Brand"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Brand Name">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" />
          </Field>
          <Field label="Description">
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" />
          </Field>
          <Field label="Logo URL (optional)">
            <input value={form.logo ?? ""} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder="https://…" className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" />
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-border font-bold py-2.5 rounded hover:bg-muted">Cancel</button>
            <button onClick={() => form.name.trim() && onSave(form)} className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold py-2.5 rounded hover:opacity-90">Save</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============ Settings ============ */
interface CompanyInfo {
  name: string; tagline: string; phone: string; phoneAlt: string; email: string;
  address: string; gstin: string; founded: string; ceo: string; website: string;
}
const COMPANY_KEY = "admin-company-info";
const defaultCompany = (): CompanyInfo => ({
  name: SITE.name, tagline: SITE.tagline, phone: SITE.phone, phoneAlt: SITE.phoneAlt,
  email: SITE.email, address: SITE.address, gstin: SITE.gstin,
  founded: String(SITE.founded), ceo: SITE.ceo, website: SITE.website,
});

function SettingsManager() {
  const [watermarkEnabled, setWE] = useState(true);
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState<CompanyInfo>(defaultCompany);
  const [companySaved, setCompanySaved] = useState(false);

  useEffect(() => {
    getSettings().then((s) => setWE(s.watermarkEnabled));
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(COMPANY_KEY) : null;
    if (raw) { try { setCompany({ ...defaultCompany(), ...JSON.parse(raw) }); } catch {} }
  }, []);

  const persistWM = async (v: boolean) => {
    setWE(v); await saveSettings({ watermarkEnabled: v });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };
  const saveCompany = () => {
    localStorage.setItem(COMPANY_KEY, JSON.stringify(company));
    setCompanySaved(true); setTimeout(() => setCompanySaved(false), 1800);
  };
  const set = <K extends keyof CompanyInfo>(k: K, v: CompanyInfo[K]) => setCompany((c) => ({ ...c, [k]: v }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-black">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage company information and store preferences.</p>
      </div>

      {/* Company details */}
      <div className="bg-white rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h2 className="font-black text-brand-black">Company Information</h2>
          <p className="text-sm text-muted-foreground mt-1">Contact details and business profile shown across the site.</p>
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-4">
          <Field label="Company Name"><input value={company.name} onChange={(e) => set("name", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="Tagline / Slogan"><input value={company.tagline} onChange={(e) => set("tagline", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="Primary Phone"><input value={company.phone} onChange={(e) => set("phone", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="Alternate Phone"><input value={company.phoneAlt} onChange={(e) => set("phoneAlt", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="Email"><input type="email" value={company.email} onChange={(e) => set("email", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="Website"><input value={company.website} onChange={(e) => set("website", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="GSTIN"><input value={company.gstin} onChange={(e) => set("gstin", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="Founded Year"><input value={company.founded} onChange={(e) => set("founded", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <Field label="CEO / Owner"><input value={company.ceo} onChange={(e) => set("ceo", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          <div className="sm:col-span-2">
            <Field label="Address"><textarea rows={3} value={company.address} onChange={(e) => set("address", e.target.value)} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 rounded" /></Field>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3 pt-2">
            <button onClick={saveCompany} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold px-5 py-2.5 rounded hover:opacity-90">Save Changes</button>
            {companySaved && <span className="text-xs font-bold text-emerald-600">Saved ✓</span>}
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="bg-white rounded-xl border border-border p-6 max-w-2xl">
        <h2 className="font-black text-brand-black">Product Image Watermark</h2>
        <p className="text-sm text-muted-foreground mt-1">Overlay the company logo and phone number on product images.</p>
        <label className="flex items-center gap-3 mt-5 cursor-pointer">
          <input type="checkbox" checked={watermarkEnabled} onChange={(e) => persistWM(e.target.checked)} className="h-5 w-5 accent-violet-600" />
          <span className="font-bold">Enable watermark overlay</span>
        </label>
        {saved && <div className="mt-3 text-xs text-emerald-600 font-bold">Saved ✓</div>}
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
