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
    <footer className="bg-muted text-foreground border-t border-border">
      <div className="mx-auto max-w-[1920px] px-6 md:px-16 pt-12 md:pt-14 pb-6">
        <div className="grid gap-6 md:gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="h-12" />
            <p className="mt-5 text-[13px] text-muted-foreground max-w-xs leading-relaxed">
              {SITE.tagline}. Authorized Distributor for Inno, Grandway, Claron & EXFO across Andhra Pradesh & Telangana.
            </p>
            <ul className="mt-6 space-y-2.5 text-[13px] text-muted-foreground">
              <li className="flex gap-2.5"><MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />{SITE.address}</li>
              <li className="flex gap-2.5"><Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />{SITE.phone}</li>
              <li className="flex gap-2.5"><Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />{SITE.email}</li>
            </ul>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.title} className="md:col-span-2 border-b border-border md:border-0 py-1 md:py-0">
              <button
                type="button"
                onClick={() => setOpenMenu((current) => current === c.title ? null : c.title)}
                className="md:mb-4 flex w-full items-center justify-between gap-3 text-left text-[13px] font-medium text-foreground hover:text-primary transition py-3 md:py-0"
                aria-expanded={openMenu === c.title}
              >
                {c.title}
                <ChevronDown className={`h-4 w-4 transition md:hidden ${openMenu === c.title ? "rotate-180" : ""}`} />
              </button>
              <ul className={`${openMenu === c.title ? "flex" : "hidden"} md:flex flex-col gap-2.5 text-[13px] text-muted-foreground pb-4 md:pb-0`}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} onClick={() => setOpenMenu(null)} className="hover:text-primary hover:underline transition">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h4 className="text-[13px] font-medium text-foreground mb-4">Follow</h4>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"><Instagram className="h-4 w-4" /></a>
              <a href="https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg" target="_blank" rel="noreferrer" aria-label="YouTube" className="h-9 w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"><Youtube className="h-4 w-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="h-9 w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-9 w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t border-border flex flex-wrap justify-between gap-3 text-[12px] text-muted-foreground">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>{SITE.website}</span>
        </div>
      </div>
    </footer>
  );
}

