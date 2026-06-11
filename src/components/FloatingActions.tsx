import { MessageCircle, Mail, Phone, Instagram, Youtube, Facebook } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  const wa = whatsappLink("Hello, I would like to request a quotation.");
  return (
    <div className="fixed right-3 md:right-5 bottom-1/2 translate-y-1/2 z-50 flex flex-col gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        aria-label="Request Quote on WhatsApp"
        title="Request Quote"
        className="group relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-brand-black text-white text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition">
          Request Quote
        </span>
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </a>
      <a
        href={`mailto:${SITE.email}`}
        aria-label="Email Us"
        title="Email Us"
        className="group relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-brand-red text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Mail className="h-6 w-6" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-brand-black text-white text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition">
          Email Us
        </span>
      </a>
      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label="Call Now"
        title="Call Now"
        className="group relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-brand-black text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Phone className="h-6 w-6" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-brand-black text-white text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition">
          Call Now
        </span>
      </a>
      <div className="mt-1 flex flex-col gap-2 items-center">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white border border-border text-brand-black flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition">
          <Instagram className="h-4 w-4" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="h-9 w-9 rounded-full bg-white border border-border text-brand-black flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition">
          <Youtube className="h-4 w-4" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white border border-border text-brand-black flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition">
          <Facebook className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
