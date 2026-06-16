import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-brand-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(220_60%_30%/0.5),transparent_55%),radial-gradient(ellipse_at_bottom_right,hsl(220_80%_45%/0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <div className="text-[11px] font-bold tracking-[0.22em] text-primary mb-4">GET IN TOUCH</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05]">
              Need a quote or on-site service?
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 md:border-l md:border-white/15 md:pl-10">
            <p className="text-white/75 text-base md:text-lg">
              Our team responds within hours across Andhra Pradesh & Telangana — sales, repair and emergency support.
            </p>
            <div className="flex flex-col gap-3">
              <a href={whatsappLink()} target="_blank" rel="noreferrer"
                className="group inline-flex items-center justify-between gap-3 px-6 py-4 font-bold uppercase tracking-wider text-sm rounded-lg bg-white text-brand-black shadow-premium hover:shadow-elegant hover:-translate-y-0.5 transition-all">
                <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Us</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/contact"
                className="group inline-flex items-center justify-between gap-3 px-6 py-4 font-bold uppercase tracking-wider text-sm rounded-lg border border-white/25 text-white bg-white/5 backdrop-blur hover:bg-white/10 hover:border-white/50 transition-all">
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${SITE.phoneRaw}`} className="text-sm text-white/70 hover:text-white pt-1">
                or call <span className="font-bold text-white">{SITE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

