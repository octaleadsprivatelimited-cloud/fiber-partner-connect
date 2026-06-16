import { Award, Users, MapPin, Headphones } from "lucide-react";

const stats = [
  { value: "15+", label: "Years experience", sub: "Industry expertise", Icon: Award },
  { value: "10K+", label: "Customers served", sub: "Across sectors", Icon: Users },
  { value: "Pan-India", label: "Sales & service", sub: "Nationwide reach", Icon: MapPin },
  { value: "24/7", label: "Support", sub: "Always available", Icon: Headphones },
];

export function TrustIndicators() {
  return (
    <section className="relative bg-[#0b0b0d] text-white py-20 md:py-28 overflow-hidden">
      {/* ambient grid + glow */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.25),_transparent_70%)] blur-2xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl container-px">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.22em] text-white/70">TRUSTED ACROSS INDIA</span>
            </div>
            <h2 className="mt-5 text-3xl md:text-5xl font-black leading-[1.05] tracking-tight">
              Credibility you can{" "}
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                verify.
              </span>
            </h2>
          </div>
          <p className="md:max-w-sm text-sm md:text-base text-white/60 leading-relaxed">
            Numbers built over a decade of trusted partnerships with businesses, institutions and homes nationwide.
          </p>
        </div>

        {/* Stat row — single horizontal line on mobile */}
        <div className="grid grid-cols-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur overflow-hidden">
          {stats.map(({ value, label, sub, Icon }, i) => (
            <div
              key={label}
              className={`group relative p-3 sm:p-5 md:p-8 transition-colors duration-300 hover:bg-white/[0.04]
                ${i < 3 ? "border-r border-white/10" : ""}
              `}
            >
              <div className="flex items-center justify-between mb-2 md:mb-6">
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" strokeWidth={1.75} />
                <span className="hidden sm:inline text-[10px] font-mono text-white/30">0{i + 1}</span>
              </div>
              <div className="text-lg sm:text-3xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {value}
              </div>
              <div className="mt-1 md:mt-4 text-[9px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-white">
                {label}
              </div>
              <div className="hidden sm:block mt-1 text-[11px] md:text-xs text-white/40">{sub}</div>
              <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
