import { motion } from "framer-motion";
import { Award, Target, Users, Quote, MapPin, Calendar } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import bgAbout from "@/assets/bg-about.jpg";


const timeline = [
  { year: "2013", title: "Founded", body: "SATYA POWER TECHNOLOGY'S established under the leadership of Mr. Deepak Singh." },
  { year: "2024", title: "Authorized INNO Distributor", body: "Awarded official distribution rights for INNO Instrument across AP & Telangana." },
  { year: "2024", title: "Service Center Launched", body: "In-house repair and calibration facility opened — the only authorized one in region." },
  { year: "2025", title: "Expanding Catalogue", body: "Added Fujikura, Sumitomo, Grandway, EXFO, VIAVI and Fiberfox to the brand portfolio." },
];

const pillars = [
  { icon: Award, t: "Our Mission", d: "Deliver world-class fiber optic equipment with unmatched after-sales service." },
  { icon: Target, t: "Our Vision", d: "Be the most trusted fiber optic partner in South India by combining sales with real service." },
  { icon: Users, t: "Our People", d: "An experienced team of engineers and field technicians committed to your uptime." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="Built on trust. Backed by service."
        description={SITE.tagline}
        bgImage={bgAbout}
      />

      {/* Mission / Vision / People */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-2">WHAT DRIVES US</div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-black">Service first. Sales next.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-xl border border-border p-7 hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="h-12 w-12 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center mb-5 group-hover:bg-brand-red group-hover:text-white transition">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-brand-black">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "12+", l: "Years in business" },
              { v: "500+", l: "Happy customers" },
              { v: "2", l: "States covered" },
              { v: "7+", l: "Authorized brands" },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-xl border border-border p-5 text-center">
                <div className="text-3xl md:text-4xl font-black text-brand-red">{s.v}</div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Timeline */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-2">MILESTONES</div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-black">Our Journey</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-border rounded-xl p-6 hover:border-brand-red hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2 text-brand-red text-sm font-bold">
                  <Calendar className="h-4 w-4" /> {t.year}
                </div>
                <div className="text-xl font-black text-brand-black mt-3">{t.title}</div>
                <p className="text-muted-foreground text-sm mt-2">{t.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Location card */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div className="flex items-start gap-4">
              <MapPin className="h-8 w-8 text-brand-yellow shrink-0" />
              <div>
                <div className="text-xs font-bold tracking-[0.2em] text-brand-yellow mb-1">HEADQUARTERS</div>
                <div className="text-lg font-bold">Hyderabad, Telangana</div>
                <p className="text-sm text-white/80 mt-1 max-w-xl">{SITE.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

export default AboutPage;
