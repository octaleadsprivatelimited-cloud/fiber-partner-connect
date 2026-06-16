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
    <section className="relative bg-brand-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-black/30" />
      </div>
      <div className="relative mx-auto max-w-7xl container-px py-16 md:py-28 lg:py-32 pr-14 md:pr-8">
        {eyebrow && (
          <div className="text-[11px] font-bold tracking-[0.22em] text-primary mb-4 border-l-2 border-primary pl-3 inline-block">{eyebrow}</div>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black max-w-4xl leading-[1.02]">{title}</h1>
        {description && (
          <p className="mt-6 text-white/75 max-w-2xl text-base md:text-lg">{description}</p>

        )}
        {children}
      </div>
    </section>
  );
}
