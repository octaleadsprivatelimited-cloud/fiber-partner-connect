import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands — Satya Power Technology's" },
      { name: "description", content: "Authorized INNO distributor plus Fujikura, Sumitomo, Grandway, EXFO, VIAVI and Fiberfox fiber optic equipment." },
    ],
  }),
  component: BrandsPage,
});

const brands = [
  { name: "Fujikura", tag: "Japan", desc: "Premium fusion splicers (90S+, 41S+) trusted globally for active fusion control and ruggedness." },
  { name: "Sumitomo", tag: "Japan", desc: "T-72C+ and Z2C splicers — engineered for reliability and field-proven precision." },
  { name: "Grandway", tag: "China", desc: "Cost-effective OTDRs and optical power meters for FTTH and maintenance crews." },
  { name: "EXFO", tag: "Canada", desc: "MaxTester series OTDRs with iOLM intelligent analysis — industry benchmark." },
  { name: "VIAVI", tag: "USA", desc: "MTS-2000 modular platform OTDRs for metro, long-haul and FTTx testing." },
  { name: "Fiberfox", tag: "Korea", desc: "Mini fusion splicers ideal for FTTH and access network installations." },
];

function BrandsPage() {
  return (
    <>
      <section className="bg-brand-black text-white py-14 border-b-4 border-brand-red">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">OUR PARTNERS</div>
          <h1 className="text-4xl md:text-6xl font-black">Brands We Represent</h1>
        </div>
      </section>

      {/* INNO featured */}
      <section className="py-16 bg-brand-red text-white">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white text-brand-red px-3 py-1.5 mb-5 text-xs font-bold tracking-[0.2em]">
              <Award className="h-3.5 w-3.5" /> AUTHORIZED DISTRIBUTOR
            </div>
            <h2 className="text-5xl md:text-7xl font-black">INNO</h2>
            <p className="mt-4 text-lg text-white/90 max-w-lg">
              Satya Power Technology's is the <strong>authorized distributor of INNO Instrument</strong> for Andhra Pradesh & Telangana — covering full sales, service and warranty support.
            </p>
            <ul className="mt-6 space-y-2 text-white/90">
              <li>✓ View 7 / View 5 / View 3 fusion splicers</li>
              <li>✓ Genuine spares & electrodes</li>
              <li>✓ In-region calibration & repair</li>
            </ul>
            <Link to="/products" className="mt-7 inline-flex items-center gap-2 bg-white text-brand-red px-6 py-3 font-bold hover:bg-brand-black hover:text-white transition">
              Shop INNO Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white/10 border-2 border-white/30 backdrop-blur p-10 text-center">
            <div className="text-[10rem] leading-none font-black">INNO</div>
            <div className="text-sm font-bold tracking-[0.3em] mt-2">PRIMARY PARTNER</div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px">
          <h2 className="text-2xl md:text-4xl font-black text-brand-black mb-10">Additional Authorized Brands</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {brands.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-border p-7 hover:border-brand-red transition group"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-3xl font-black text-brand-black group-hover:text-brand-red transition">{b.name}</h3>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground">{b.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
