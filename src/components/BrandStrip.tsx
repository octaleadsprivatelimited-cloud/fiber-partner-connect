import { useEffect, useState } from "react";
import { BRANDS } from "@/lib/products";

interface BrandItem { name: string; description?: string; logo?: string }
const KEY = "admin-brand-descriptions";

function loadBrands(): BrandItem[] {
  if (typeof localStorage === "undefined")
    return BRANDS.map((b) => ({ name: b }));
  const raw = localStorage.getItem(KEY);
  if (!raw) return BRANDS.map((b) => ({ name: b }));
  try {
    const parsed = JSON.parse(raw) as BrandItem[];
    return Array.isArray(parsed) && parsed.length ? parsed : BRANDS.map((b) => ({ name: b }));
  } catch { return BRANDS.map((b) => ({ name: b })); }
}

export function BrandStrip() {
  const [brands, setBrands] = useState<BrandItem[]>(() => loadBrands());

  useEffect(() => {
    setBrands(loadBrands());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setBrands(loadBrands());
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
            Authorized Brands & Partners
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
                className="shrink-0 w-40 md:w-48 h-24 flex flex-col items-center justify-center text-center py-3 px-3 rounded-lg border bg-card border-border hover:border-primary hover:shadow-sm transition"
              >
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                ) : (
                  <div className="font-black tracking-tight text-lg text-foreground/80">
                    {b.name}
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
