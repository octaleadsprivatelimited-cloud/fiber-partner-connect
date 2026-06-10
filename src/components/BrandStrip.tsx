import { useEffect, useState } from "react";
import { loadPartners, type Partner } from "@/lib/partners";

export function BrandStrip() {
  const [brands, setBrands] = useState<Partner[]>(() => loadPartners());

  useEffect(() => {
    setBrands(loadPartners());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "admin-partners") setBrands(loadPartners());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const loop = [...brands, ...brands];

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="h-1 w-10 bg-primary" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
            Authorized Partners
          </span>
          <div className="h-1 w-10 bg-primary" />
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex gap-4 md:gap-6 animate-marquee w-max">
            {loop.map((b, idx) => (
              <div
                key={`${b.name}-${idx}`}
                className={`shrink-0 w-40 md:w-48 h-24 flex flex-col items-center justify-center text-center py-3 px-3 rounded-lg border transition ${
                  b.primary
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card border-border hover:border-primary hover:shadow-sm"
                }`}
              >
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                ) : (
                  <div
                    className={`font-black tracking-tight ${
                      b.primary ? "text-xl" : "text-lg text-foreground/80"
                    }`}
                  >
                    {b.name}
                  </div>
                )}
                {b.primary && (
                  <div className="text-[9px] font-bold mt-1 uppercase tracking-wider opacity-90">
                    Primary Partner
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
