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

      <section className="py-12 md:py-20 bg-card">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          <div className="grid md:grid-cols-3 gap-6 mb-8 md:gap-10 md:mb-12 items-end">
            <div className="md:col-span-2">
              <div className="text-sm font-normal text-muted-foreground mb-3">Featured products</div>
              <h2 className="text-2xl md:text-5xl font-light text-foreground leading-[1.15]">Top picks from our catalogue</h2>
            </div>
            <div className="flex md:justify-end items-center gap-3 md:gap-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-normal text-muted-foreground">
                <Package className="h-3.5 w-3.5 text-primary" /> 500+ products
              </span>
              <Link to="/products" className="group inline-flex items-center gap-2 text-sm font-normal text-primary hover:text-brand-red-dark border-b border-primary pb-1">
                View all <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-5">
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
