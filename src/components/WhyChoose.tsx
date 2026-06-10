import { motion } from "framer-motion";
import { Building2, Users, ShieldCheck, Scale, Tag, Globe } from "lucide-react";

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
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
        </div>

        {/* Differentiator banner — dark high-contrast */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative group overflow-hidden rounded-3xl bg-slate-950 shadow-2xl mt-10"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 flex-1">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-brand-red blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Wrench className="h-10 w-10 text-brand-red" strokeWidth={1.75} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="h-px w-6 bg-brand-red" />
                  <span className="text-xs font-bold tracking-widest text-brand-red uppercase">Our Differentiator</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Authorized Service Center <br className="hidden md:block" />
                  <span className="text-slate-400 font-medium">— AP & Telangana</span>
                </h3>
                <p className="text-slate-400 text-base md:text-lg max-w-2xl">
                  Competitors only sell. We sell AND service — certified repair, precision calibration, on-site support and genuine spare parts for your high-end optical equipment.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-lg active:scale-95 group/btn"
              >
                <span>Book Service Now</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
