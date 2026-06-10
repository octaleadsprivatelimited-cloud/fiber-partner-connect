import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white mt-20">
      <div className="mx-auto max-w-7xl container-px py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Logo className="h-16" />
          <p className="mt-4 text-sm text-white/70 max-w-xs">{SITE.tagline}. Authorized INNO Distributor for Andhra Pradesh & Telangana.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {["/products", "/brands", "/services", "/about", "/contact"].map((p) => (
              <li key={p}><Link to={p} className="hover:text-brand-red">{p.slice(1).replace(/^./, (c) => c.toUpperCase())}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Fusion Splicers</li>
            <li>OTDR & Power Meters</li>
            <li>Cleavers & VFL</li>
            <li>Spare Parts & Service</li>
          </ul>
        </div>
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
    </footer>
  );
}
