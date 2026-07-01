import { Link } from "react-router-dom";
import { ArrowRight, Package, Zap, Wrench, ShieldCheck, Battery } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TrustIndicators } from "@/components/TrustIndicators";
import { BrandStrip } from "@/components/BrandStrip";
import { ServiceBranches } from "@/components/ServiceBranches";
import { WhyChoose } from "@/components/WhyChoose";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { useProducts } from "@/lib/admin-data";
import evServiceImg from "@/assets/ev-service.png";
import { whatsappLink } from "@/lib/site";
import { SEO } from "@/components/SEO";


function Home() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      <SEO
        title="Authorized Distributor for Inno, Grandway, Claron & EXFO"
        description="SATYA POWER TECHNOLOGYS is the authorized sales & service distributor of premium fiber optic fusion splicers, OTDRs, cleavers, EV batteries repair, and testing equipment across Andhra Pradesh & Telangana."
        keywords="fusion splicers, otdr, fiber optic tools, inno distributor, satya power, ev battery repair, ap telangana"
      />
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

      <section className="py-14 md:py-24 bg-card text-foreground border-t border-border overflow-hidden">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">New Service Frontier</div>
              <h2 className="text-3xl md:text-5xl font-light leading-[1.15] text-foreground">
                Powering the Future:<br />EV Battery Repair Services
              </h2>
            </div>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We have recently expanded our service portfolio to support the transition to electric vehicles. For EV batteries, we specifically provide only repair, service, and cell replacement.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-accent text-primary flex items-center justify-center shrink-0">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-foreground">EV Battery Repair & Service</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive health diagnostics, safety testing, capacity validation, and servicing to restore original battery efficiency.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-accent text-primary flex items-center justify-center shrink-0">
                  <Battery className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-foreground">Battery Cells Replacement</h3>
                  <p className="text-sm text-muted-foreground">Cost-effective replacement of individual degraded or faulty cell modules to extend the lifecycle of your existing pack.</p>
                </div>
              </div>
            </div>
            <div>
              <a
                href={whatsappLink("Hello SATYA POWER TECHNOLOGYS, I am interested in your EV battery repair and cell replacement services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/95 transition-all shadow-md group"
              >
                Inquire on WhatsApp <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="relative group max-w-xl mx-auto lg:mx-0 w-full animate-in fade-in slide-in-from-right-5 duration-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-sm blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-card border border-border/80 overflow-hidden">
              <img
                src={evServiceImg}
                alt="EV Battery Repair Service"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <WhyChoose />

      <CTABanner />
    </>
  );
}

export default Home;
