import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Wrench, Award } from "lucide-react";
import h1 from "@/assets/hero-1.jpg";
import h2 from "@/assets/hero-2.jpg";
import h3 from "@/assets/hero-3.jpg";

const slides = [
  {
    img: h1,
    eyebrow: { icon: Award, text: "AUTHORIZED DISTRIBUTOR" },
    title: "INNO Brand —",
    titleAccent: "AP & Telangana",
    body: "The only authorized INNO partner for sales AND service across both states.",
  },
  {
    img: h2,
    eyebrow: { icon: Wrench, text: "SALES + SERVICE" },
    title: "We Don't Just Sell —",
    titleAccent: "We Service",
    body: "In-house repair, calibration & on-site support. Competitors only sell. We do both.",
  },
  {
    img: h3,
    eyebrow: { icon: MapPin, text: "PREMIUM EQUIPMENT" },
    title: "Fiber Optic Tools",
    titleAccent: "Built for the Field",
    body: "INNO, Fujikura, Sumitomo, EXFO, VIAVI, Grandway — all under one trusted roof.",
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  const Eyebrow = s.eyebrow.icon;
  return (
    <section className="relative h-[88vh] min-h-[560px] max-h-[760px] overflow-hidden bg-brand-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={s.img} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl container-px h-full flex items-center">
        <div className="max-w-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-brand-red px-3 py-1.5 mb-6">
                <Eyebrow className="h-3.5 w-3.5" />
                <span className="text-[11px] font-bold tracking-[0.2em]">{s.eyebrow.text}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05]">
                {s.title}
                <span className="block text-brand-red">{s.titleAccent}</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/80 max-w-lg">{s.body}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 bg-brand-red px-7 py-3.5 font-bold hover:bg-white hover:text-brand-red transition">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 px-7 py-3.5 font-bold hover:bg-white hover:text-brand-black transition">
              Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1 transition-all ${idx === i ? "w-10 bg-brand-red" : "w-6 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
