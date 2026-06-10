import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Wrench, Award, ShieldCheck, Star } from "lucide-react";
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

const stats = [
  { value: "12+", label: "Years in business" },
  { value: "2", label: "States covered" },
  { value: "100%", label: "Authorized service" },
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
    <section className="relative bg-brand-black text-white overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,oklch(0.36_0.09_255/0.45),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,oklch(0.18_0.005_0)_100%)]" />

      <div className="relative mx-auto max-w-7xl container-px pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: copy */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/40 text-primary-foreground px-3 py-1.5 rounded-full mb-6">
                  <Eyebrow className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] font-bold tracking-[0.2em]">{s.eyebrow.text}</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.02]">
                  {s.title}
                  <span className="block bg-gradient-to-r from-primary via-brand-yellow to-brand-orange bg-clip-text text-transparent">
                    {s.titleAccent}
                  </span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-white/75 max-w-xl">{s.body}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-7 py-3.5 rounded-md font-bold transition shadow-lg shadow-primary/30"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/25 hover:bg-white hover:text-brand-black px-7 py-3.5 rounded-md font-bold transition"
              >
                Our Services
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-yellow" /> Authorized INNO Partner</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-brand-yellow" /> 500+ happy customers</div>
            </div>
          </div>

          {/* RIGHT: framed image with floating stat */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/40 via-brand-yellow/20 to-transparent blur-2xl rounded-3xl" aria-hidden />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={i}
                    src={s.img}
                    alt=""
                    width={800}
                    height={1000}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white text-brand-black rounded-xl shadow-2xl px-5 py-4 hidden sm:block">
                <div className="grid grid-cols-3 gap-5">
                  {stats.map((st) => (
                    <div key={st.label}>
                      <div className="text-2xl font-black text-primary">{st.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-brand-black/60 font-semibold leading-tight mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="mt-14 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${idx === i ? "w-12 bg-primary" : "w-6 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
