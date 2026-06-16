import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Award, MapPin } from "lucide-react";
import heroPoster from "@/assets/hero-1.jpg";
const heroVideo = "/hero-bg.mp4";

const slides = [
  {
    eyebrow: { icon: Award, text: "AUTHORIZED DISTRIBUTOR" },
    title: "Fiber Optic Tools for AP & Telangana",
    body: "Authorized Distributor for Inno, Grandway, Claron & EXFO — sales and service across both states.",
  },
  {
    eyebrow: { icon: Wrench, text: "SALES + SERVICE" },
    title: "We Don't Just Sell — We Service",
    body: "In-house repair, calibration & on-site support. Competitors only sell. We do both.",
  },
  {
    eyebrow: { icon: MapPin, text: "PREMIUM EQUIPMENT" },
    title: "Built for the Field, Trusted by Pros",
    body: "Inno, Grandway, Claron, EXFO, Fujikura, Sumitomo, VIAVI — all under one trusted roof.",
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
    <section className="relative bg-brand-black text-white overflow-hidden">
      {/* full-bleed visual */}
      <div className="absolute inset-0">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={heroPoster}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/45 to-brand-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl container-px py-20 md:py-36 lg:py-44">
        <div className="max-w-2xl pr-14 md:pr-0">
          <div className="inline-flex items-center gap-2 mb-5 border-l-2 border-primary pl-3">
            <Eyebrow className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-white/85">{s.eyebrow.text}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] text-white">
            {s.title}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/75 max-w-xl">{s.body}</p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link to="/products" className="group btn-premium">
              Explore Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services" className="group inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white border border-white/30 rounded-lg backdrop-blur hover:bg-white/10 hover:border-white/60 transition-all">
              Our Services
              <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* slide indicators */}
        <div className="mt-16 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-0.5 transition-all ${idx === i ? "w-16 bg-primary" : "w-8 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
