import { Award, Users, MapPin, Headphones } from "lucide-react";
import { CountUp } from "@/components/CountUp";

const stats = [
  { value: "15+", label: "Years experience", sub: "Industry expertise", Icon: Award },
  { value: "5000+", label: "Happy Customers", sub: "Across sectors", Icon: Users },
  { value: "Pan-India", label: "Sales & service", sub: "Nationwide reach", Icon: MapPin },
  { value: "24/7", label: "Support", sub: "Always available", Icon: Headphones },
];

export function TrustIndicators() {
  return (
    <section className="relative bg-brand-red-dark text-primary-foreground py-12 md:py-16 overflow-hidden">
      <div className="relative mx-auto max-w-[1920px] px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <div className="text-sm font-normal text-primary-foreground/70">Trusted across India</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-light leading-[1.15] tracking-normal">
              Credibility you can verify.
            </h2>
          </div>
          <p className="md:max-w-sm text-sm md:text-base text-primary-foreground/70 leading-relaxed">
            Numbers built over a decade of trusted partnerships with businesses, institutions and homes nationwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-primary-foreground/15 bg-primary-foreground/[0.04] overflow-hidden">
          {stats.map(({ value, label, sub, Icon }, i) => (
            <div
              key={label}
              className={`group relative p-4 sm:p-5 md:p-7 transition-colors duration-300 hover:bg-primary-foreground/[0.06]
                ${i % 2 === 0 ? "border-r border-primary-foreground/15" : ""} ${i < 2 ? "border-b border-primary-foreground/15 md:border-b-0" : ""} ${i < 3 ? "md:border-r md:border-primary-foreground/15" : ""}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-5 w-5 text-primary-foreground/80" strokeWidth={1.75} />
                <span className="hidden sm:inline text-[11px] text-primary-foreground/35">0{i + 1}</span>
              </div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-light leading-none tracking-normal text-primary-foreground">
                <CountUp value={value} />
              </div>
              <div className="mt-2 text-xs md:text-sm font-normal text-primary-foreground">
                {label}
              </div>
              <div className="hidden sm:block mt-1 text-xs text-primary-foreground/50">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
