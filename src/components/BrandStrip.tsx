const brands = [
  { name: "INNO", primary: true },
  { name: "Fujikura" },
  { name: "Sumitomo" },
  { name: "Grandway" },
  { name: "EXFO" },
  { name: "VIAVI" },
  { name: "Fiberfox" },
];

export function BrandStrip() {
  return (
    <section className="bg-brand-black text-white py-10 border-y-4 border-brand-red">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-10 bg-brand-red" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Authorized Partners</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
          {brands.map((b) => (
            <div
              key={b.name}
              className={`text-center py-4 ${b.primary ? "bg-brand-red border-2 border-white relative" : "border border-white/15 hover:border-brand-red transition"}`}
            >
              <div className={`font-black tracking-tight ${b.primary ? "text-xl text-white" : "text-lg text-white/80"}`}>{b.name}</div>
              {b.primary && (
                <div className="text-[9px] font-bold text-white/90 mt-1 uppercase tracking-wider">Primary Partner</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
