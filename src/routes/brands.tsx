import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { useBrands } from "@/lib/brands-data";
import bgBrands from "@/assets/bg-brands.jpg";


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
  const adminWithLogos = adminBrands.filter((b) => b.logo);
  return (
    <>
      <PageHero
        eyebrow="OUR PARTNERS"
        title="Brands We Represent"
        description="Genuine equipment from the world's most trusted fiber optic manufacturers."
        bgImage={bgBrands}
      />

      {/* INNO featured */}
      <section className="py-10 md:py-24 relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl container-px grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 bg-brand-red text-white px-3 py-1.5 mb-5 text-[11px] font-bold tracking-[0.2em] rounded-full">
              <Award className="h-3.5 w-3.5" /> AUTHORIZED DISTRIBUTOR
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-brand-black">
              INNO Instrument
              <span className="block text-brand-red text-lg md:text-xl font-bold tracking-[0.2em] mt-3">
                AP & TELANGANA · SALES + SERVICE
              </span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              SATYA POWER TECHNOLOGYS is the Authorized Distributor for Inno, Grandway, Claron & EXFO across Andhra Pradesh and Telangana — covering full sales, service and warranty support.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {innoHighlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" /> {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 font-bold rounded-md hover:bg-brand-red-dark transition">
                Shop INNO Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-bold rounded-md hover:bg-muted transition text-brand-black">
                Service & Repair
              </Link>
            </div>
          </div>

          {/* Stat card */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl bg-white border border-border p-8 shadow-sm">
              <div className="text-7xl md:text-8xl font-black tracking-tight text-brand-black">INNO</div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <StatLight label="Years partnered" value="2+" />
                <StatLight label="Service center" value="01" />
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
      {adminWithLogos.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-7xl container-px">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-2">OUR BRANDS</div>
              <h2 className="text-2xl md:text-4xl font-black text-brand-black">Authorized Brand Logos</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {adminWithLogos.map((b) => (
                <div key={b.id} className="bg-white rounded-xl border border-border p-4 md:p-6 flex flex-col items-center gap-3 hover:border-brand-red hover:shadow-md transition">
                  <img src={b.logo} alt={b.name} className="h-16 md:h-20 w-full object-contain" />
                  <div className="text-sm md:text-base font-bold text-brand-black text-center">{b.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Additional brands */}
      <section className="py-14 md:py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl container-px">
          <div className="flex items-end justify-between mb-8 md:mb-10 gap-4 flex-wrap">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-2">PORTFOLIO</div>
              <h2 className="text-2xl md:text-4xl font-black text-brand-black">Additional Authorized Brands</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Premium fusion splicers, OTDRs and field tools — all backed by our in-region service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {brands.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-white rounded-xl border border-border p-5 md:p-7 hover:border-brand-red hover:shadow-xl transition overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-red to-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                <div className="flex items-baseline justify-between mb-3 gap-2">
                  <h3 className="text-xl md:text-3xl font-black text-brand-black group-hover:text-brand-red transition">{b.name}</h3>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground bg-muted px-2 py-1 rounded shrink-0">{b.tag}</span>
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
    <div className="rounded-lg bg-muted border border-border p-3">
      <div className="text-xl font-black text-brand-red">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default BrandsPage;
