import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Wrench, Award, ShieldCheck, Headphones, Package } from "lucide-react";
import heroPoster from "@/assets/hero-1.jpg";

const slides = [
  {
    eyebrow: { icon: Award, text: "AUTHORIZED INNO DISTRIBUTOR" },
    title: "Fiber Optic Tools for AP & Telangana",
    body: "The only authorized INNO partner for sales AND service across both states.",
  },
  {
    eyebrow: { icon: Wrench, text: "SALES + SERVICE" },
    title: "We Don't Just Sell — We Service",
    body: "In-house repair, calibration & on-site support. Competitors only sell. We do both.",
  },
  {
    eyebrow: { icon: MapPin, text: "PREMIUM EQUIPMENT" },
    title: "Built for the Field, Trusted by Pros",
    body: "INNO, Fujikura, Sumitomo, EXFO, VIAVI, Grandway — all under one trusted roof.",
  },
];

const features = [
  { icon: Package, title: "Genuine Products", body: "Authorized stock from INNO, Fujikura, Sumitomo, EXFO, VIAVI and more." },
  { icon: Wrench, title: "Authorized Service", body: "In-house repair, calibration and certified spare parts." },
  { icon: Headphones, title: "On-Site Support", body: "Engineers dispatched across AP & Telangana for urgent issues." },
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
    <section className="relative bg-primary text-white overflow-x-hidden">
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay for readability */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl container-px pt-16 md:pt-28 pb-28 md:pb-44">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Eyebrow className="h-3.5 w-3.5 text-white/90" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.22em] text-white/90">{s.eyebrow.text}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.05] text-white">
            {s.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/85 max-w-2xl mx-auto">{s.body}</p>

          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              to="/products"
              className="inline-flex justify-center items-center gap-2 bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-bold text-sm sm:text-base transition"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex justify-center items-center gap-2 border border-white/50 hover:bg-white/10 px-6 py-3 rounded-md font-bold text-sm sm:text-base transition"
            >
              Our Services
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80">
            <ShieldCheck className="h-4 w-4 text-brand-yellow shrink-0" />
            Authorized INNO Partner — 500+ happy customers
          </div>
        </div>

        {/* slide indicators */}
        <div className="mt-10 flex gap-2 justify-center">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${idx === i ? "w-12 bg-white" : "w-6 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Feature cards overlapping bottom */}
      <div className="relative z-10 bg-background pt-4 md:-mt-28 md:bg-transparent md:pt-0">
        <div className="mx-auto max-w-7xl px-3 md:px-8">
          <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white text-brand-black rounded-lg md:rounded-xl shadow-xl p-4 md:p-6 border border-black/5 min-w-0"
                >
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-md md:rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2 md:mb-4">
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="font-bold text-base leading-tight md:text-lg">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-black/65 leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-16 md:h-20 bg-background" />
    </section>
  );
}
