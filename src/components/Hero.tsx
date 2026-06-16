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
    <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#1a1a1a]/80 to-[#1a1a1a]/30" />
      </div>

      <div className="relative mx-auto max-w-7xl container-px py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-5">
              <Eyebrow className="h-3.5 w-3.5 text-primary" />
              <span className="text-[12px] font-semibold text-primary">{s.eyebrow.text}</span>
            </div>
            <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white">
              {s.title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/75 max-w-2xl font-light leading-relaxed">{s.body}</p>

            <div className="mt-8 flex gap-3 items-center">
              <Link to="/products" className="group inline-flex items-center gap-2 h-11 px-6 rounded-sm bg-primary text-white text-sm font-semibold hover:bg-brand-red-dark transition-colors">
                Shop products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="group inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold text-white border border-white/30 rounded-sm hover:border-white transition-colors">
                Our services
                <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Side stat card — Dell-style flat tiles */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-2">
            <div className="rounded-sm bg-white/[0.06] border border-white/10 p-5">
              <div className="text-[12px] font-semibold uppercase text-primary mb-2">Authorized for</div>
              <div className="text-xl font-semibold leading-tight">Inno · Grandway · Claron · EXFO</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-sm bg-white/[0.04] border border-white/10 p-4">
                <div className="text-3xl font-semibold">15+</div>
                <div className="mt-1 text-[11px] uppercase text-white/60">Years</div>
              </div>
              <div className="rounded-sm bg-primary/15 border border-primary/30 p-4">
                <div className="text-3xl font-semibold">24/7</div>
                <div className="mt-1 text-[11px] uppercase text-white/80">Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-0.5 transition-all ${idx === i ? "w-16 bg-primary" : "w-6 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

