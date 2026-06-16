import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function CTABanner() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <div className="text-[11px] font-bold tracking-[0.22em] text-white/70 mb-4">GET IN TOUCH</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05]">
              Need a quote or on-site service?
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 md:border-l md:border-white/20 md:pl-10">
            <p className="text-white/80 text-base md:text-lg">
              Our team responds within hours across Andhra Pradesh & Telangana — sales, repair and emergency support.
            </p>
            <div className="flex flex-col gap-3">
              <a href={whatsappLink()} target="_blank" rel="noreferrer"
                className="group inline-flex items-center justify-between gap-3 bg-white text-brand-black px-6 py-4 font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition">
                <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Us</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/contact"
                className="group inline-flex items-center justify-between gap-3 border border-white/40 text-white px-6 py-4 font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition">
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${SITE.phoneRaw}`} className="text-sm text-white/80 hover:text-white pt-1">
                or call <span className="font-bold text-white">{SITE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
