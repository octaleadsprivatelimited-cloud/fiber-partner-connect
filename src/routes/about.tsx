import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Target, Users } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import bgAbout from "@/assets/bg-about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SATYA POWER TECHNOLOGY'S" },
      { name: "description", content: "Founded in 2013 by Mr. Deepak Singh, SATYA POWER TECHNOLOGY'S is the authorized INNO distributor for AP & Telangana." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2013", title: "Founded", body: "SATYA POWER TECHNOLOGY'S established under the leadership of Mr. Deepak Singh." },
  { year: "2024", title: "Authorized INNO Distributor", body: "Awarded official distribution rights for INNO Instrument across AP & Telangana." },
  { year: "2024", title: "Service Center Launched", body: "In-house repair and calibration facility opened — the only authorized one in region." },
  { year: "2025", title: "Expanding Catalogue", body: "Added Fujikura, Sumitomo, Grandway, EXFO, VIAVI and Fiberfox to the brand portfolio." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-brand-black text-white py-16 border-b-4 border-brand-red">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">OUR STORY</div>
          <h1 className="text-4xl md:text-6xl font-black max-w-3xl">Built on trust. Backed by service.</h1>
          <p className="mt-4 text-white/70 max-w-2xl text-lg">{SITE.tagline}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-3 gap-10">
          {[
            { icon: Award, t: "Our Mission", d: "Deliver world-class fiber optic equipment with unmatched after-sales service." },
            { icon: Target, t: "Our Vision", d: "Be the most trusted fiber optic partner in South India by combining sales with real service." },
            { icon: Users, t: "Our People", d: "An experienced team of engineers and field technicians committed to your uptime." },
          ].map((b, i) => (
            <motion.div key={b.t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border-t-4 border-brand-red pt-5">
              <b.icon className="h-8 w-8 text-brand-red mb-3" />
              <h3 className="text-xl font-black text-brand-black">{b.t}</h3>
              <p className="mt-2 text-muted-foreground">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CEO */}
      <section className="py-20 bg-brand-black text-white">
        <div className="mx-auto max-w-7xl container-px grid md:grid-cols-[280px_1fr] gap-10 items-center">
          <div className="aspect-square bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center">
            <div className="text-[8rem] font-black leading-none">DS</div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">LEADERSHIP</div>
            <h2 className="text-3xl md:text-5xl font-black">{SITE.ceo}</h2>
            <div className="text-white/60 font-semibold mt-1">Founder & CEO</div>
            <p className="mt-5 text-white/80 max-w-2xl">A telecom industry veteran, Mr. Deepak Singh founded SATYA POWER TECHNOLOGY'S in 2013 with a simple belief: customers deserve more than a sale — they deserve genuine service. Under his leadership, the company became the authorized INNO distributor for both states and the only in-region authorized service center.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px">
          <h2 className="text-3xl md:text-5xl font-black text-brand-black mb-12">Our Journey</h2>
          <div className="relative space-y-8 max-w-3xl">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative pl-12">
                <div className="absolute left-0 top-1 h-7 w-7 bg-brand-red text-white text-xs font-black flex items-center justify-center">●</div>
                <div className="text-sm font-bold text-brand-red">{t.year}</div>
                <div className="text-xl font-black text-brand-black mt-1">{t.title}</div>
                <p className="text-muted-foreground mt-1">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
