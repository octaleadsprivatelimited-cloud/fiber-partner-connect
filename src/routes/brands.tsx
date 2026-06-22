import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { useBrands } from "@/lib/brands-data";
import { getBrandLogo } from "@/lib/brand-logos";



const brands = [
  { name: "Fujikura", tag: "Japan", desc: "Premium fusion splicers (90S+, 41S+) trusted globally for active fusion control and ruggedness." },
  { name: "Sumitomo", tag: "Japan", desc: "T-72C+ and Z2C splicers — engineered for reliability and field-proven precision." },
  { name: "Grandway", tag: "China", desc: "Cost-effective OTDRs and optical power meters for FTTH and maintenance crews." },
  { name: "EXFO", tag: "Canada", desc: "MaxTester series OTDRs with iOLM intelligent analysis — industry benchmark." },
  { name: "VIAVI", tag: "USA", desc: "MTS-2000 modular platform OTDRs for metro, long-haul and FTTx testing." },
  { name: "Fiberfox", tag: "Korea", desc: "Mini fusion splicers ideal for FTTH and access network installations." },
];

const innoHighlights = [
  "View 7 / View 5 / View 3 fusion splicers",
  "Genuine spares & electrodes",
  "In-region calibration & repair",
  "Warranty backed by manufacturer",
];

function BrandsPage() {
  const { items: adminBrands } = useBrands();
  const filteredBrands = (adminBrands || []).filter(b => !b.name.toLowerCase().includes("satya power") && b.name.toUpperCase() !== "SKL");
  const logoByName = new Map(
    filteredBrands
      .filter((b) => b.logo)
      .map((b) => [b.name.trim().toLowerCase(), b.logo as string])
  );
  const portfolioBrands = brands.map((b) => ({
    ...b,
    logo: logoByName.get(b.name.trim().toLowerCase()) || getBrandLogo(b.name),
  }));
  const innoLogo =
    logoByName.get("inno") ||
    logoByName.get("inno instrument") ||
    getBrandLogo("inno");
  return (
    <>
      <PageHero
        eyebrow="OUR PARTNERS"
        title="Brands We Represent"
        description="Genuine equipment from the world's most trusted fiber optic manufacturers."
        
      />

      {/* INNO featured */}
      <section className="py-12 md:py-20 relative overflow-hidden bg-background">
        <div className="relative mx-auto max-w-[1920px] px-6 md:px-16 grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 mb-5 text-sm font-normal">
              <Award className="h-3.5 w-3.5" /> AUTHORIZED DISTRIBUTOR
            </div>
            <h2 className="text-4xl md:text-6xl font-light leading-tight text-foreground">
              INNO Instrument
              <span className="block text-primary text-lg md:text-xl font-normal mt-3">
                AP & TELANGANA · SALES + SERVICE
              </span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              SATYA POWER TECHNOLOGYS is the Authorized Distributor for Inno, Grandway, Claron & EXFO across Andhra Pradesh and Telangana — covering full sales, service and warranty support.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {innoHighlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-normal hover:bg-brand-red-dark transition">
                Shop INNO Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-normal hover:bg-accent hover:border-primary transition text-foreground">
                Service & Repair
              </Link>
            </div>
          </div>

          {/* Stat card */}
          <div className="lg:col-span-2">
            <div className="relative bg-card border border-border p-8">
              {innoLogo ? (
                <img src={innoLogo} alt="INNO Instrument logo" className="h-24 md:h-28 w-full object-contain object-left" />
              ) : (
                <div className="text-7xl md:text-8xl font-light text-foreground">INNO</div>
              )}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <StatLight label="Years partnered" value="13+" />
                <StatLight label="Service centers" value="05" />
                <StatLight label="States covered" value="AP+TG" />
                <StatLight label="Genuine spares" value="100%" />
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Hyderabad · in-region support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin-managed brand logos */}
      {filteredBrands.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="mx-auto max-w-[1920px] px-6 md:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {filteredBrands.map((b) => {
                const logo = b.logo || getBrandLogo(b.name);
                return (
                  <div key={b.id} className="bg-card border border-border p-4 md:p-6 flex flex-col items-center gap-3 hover:border-primary transition">
                    {logo ? (
                      <img src={logo} alt={`${b.name} logo`} loading="lazy" className="h-16 md:h-20 w-full object-contain" />
                    ) : (
                      <div className="h-16 md:h-20 w-full grid place-items-center text-2xl md:text-3xl font-light text-primary bg-muted">
                        {b.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="text-sm md:text-base font-medium text-foreground text-center">{b.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Additional brands */}
      <section className="py-12 md:py-16 bg-muted border-y border-border">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          <div className="flex items-end justify-between mb-8 md:mb-10 gap-4 flex-wrap">
            <div>
              <div className="text-sm font-normal text-muted-foreground mb-2">Portfolio</div>
              <h2 className="text-2xl md:text-4xl font-light text-foreground">Additional Authorized Brands</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Premium fusion splicers, OTDRs and field tools — all backed by our in-region service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {portfolioBrands.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-card border border-border p-5 md:p-7 hover:border-primary transition overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                <div className="flex items-center justify-between mb-4 gap-3">
                  <div className="h-14 w-20 shrink-0 border border-border bg-muted/70 grid place-items-center overflow-hidden p-2">
                    {b.logo ? (
                      <img src={b.logo} alt={`${b.name} logo`} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-lg font-light text-primary">{b.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <h3 className="min-w-0 flex-1 text-xl md:text-2xl font-light text-foreground group-hover:text-primary transition break-words">{b.name}</h3>
                  <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 shrink-0">{b.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <CTABanner />
    </>
  );
}

function StatLight({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted border border-border p-3">
      <div className="text-xl font-light text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default BrandsPage;
