import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";
import { WatermarkedImage } from "@/components/WatermarkedImage";

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: idx * 0.04 }}
      className="group flex flex-col"
    >
      {/* Image — Shopify-style: clean, square, edge-to-edge, with brand watermark */}
      <div className="relative aspect-square bg-[#f6f6f6] overflow-hidden">
        <WatermarkedImage
          src={p.image}
          alt={`${p.name} — ${p.brand} ${p.category} | SATYA POWER TECHNOLOGYS`}
          className="h-full w-full"
          imgClassName="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {p.featured && (
          <span className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Body — minimal, centered text like Shopify themes */}
      <div className="pt-4 pb-2 text-center flex flex-col items-center">
        <div className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          {p.brand}
        </div>
        <h3 className="mt-1 text-sm font-medium text-brand-black leading-snug line-clamp-2 group-hover:underline underline-offset-4 decoration-1">
          {p.name}
        </h3>
        <div className="mt-1.5 text-xs text-muted-foreground">
          {p.category}
        </div>

        <QuoteDialog
          productName={p.name}
          trigger={
            <button
              type="button"
              className="mt-3 inline-flex items-center justify-center gap-2 bg-brand-black text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 hover:bg-brand-red transition-colors group/btn"
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition" />
            </button>
          }
        />
      </div>
    </motion.div>
  );
}
