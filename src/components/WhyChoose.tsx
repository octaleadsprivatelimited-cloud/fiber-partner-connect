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
    <section className="py-14 md:py-20 bg-muted text-foreground border-y border-border">
      <div className="mx-auto max-w-[1920px] px-6 md:px-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10 md:mb-12 items-end">
          <div className="md:col-span-2">
            <div className="text-sm font-normal text-muted-foreground mb-3">Why Satya Power Technologys</div>
            <h2 className="text-3xl md:text-5xl font-light leading-[1.15]">
              Built for engineers.<br />Trusted by professionals.
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Six reasons customers across two states keep coming back for sales, service and support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-0 auto-rows-[minmax(180px,auto)] border border-border bg-card">
          {items.map((it, i) => {
            const span =
              i === 0 ? "lg:col-span-2 lg:row-span-2" :
              i === 3 ? "lg:col-span-2" : "";
            return (
              <div key={it.t} className={`group relative p-6 md:p-8 border-b border-r border-border hover:bg-accent transition-colors duration-300 cursor-default overflow-hidden ${span}`}>
                <div className="relative">
                  <div className="h-11 w-11 bg-accent text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`font-normal leading-tight mb-3 ${i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>{it.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">{it.d}</p>
                  <ArrowUpRight className="h-5 w-5 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
