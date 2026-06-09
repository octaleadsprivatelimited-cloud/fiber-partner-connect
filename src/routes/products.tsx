import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Fujitomo Electronics" },
      { name: "description", content: "Fusion splicers, OTDRs, power meters, cleavers, VFLs, toolkits and genuine spare parts from INNO, Fujikura, Sumitomo and more." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [cat, setCat] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");
  const filtered = PRODUCTS.filter((p) =>
    (cat === "All" || p.category === cat) && (brand === "All" || p.brand === brand)
  );
  return (
    <>
      <section className="bg-brand-black text-white py-14 border-b-4 border-brand-red">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">CATALOGUE</div>
          <h1 className="text-4xl md:text-6xl font-black">All Products</h1>
          <p className="mt-3 text-white/70 max-w-2xl">Browse our full range of fiber optic equipment and accessories. Tap any product for a WhatsApp quote.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-[260px_1fr] gap-10">
          <aside className="lg:sticky lg:top-28 self-start space-y-8">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-brand-black">Category</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {["All", ...CATEGORIES].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`text-left text-sm px-3 py-2 border transition ${cat === c ? "bg-brand-red text-white border-brand-red" : "bg-white border-border hover:border-brand-red"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-brand-black">Brand</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {["All", ...BRANDS].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className={`text-left text-sm px-3 py-2 border transition ${brand === b ? "bg-brand-black text-white border-brand-black" : "bg-white border-border hover:border-brand-black"}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="text-sm text-muted-foreground mb-4">{filtered.length} products</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
            )}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
