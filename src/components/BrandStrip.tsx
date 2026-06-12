import { useBrands } from "@/lib/brands-data";

export function BrandStrip() {
  const { items } = useBrands();
  const brands = items.length ? items : [];
  const loop = [...brands, ...brands];

  return (
    <section className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex items-center gap-3 mb-6 md:mb-8 justify-center">
          <div className="h-1 w-8 md:w-10 bg-primary" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 text-center">
            Authorized Brands & Partners
          </span>
          <div className="h-1 w-8 md:w-10 bg-primary" />
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
          <div className="flex gap-3 md:gap-6 animate-marquee w-max">
            {loop.map((b, idx) => (
              <div
                key={`${b.id ?? b.name}-${idx}`}
                className="shrink-0 w-32 md:w-48 h-20 md:h-24 flex flex-col items-center justify-center text-center py-2 px-2 md:py-3 md:px-3 rounded-lg border bg-card border-border hover:border-primary hover:shadow-sm transition"
              >
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-10 md:max-h-12 max-w-full object-contain"
                  />
                ) : (
                  <div className="font-black tracking-tight text-sm md:text-lg text-foreground/80">
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
