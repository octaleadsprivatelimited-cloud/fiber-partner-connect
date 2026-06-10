import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/lib/products";
import bgProducts from "@/assets/bg-products.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — SATYA POWER TECHNOLOGY'S" },
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
      <PageHero
        eyebrow="CATALOGUE"
        title="All Products"
        description="Browse our full range of fiber optic equipment and accessories. Tap any product for a WhatsApp quote."
        bgImage={bgProducts}
      />

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
