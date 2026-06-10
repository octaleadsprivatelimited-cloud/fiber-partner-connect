import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: idx * 0.04 }}
      className="group flex flex-col"
    >
      {/* Image — Shopify-style: clean, square, edge-to-edge */}
      <div className="relative aspect-square bg-[#f6f6f6] overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {p.featured && (
          <span className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
            Featured
          </span>
        )}

        {/* Quick-add overlay on hover (Shopify pattern) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
          <QuoteDialog
            productName={p.name}
            trigger={
              <button
                type="button"
                className="w-full bg-brand-black text-white text-xs font-semibold uppercase tracking-wider py-3 hover:bg-brand-red transition-colors"
              >
                Get a Quote
              </button>
            }
          />
        </div>
      </div>

      {/* Body — minimal, centered text like Shopify themes */}
      <div className="pt-4 pb-2 text-center">
        <div className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          {p.brand}
        </div>
        <h3 className="mt-1 text-sm font-medium text-brand-black leading-snug line-clamp-2 group-hover:underline underline-offset-4 decoration-1">
          {p.name}
        </h3>
        <div className="mt-1.5 text-xs text-muted-foreground">
          {p.category}
        </div>
      </div>
    </motion.div>
  );
}
