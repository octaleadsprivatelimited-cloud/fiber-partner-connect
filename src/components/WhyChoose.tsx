import { motion } from "framer-motion";
import { Building2, Users, ShieldCheck, Scale, Tag, Globe, Wrench } from "lucide-react";

const items = [
  { icon: Building2, t: "Advance Infrastructure", d: "Modern facilities and inventory ready for immediate dispatch." },
  { icon: Users, t: "Experienced Team", d: "Decades of combined expertise in fiber optic equipment & service." },
  { icon: ShieldCheck, t: "Superior Quality", d: "Only genuine, authorized products from world-leading brands." },
  { icon: Scale, t: "Ethical Business", d: "Transparent pricing, honest advice, long-term partnerships." },
  { icon: Tag, t: "Market Leading Prices", d: "Distributor-direct pricing on INNO and partner brands." },
  { icon: Globe, t: "Wide Distribution", d: "Pan-India shipping with strong AP & Telangana presence." },
];

export function WhyChoose() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">WHY SATYA POWER TECHNOLOGY'S</div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-black">Built for engineers. Trusted by professionals.</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map((it, idx) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white p-7 group hover:bg-brand-black hover:text-white transition-colors"
            >
              <div className="h-12 w-12 bg-brand-red text-white flex items-center justify-center mb-4">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">{it.t}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-white/70 mt-2">{it.d}</p>
            </motion.div>
          ))}
          {/* Highlight card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-brand-red text-white p-7 sm:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8"
          >
            <div className="h-14 w-14 bg-white text-brand-red flex items-center justify-center shrink-0">
              <Wrench className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold tracking-[0.2em] text-white/80 mb-1">OUR DIFFERENTIATOR</div>
              <h3 className="text-2xl md:text-3xl font-black">Authorized Service Center — AP & Telangana</h3>
              <p className="mt-2 text-white/90 max-w-2xl">Competitors only sell. We sell AND service — repair, calibration, on-site support and genuine spare parts.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
