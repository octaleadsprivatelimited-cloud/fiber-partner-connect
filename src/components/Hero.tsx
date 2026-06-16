import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Award, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg-blue.jpg.asset.json";

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
      <div className="absolute inset-0">
        <img src={heroBg.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-brand-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
        {/* red accent glow */}
        <div className="absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl container-px py-20 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <Eyebrow className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/90 uppercase">{s.eyebrow.text}</span>
            </div>
            <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.75rem] font-bold leading-[0.98] text-white">
              {s.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="bg-gradient-to-r from-primary via-[#ff6b3d] to-primary bg-clip-text text-transparent">
                {s.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            <p className="mt-7 text-base md:text-xl text-white/70 max-w-2xl leading-relaxed">{s.body}</p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link to="/products" className="group btn-premium">
                Explore Products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="group inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-white border border-white/25 rounded-lg backdrop-blur hover:bg-white/10 hover:border-white/60 transition-all">
                Our Services
                <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Side bento stat card */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 backdrop-blur p-6">
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-3">Authorized for</div>
              <div className="text-2xl font-bold leading-tight">Inno · Grandway · Claron · EXFO</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur p-5">
                <div className="text-3xl font-bold">15+</div>
                <div className="mt-1 text-[10px] tracking-[0.18em] uppercase text-white/60">Years</div>
              </div>
              <div className="rounded-2xl bg-primary/15 border border-primary/30 backdrop-blur p-5">
                <div className="text-3xl font-bold">24/7</div>
                <div className="mt-1 text-[10px] tracking-[0.18em] uppercase text-white/80">Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-0.5 transition-all ${idx === i ? "w-20 bg-primary" : "w-8 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
