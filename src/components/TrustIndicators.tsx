const stats = [
  { value: "15+", label: "Years experience" },
  { value: "10K+", label: "Customers served" },
  { value: "Pan-India", label: "Sales & service" },
  { value: "24/7", label: "Support" },
];

export function TrustIndicators() {
  return (
    <section className="relative bg-gradient-to-b from-[#f6f9ff] via-white to-[#eef3fb] py-16 md:py-24 border-y border-border/60 overflow-hidden">
      <div className="absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.12),_transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl container-px">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-[11px] font-bold tracking-[0.22em] text-primary mb-4">TRUSTED ACROSS INDIA</div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-black leading-[1.05]">
            Credibility you can <span className="bg-gradient-to-r from-primary to-[hsl(var(--primary)/0.7)] bg-clip-text text-transparent">verify.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="group relative bg-white/80 backdrop-blur border border-border/70 rounded-xl p-5 sm:p-6 md:p-8 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] md:min-h-[190px] shadow-sm hover:shadow-elegant hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300">
              <div className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] break-words bg-gradient-to-br from-brand-black to-primary bg-clip-text text-transparent">{s.value}</div>
              <div className="mt-3 md:mt-4 text-[10px] sm:text-[11px] md:text-sm text-muted-foreground font-semibold uppercase tracking-[0.14em]">{s.label}</div>
              <div className="absolute left-5 right-5 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
