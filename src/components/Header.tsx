import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { SITE, whatsappLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="bg-brand-black text-white text-xs">
        <div className="mx-auto max-w-7xl container-px flex h-9 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo className="h-6" />
            <span className="hidden sm:inline font-semibold tracking-wide">Satya Power Technologys</span>
          </Link>
          <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center gap-1.5 font-bold hover:text-brand-red transition">
            <Phone className="h-3.5 w-3.5" /> {SITE.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl container-px flex h-16 items-center justify-between">
        <Link to="/" className="shrink-0"><Logo className="h-14" /></Link>
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-brand-red" }}
              className="text-sm font-semibold text-brand-black hover:text-brand-red transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-brand-red"
          >
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-brand-red px-4 py-2 text-sm font-bold text-white hover:bg-brand-red-dark transition"
          >
            <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="mx-auto max-w-7xl container-px flex flex-col py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold text-brand-black border-b border-border last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <a href={`tel:${SITE.phoneRaw}`} className="py-3 text-sm font-semibold text-brand-red">
              <Phone className="inline h-4 w-4 mr-2" />{SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
