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
      className="group flex flex-col card-premium overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f7f8fa] to-[#eef1f5] overflow-hidden">
        <img
          src={p.image}
          alt={`${p.name} — ${p.brand} ${p.category} | SATYA POWER TECHNOLOGYS`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {/* Circular logo badge — top-left */}
        <div className="absolute top-3 left-3 z-10 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/95 backdrop-blur shadow-md border border-white/80 flex items-center justify-center overflow-hidden">
          <img
            src={logoAsset.url}
            alt="SATYA POWER TECHNOLOGYS"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
            loading="lazy"
          />
        </div>

        {p.featured && (
          <span className="absolute top-3 right-3 z-10 bg-brand-black/90 backdrop-blur text-white text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Body — left aligned like reference */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {p.brand}
        </div>
        <h3 className="mt-1.5 text-base font-bold text-brand-black leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {p.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {p.category}
        </p>

        <QuoteDialog
          productName={p.name}
          trigger={
            <button type="button" className="mt-4 btn-dark-premium self-start group/btn">
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition" />
            </button>
          }
        />
      </div>
    </motion.div>
  );
}
