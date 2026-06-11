import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Youtube, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import bg from "@/assets/bg-about.jpg";

const QUICK_LINKS: { to: string; label: string }[] = [
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const CATEGORIES = [
  "Fusion Splicers",
  "OTDR & Power Meters",
  "Cleavers & VFL",
  "Spare Parts & Service",
];

export function Footer() {
  return (
    <footer className="relative bg-brand-black text-white overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/85 via-brand-black/80 to-brand-black/90" />
      <div className="relative">
        <div className="mx-auto max-w-7xl container-px py-14 grid gap-6 md:gap-10 md:grid-cols-4">
          <div>
            <Logo className="h-16" />
            <p className="mt-4 text-sm text-white/70 max-w-xs">{SITE.tagline}. Authorized INNO Distributor for Andhra Pradesh & Telangana.</p>
          </div>

          {/* Quick Links — collapsible on mobile, always open on desktop */}
          <div>
            <details className="md:hidden border-b border-white/10 pb-3 [&[open]_.chev]:rotate-180">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h4 className="font-bold text-sm uppercase tracking-wider">Quick Links</h4>
                <ChevronDown className="chev h-4 w-4 transition" />
              </summary>
              <ul className="space-y-2 text-sm text-white/70 mt-3">
                {QUICK_LINKS.map((l) => (
                  <li key={l.to}><Link to={l.to} className="hover:text-brand-red">{l.label}</Link></li>
                ))}
              </ul>
            </details>
            <div className="hidden md:block">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {QUICK_LINKS.map((l) => (
                  <li key={l.to}><Link to={l.to} className="hover:text-brand-red">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categories — collapsible on mobile, always open on desktop */}
          <div>
            <details className="md:hidden border-b border-white/10 pb-3 [&[open]_.chev]:rotate-180">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h4 className="font-bold text-sm uppercase tracking-wider">Categories</h4>
                <ChevronDown className="chev h-4 w-4 transition" />
              </summary>
              <ul className="space-y-2 text-sm text-white/70 mt-3">
                {CATEGORIES.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </details>
            <div className="hidden md:block">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {CATEGORIES.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>

          {/* Get in Touch — always expanded */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{SITE.address}</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{SITE.phone}</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{SITE.email}</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="bg-white/10 p-2 hover:bg-brand-red transition"><Instagram className="h-4 w-4" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="bg-white/10 p-2 hover:bg-brand-red transition"><Youtube className="h-4 w-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="bg-white/10 p-2 hover:bg-brand-red transition"><Facebook className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="bg-white/10 p-2 hover:bg-brand-red transition"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl container-px py-4 text-xs text-white/50 flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <span>{SITE.website}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
