const stats = [
  { value: "15+", label: "Years industry experience" },
  { value: "10,000+", label: "Happy customers served" },
  { value: "All India", label: "Sales & service support" },
  { value: "24/7", label: "Service support availability" },
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
            <div key={s.label} className="bg-white p-6 md:p-8">
              <div className="text-4xl md:text-6xl font-black text-brand-black leading-none">{s.value}</div>
              <div className="mt-3 md:mt-4 text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
