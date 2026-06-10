import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import bg from "@/assets/bg-contact.jpg";

export function CTABanner() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* background image */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* dark overlay (lighter so image shows) */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-black/70 to-brand-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,oklch(0.55_0.22_25/0.35),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl container-px py-14 md:py-20">
        <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-center">
          <div className="md:col-span-3">
            <span className="inline-block text-[11px] font-bold tracking-[0.22em] text-brand-red mb-3">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-5xl font-black leading-[1.05]">
              Need a quote or <br className="hidden md:block" />
              <span className="text-brand-red">on-site service?</span>
            </h2>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-lg">
              Our team responds within hours across Andhra Pradesh & Telangana —
              sales, repair and emergency support.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3.5 rounded-md font-bold transition"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 bg-white text-brand-black hover:bg-white/90 px-6 py-3.5 rounded-md font-bold transition"
              >
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-6 md:p-7 space-y-5">
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-start gap-3 group">
                <div className="h-10 w-10 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70">Call directly</div>
                  <div className="font-bold text-lg group-hover:text-brand-red transition">{SITE.phone}</div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70">Hours</div>
                  <div className="font-semibold text-sm">Mon – Sat · 9:30 AM – 7:00 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70">Service area</div>
                  <div className="font-semibold text-sm">Andhra Pradesh & Telangana</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
