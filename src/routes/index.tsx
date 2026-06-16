import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TrustIndicators } from "@/components/TrustIndicators";
import { BrandStrip } from "@/components/BrandStrip";
import { ServiceBranches } from "@/components/ServiceBranches";
import { WhyChoose } from "@/components/WhyChoose";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { useProducts } from "@/lib/admin-data";


function Home() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      <Hero />
      <TrustIndicators />
      <BrandStrip />

      <section className="py-16 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid md:grid-cols-3 gap-10 mb-12 md:mb-16 items-end">
            <div className="md:col-span-2">
              <div className="text-[11px] font-bold tracking-[0.22em] text-primary mb-4">FEATURED PRODUCTS</div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-black leading-[1.05]">Top picks from our catalogue</h2>
            </div>
            <div className="flex md:justify-end items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Package className="h-3.5 w-3.5 text-primary" /> 500+ products
              </span>
              <Link to="/products" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-black hover:text-primary border-b-2 border-primary pb-1">
                View all <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      <ServiceBranches />

      <WhyChoose />

      <CTABanner />
    </>
  );
}

export default Home;
