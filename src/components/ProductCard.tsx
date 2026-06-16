import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: idx * 0.04 }}
      className="group flex flex-col card-premium overflow-hidden"
    >
      {/* Image — clean, square, edge-to-edge */}
      <div className="relative aspect-square bg-gradient-to-br from-[#f7f8fa] to-[#eef1f5] overflow-hidden">
        <img
          src={p.image}
          alt={`${p.name} — ${p.brand} ${p.category} | SATYA POWER TECHNOLOGYS`}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {p.featured && (
          <span className="absolute top-3 left-3 z-10 bg-brand-black/90 backdrop-blur text-white text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Body — minimal, centered text like Shopify themes */}
      <div className="px-4 pt-4 pb-5 text-center flex flex-col items-center">
        <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {p.brand}
        </div>
        <h3 className="mt-1.5 text-sm font-semibold text-brand-black leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {p.name}
        </h3>
        <div className="mt-1 text-xs text-muted-foreground">
          {p.category}
        </div>

        <QuoteDialog
          productName={p.name}
          trigger={
            <button type="button" className="mt-4 btn-dark-premium group/btn">
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition" />
            </button>
          }
        />
      </div>
    </motion.div>
  );
}

