import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { CATEGORIES, BRANDS } from "@/lib/products";
import { useProducts } from "@/lib/admin-data";



function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();
  const [cat, setCatState] = useState<string>(searchParams.get("category") || "All");
  const [brand, setBrand] = useState<string>("All");
  useEffect(() => {
    setCatState(searchParams.get("category") || "All");
  }, [searchParams]);
  const setCat = (value: string) => {
    setCatState(value);
    setSearchParams(value === "All" ? {} : { category: value });
  };
  const filtered = products.filter((p) =>
    (cat === "All" || p.category === cat) && (brand === "All" || p.brand === brand)
  );
  return (
    <>
      <PageHero
        eyebrow="CATALOGUE"
        title="All Products"
        description="Browse our full range of fiber optic equipment and accessories. Tap any product for a WhatsApp quote."
        
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16 grid md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr] gap-10 items-start">
          <aside className="md:sticky md:top-24 self-start space-y-8 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:pr-2">
            <div>
              <h3 className="font-medium text-sm mb-3 text-foreground">Category</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {["All", ...CATEGORIES].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`text-left text-sm px-3 py-2 border transition ${cat === c ? "bg-yellow-500 text-black border-yellow-500" : "bg-card border-border hover:border-yellow-500 hover:text-yellow-600"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="text-sm text-muted-foreground mb-4">{filtered.length} products</div>
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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

export default ProductsPage;
