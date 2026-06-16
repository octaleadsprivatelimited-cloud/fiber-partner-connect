import { ArrowUpRight, Building2, Users, ShieldCheck, Scale, Tag, Globe } from "lucide-react";

const items = [
  { icon: Building2, t: "Advance Infrastructure", d: "Modern facilities and inventory ready for immediate dispatch." },
  { icon: Users, t: "Experienced Team", d: "Decades of combined expertise in fiber optic equipment & service." },
  { icon: ShieldCheck, t: "Superior Quality", d: "Only genuine, authorized products from world-leading brands." },
  { icon: Scale, t: "Ethical Business", d: "Transparent pricing, honest advice, long-term partnerships." },
  { icon: Tag, t: "Market Leading Prices", d: "Distributor-direct pricing on INNO and partner brands." },
  { icon: Globe, t: "Wide Distribution", d: "Pan-India shipping with strong AP & Telangana presence." },
];

export function WhyChoose() {
  return (
    <section className="py-16 md:py-28 bg-brand-black text-white">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid md:grid-cols-3 gap-10 mb-12 md:mb-20 items-end">
          <div className="md:col-span-2">
            <div className="text-[11px] font-bold tracking-[0.22em] text-primary mb-4">WHY SATYA POWER TECHNOLOGYS</div>
            <h2 className="text-3xl md:text-5xl font-black leading-[1.05]">
              Built for engineers.<br />Trusted by professionals.
            </h2>
          </div>
          <p className="text-white/65 text-base md:text-lg">
            Six reasons customers across two states keep coming back for sales, service and support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.t} className="group relative p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/15 hover:to-white/[0.04] transition-all duration-500 cursor-default backdrop-blur">
              <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-7 group-hover:bg-primary group-hover:text-white transition-colors">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl md:text-2xl leading-tight mb-3">{it.t}</h3>
              <p className="text-sm text-white/65 group-hover:text-white/85 leading-relaxed mb-6">{it.d}</p>
              <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
