import { Instagram } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

// Official WhatsApp glyph (from WhatsApp brand assets)
function WhatsAppIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.003 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.257.594 4.46 1.722 6.4L3.2 28.8l6.55-1.7a12.77 12.77 0 0 0 6.252 1.617h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.331-6.633-3.748-9.05A12.72 12.72 0 0 0 16.003 3.2zm0 23.36h-.004a10.58 10.58 0 0 1-5.394-1.478l-.387-.23-3.886 1.01 1.037-3.79-.252-.4a10.55 10.55 0 0 1-1.62-5.672c0-5.866 4.776-10.64 10.642-10.64 2.842 0 5.51 1.108 7.516 3.117a10.57 10.57 0 0 1 3.115 7.524c0 5.866-4.775 10.64-10.643 10.64zm5.834-7.97c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.652.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55l-.613-.011a1.18 1.18 0 0 0-.853.4c-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.093 1.306 3.306.16.213 2.253 3.44 5.46 4.823.763.33 1.358.527 1.822.674.766.244 1.464.21 2.015.127.615-.092 1.892-.773 2.16-1.52.267-.747.267-1.387.186-1.52-.08-.133-.293-.213-.613-.373z"
      />
    </svg>
  );
}

// Phone receiver glyph
function PhoneIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1 1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z"
      />
    </svg>
  );
}

export function FloatingActions() {
  const wa = whatsappLink("Hello, I would like to request a quotation.");
  return (
    <div className="fixed right-2 md:right-5 bottom-1/2 translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        aria-label="Request Quote on WhatsApp"
        title="Request Quote on WhatsApp"
        className="group relative h-10 w-10 md:h-11 md:w-11 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-brand-black text-white text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition">
          Request Quote
        </span>
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </a>
      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label="Call Now"
        title="Call Now"
        className="group relative h-10 w-10 md:h-11 md:w-11 rounded-full bg-[#1a73e8] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <PhoneIcon className="h-5 w-5 md:h-6 md:w-6" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-brand-black text-white text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition">
          Call Now
        </span>
      </a>
      <a
        href="https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        title="Instagram"
        className="group relative h-10 w-10 md:h-11 md:w-11 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Instagram className="h-5 w-5" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-brand-black text-white text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition">
          Instagram
        </span>
      </a>
    </div>
  );
}
