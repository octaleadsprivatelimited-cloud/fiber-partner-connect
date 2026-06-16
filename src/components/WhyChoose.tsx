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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 auto-rows-[minmax(180px,auto)]">
          {items.map((it, i) => {
            const span =
              i === 0 ? "lg:col-span-2 lg:row-span-2" :
              i === 3 ? "lg:col-span-2" : "";
            return (
              <div key={it.t} className={`group relative p-7 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/15 hover:to-white/[0.03] transition-all duration-500 cursor-default backdrop-blur overflow-hidden ${span}`}>
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/0 group-hover:bg-primary/20 blur-3xl transition-all duration-700" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`font-bold leading-tight mb-3 ${i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>{it.t}</h3>
                  <p className="text-sm text-white/65 group-hover:text-white/85 leading-relaxed mb-6 max-w-md">{it.d}</p>
                  <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
