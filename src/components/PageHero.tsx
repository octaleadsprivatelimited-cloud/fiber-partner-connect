import type { ReactNode } from "react";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  bgImage: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, bgImage, children }: Props) {
  return (
    <section className="relative bg-brand-black text-white overflow-hidden border-b-4 border-primary">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={bgImage}
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        {/* Lighter overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/50 via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl container-px py-12 md:py-24">
        {eyebrow && (
          <div className="text-xs font-bold tracking-[0.2em] text-primary mb-3">{eyebrow}</div>
        )}
        <h1 className="text-4xl md:text-6xl font-black max-w-3xl leading-[1.05]">{title}</h1>
        {description && (
          <p className="mt-4 text-white/85 max-w-2xl text-lg">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
