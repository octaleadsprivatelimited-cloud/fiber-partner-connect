import { NavLink, Link } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, Search, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { SITE, whatsappLink } from "@/lib/site";

const PRODUCT_MENU = [
  "Fusion Splicers",
  "OTDR",
  "Power Meters",
  "Cleavers",
  "Visual Fault Locators",
  "Cleaning Kits",
  "Spare Parts & Service",
];

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* thin utility top bar (HCLTech style) */}
      <div className="hidden md:block bg-brand-black text-white/80 text-[11px]">
        <div className="mx-auto max-w-7xl container-px flex h-8 items-center justify-end gap-6">
          <a href={`tel:${SITE.phoneRaw}`} className="hover:text-white inline-flex items-center gap-1.5">
            <Phone className="h-3 w-3" /> {SITE.phone}
          </a>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <Link to="/gallery" className="hover:text-white">Gallery</Link>
        </div>
      </div>

      {/* main bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl container-px flex h-16 md:h-20 items-center justify-between gap-6">
          <Link to="/" className="shrink-0"><Logo className="h-12 md:h-14" /></Link>

          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {nav.slice(1, 6).map((n) => (
              n.to === "/products" ? (
                <div
                  key={n.to}
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setProductsOpen((v) => !v)}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold tracking-wide uppercase text-brand-black hover:text-primary transition"
                    aria-expanded={productsOpen}
                  >
                    {n.label}
                    <ChevronDown className={`h-3 w-3 opacity-50 transition ${productsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {productsOpen && (
                    <div className="absolute left-1/2 top-full z-50 mt-6 w-[320px] -translate-x-1/2 border border-border bg-white shadow-2xl">
                      <div className="grid gap-1 p-3">
                        {PRODUCT_MENU.map((label) => (
                          <Link
                            key={label}
                            to={`/products?category=${encodeURIComponent(label)}`}
                            onClick={() => setProductsOpen(false)}
                            className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-brand-black hover:bg-muted hover:text-primary transition"
                          >
                            {label}
                            <ChevronDown className="h-3.5 w-3.5 -rotate-90 opacity-40" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 text-[13px] font-semibold tracking-wide uppercase hover:text-primary transition ${isActive ? "text-primary" : "text-brand-black"}`
                  }
                >
                  {n.label}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </NavLink>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button aria-label="Search" className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
              <Search className="h-4 w-4 text-brand-black" />
            </button>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/90 transition rounded-none"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Get a Quote</span>
              <span className="sm:hidden">Quote</span>
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <>
          <div className="lg:hidden fixed inset-0 top-16 bg-black/40 z-40" onClick={() => setOpen(false)} />
          <div className="lg:hidden fixed left-0 right-0 top-16 bottom-0 bg-white z-40 overflow-y-auto">
            <div className="mx-auto max-w-7xl container-px flex flex-col py-2">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className="py-4 text-sm font-semibold uppercase tracking-wide text-brand-black border-b border-border last:border-0 flex items-center justify-between">
                  {n.label}
                  <ChevronDown className="h-4 w-4 -rotate-90 opacity-50" />
                </Link>
              ))}
              <a href={`tel:${SITE.phoneRaw}`} className="py-4 text-sm font-semibold text-primary">
                <Phone className="inline h-4 w-4 mr-2" />{SITE.phone}
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
