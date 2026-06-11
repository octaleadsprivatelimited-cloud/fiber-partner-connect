import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TrustIndicators } from "@/components/TrustIndicators";
import { BrandStrip } from "@/components/BrandStrip";
import { ServiceBranches } from "@/components/ServiceBranches";
import { WhyChoose } from "@/components/WhyChoose";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { PRODUCTS } from "@/lib/products";


function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      <Hero />
      <TrustIndicators />
      <BrandStrip />

      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-xs font-bold tracking-[0.2em] text-brand-red">FEATURED PRODUCTS</div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red text-white text-[11px] font-bold px-3 py-1">
                  <Package className="h-3.5 w-3.5" /> 500+ Products Available
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-black">Top picks from our catalogue</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 font-bold text-brand-black hover:text-brand-red">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      <WhyChoose />

      <CTABanner />
    </>
  );
}

export default Home;
