import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import bg from "@/assets/bg-about.jpg";

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

          {/* Quick Links — collapsible on mobile */}
          <details className="md:open group border-b border-white/10 md:border-0 pb-3 md:pb-0 [&[open]_.chev]:rotate-180" open>
            <summary className="flex items-center justify-between md:block cursor-pointer md:cursor-default list-none md:pointer-events-none">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-0 md:mb-4">Quick Links</h4>
              <ChevronDown className="chev h-4 w-4 transition md:hidden" />
            </summary>
            <ul className="space-y-2 text-sm text-white/70 mt-3 md:mt-0">
              {["/products", "/brands", "/services", "/about", "/contact"].map((p) => (
                <li key={p}><Link to={p} className="hover:text-brand-red">{p.slice(1).replace(/^./, (c) => c.toUpperCase())}</Link></li>
              ))}
            </ul>
          </details>

          {/* Categories — collapsible on mobile */}
          <details className="border-b border-white/10 md:border-0 pb-3 md:pb-0 [&[open]_.chev]:rotate-180" open>
            <summary className="flex items-center justify-between md:block cursor-pointer md:cursor-default list-none md:pointer-events-none">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-0 md:mb-4">Categories</h4>
              <ChevronDown className="chev h-4 w-4 transition md:hidden" />
            </summary>
            <ul className="space-y-2 text-sm text-white/70 mt-3 md:mt-0">
              <li>Fusion Splicers</li>
              <li>OTDR & Power Meters</li>
              <li>Cleavers & VFL</li>
              <li>Spare Parts & Service</li>
            </ul>
          </details>

          {/* Get in Touch — always expanded */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{SITE.address}</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{SITE.phone}</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{SITE.email}</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-white/10 p-2 hover:bg-brand-red transition"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="bg-white/10 p-2 hover:bg-brand-red transition"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="bg-white/10 p-2 hover:bg-brand-red transition"><Instagram className="h-4 w-4" /></a>
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
