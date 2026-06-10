import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { BrandStrip } from "@/components/BrandStrip";
import { WhyChoose } from "@/components/WhyChoose";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SATYA POWER TECHNOLOGY'S — INNO Authorized Distributor for AP & Telangana" },
      { name: "description", content: "Premium fiber optic equipment — fusion splicers, OTDRs, power meters & service across Andhra Pradesh and Telangana." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      <Hero />
      <BrandStrip />
      <WhyChoose />

      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">FEATURED PRODUCTS</div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-black">Top picks from our catalogue</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 font-bold text-brand-black hover:text-brand-red">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
