const stats = [
  { value: "15+", label: "Years experience" },
  { value: "10K+", label: "Customers served" },
  { value: "PAN India", label: "Sales & service" },
  { value: "24/7", label: "Support" },
];

export function TrustIndicators() {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-[11px] font-bold tracking-[0.22em] text-primary mb-4">TRUSTED ACROSS INDIA</div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-black leading-[1.05]">
            Credibility you can verify.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-5 md:p-8 flex flex-col justify-between min-h-[140px] md:min-h-[180px]">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-black leading-none whitespace-nowrap">{s.value}</div>
              <div className="mt-4 text-[11px] md:text-sm text-muted-foreground font-medium uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
