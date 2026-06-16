import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] text-white">
      <div className="relative mx-auto max-w-7xl container-px py-14 md:py-20">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <div className="text-[12px] font-semibold text-primary mb-3">Get in touch</div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight">
              Need a quote or on-site service?
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 md:border-l md:border-white/15 md:pl-10">
            <p className="text-white/75 text-base font-light">
              Our team responds within hours across Andhra Pradesh & Telangana — sales, repair and emergency support.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href={whatsappLink()} target="_blank" rel="noreferrer"
                className="group inline-flex items-center justify-between gap-3 px-5 py-3 text-sm font-semibold rounded-sm bg-primary text-white hover:bg-brand-red-dark transition-colors">
                <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp us</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/contact"
                className="group inline-flex items-center justify-between gap-3 px-5 py-3 text-sm font-semibold rounded-sm border border-white/30 text-white hover:border-white transition-colors">
                <span>Request a quote</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${SITE.phoneRaw}`} className="text-sm text-white/70 hover:text-white pt-1">
                or call <span className="font-semibold text-white">{SITE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


