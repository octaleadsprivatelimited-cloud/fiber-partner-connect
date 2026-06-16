import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";
import logoAsset from "@/assets/satya-logo.png.asset.json";

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: idx * 0.04 }}
      className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#bdbdbd] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all overflow-hidden h-full rounded-sm"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-white overflow-hidden">
        <img
          src={p.image}
          alt={`${p.name} — ${p.brand} ${p.category} | SATYA POWER TECHNOLOGYS`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Circular logo badge — top-left */}
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 z-10 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-white/95 backdrop-blur shadow-sm border border-[#e5e5e5] flex items-center justify-center overflow-hidden">
          <img
            src={logoAsset.url}
            alt="SATYA POWER TECHNOLOGYS"
            className="h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-7 md:w-7 object-contain"
            loading="lazy"
          />
        </div>

        {p.featured && (
          <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-10 bg-primary text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-2.5 sm:p-3.5 md:p-5 flex flex-col flex-1">
        <div className="text-[10px] sm:text-[11px] font-semibold text-[#666] uppercase">
          {p.brand}
        </div>
        <h3 className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {p.name}
        </h3>
        <p className="mt-1 sm:mt-1.5 md:mt-2 text-[10px] sm:text-xs md:text-sm text-[#666] leading-relaxed line-clamp-2">
          {p.category}
        </p>

        <QuoteDialog
          productName={p.name}
          trigger={
            <button type="button" className="mt-3 sm:mt-3 md:mt-4 inline-flex items-center gap-1 self-start text-[11px] sm:text-xs md:text-sm font-semibold text-primary hover:text-brand-red-dark group/btn">
              Get a quote
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          }
        />
      </div>
    </motion.div>
  );
}

