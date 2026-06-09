import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function CTABanner() {
  return (
    <section className="bg-brand-red text-white">
      <div className="mx-auto max-w-7xl container-px py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-black">Need a Quote or On-Site Service?</h2>
          <p className="mt-2 text-white/90">Call {SITE.phone} — our team responds within hours across AP & Telangana.</p>
        </div>
        <div className="flex gap-3">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-brand-red px-6 py-3 font-bold hover:bg-brand-black hover:text-white transition">
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-black text-white px-6 py-3 font-bold hover:bg-white hover:text-brand-black transition">
            Request Quote <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
