import type { ReactNode } from "react";
import heroBg from "@/assets/hero-bg-blue.jpg.asset.json";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  bgImage?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, bgImage, children }: Props) {
  const bg = bgImage ?? heroBg.url;
  return (
    <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/60 to-[#1a1a1a]/20" />
      </div>
      <div className="relative mx-auto max-w-7xl container-px py-14 md:py-20 lg:py-24 pr-14 md:pr-8">
        {eyebrow && (
          <div className="text-[12px] font-semibold text-primary mb-3">{eyebrow}</div>
        )}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold max-w-4xl leading-[1.1] tracking-tight">{title}</h1>
        {description && (
          <p className="mt-5 text-white/80 max-w-2xl text-base md:text-lg font-light leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}

