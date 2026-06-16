import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Youtube, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

const COLUMNS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { to: "/products", label: "Products" },
      { to: "/brands", label: "Brands" },
      { to: "/services", label: "Services" },
      { to: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
      { to: "/services", label: "Service Centers" },
    ],
  },
  {
    title: "Categories",
    links: [
      { to: "/products?category=Fusion%20Splicers", label: "Fusion Splicers" },
      { to: "/products?category=OTDR", label: "OTDR & Power Meters" },
      { to: "/products?category=Cleavers", label: "Cleavers & VFL" },
      { to: "/services", label: "Spare Parts & Service" },
    ],
  },
];

export function Footer() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <footer className="relative bg-gradient-to-b from-[#0b1424] via-brand-black to-[#070b14] text-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl container-px pt-16 md:pt-20 pb-8">
        {/* top row: brand + columns */}
        <div className="grid gap-6 md:gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="h-14" />
            <p className="mt-5 text-sm text-white/65 max-w-xs leading-relaxed">
              {SITE.tagline}. Authorized Distributor for Inno, Grandway, Claron & EXFO across Andhra Pradesh & Telangana.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex gap-2.5"><MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />{SITE.address}</li>
              <li className="flex gap-2.5"><Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />{SITE.phone}</li>
              <li className="flex gap-2.5"><Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />{SITE.email}</li>
            </ul>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <button
                type="button"
                onClick={() => setOpenMenu((current) => current === c.title ? null : c.title)}
                className="mb-3 flex w-full items-center justify-between gap-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 hover:text-white transition"
                aria-expanded={openMenu === c.title}
              >
                {c.title}
                <ChevronDown className={`h-4 w-4 transition ${openMenu === c.title ? "rotate-180" : ""}`} />
              </button>
              <ul className={`${openMenu === c.title ? "flex" : "hidden"} flex-col gap-3 text-sm text-white/85 pb-4 pl-1`}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} onClick={() => setOpenMenu(null)} className="inline-flex items-center gap-1.5 hover:text-primary hover:translate-x-0.5 transition-all">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-5">Follow</h4>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition"><Instagram className="h-4 w-4" /></a>
              <a href="https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg" target="_blank" rel="noreferrer" aria-label="YouTube" className="h-9 w-9 border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition"><Youtube className="h-4 w-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="h-9 w-9 border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition"><Facebook className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-9 w-9 border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>{SITE.website}</span>
        </div>
      </div>
    </footer>
  );
}
