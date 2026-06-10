import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Wrench, Award, ShieldCheck, Headphones, Package } from "lucide-react";
import h1 from "@/assets/hero-1.jpg";
import h2 from "@/assets/hero-2.jpg";
import h3 from "@/assets/hero-3.jpg";

const slides = [
  {
    img: h1,
    eyebrow: { icon: Award, text: "AUTHORIZED INNO DISTRIBUTOR" },
    title: "Fiber Optic Tools for AP & Telangana",
    body: "The only authorized INNO partner for sales AND service across both states.",
  },
  {
    img: h2,
    eyebrow: { icon: Wrench, text: "SALES + SERVICE" },
    title: "We Don't Just Sell — We Service",
    body: "In-house repair, calibration & on-site support. Competitors only sell. We do both.",
  },
  {
    img: h3,
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
    <section className="relative bg-primary text-white overflow-hidden">
      {/* subtle decorative wash on the right */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,oklch(0.55_0.15_255/0.55),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl container-px pt-14 md:pt-20 pb-36 md:pb-44">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT: copy */}
          <div>
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="inline-flex items-center gap-2 mb-5">
                <Eyebrow className="h-3.5 w-3.5 text-white/80" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-white/80">{s.eyebrow.text}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-[1.1] text-white max-w-xl">
                {s.title}
              </h1>
              <p className="mt-5 text-base text-white/75 max-w-lg">{s.body}</p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-bold transition"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 px-6 py-3 rounded-md font-bold transition"
              >
                Our Services
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/70">
              <ShieldCheck className="h-4 w-4 text-brand-yellow" />
              Authorized INNO Partner — 500+ happy customers
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="relative">
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden">
              <img
                key={i}
                src={s.img}
                alt=""
                width={900}
                height={720}
                className="absolute inset-0 h-full w-full object-cover animate-in fade-in zoom-in-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* slide indicators */}
        <div className="mt-10 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${idx === i ? "w-12 bg-white" : "w-6 bg-white/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Feature cards overlapping bottom */}
      <div className="relative -mt-24 md:-mt-28 z-10">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white text-brand-black rounded-xl shadow-xl p-6 border border-black/5"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-black/65 leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* spacer so following sections clear the overlapping cards */}
      <div className="h-16 md:h-20 bg-background" />
    </section>
  );
}
