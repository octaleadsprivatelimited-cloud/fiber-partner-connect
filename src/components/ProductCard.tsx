import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="group relative bg-white rounded-xl border border-border hover:border-brand-red/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
        />
        {/* Brand chip */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          {p.brand}
        </div>
        {p.featured && (
          <div className="absolute top-3 right-3 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] font-bold tracking-[0.15em] text-brand-red uppercase">
          {p.category}
        </div>
        <h3 className="font-bold text-brand-black mt-1.5 leading-snug line-clamp-2 min-h-[3rem] group-hover:text-brand-red transition-colors">
          {p.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">
          {p.description}
        </p>
        <QuoteDialog
          productName={p.name}
          trigger={
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center gap-2 border-2 border-brand-black text-brand-black text-sm font-bold py-2.5 rounded-lg hover:bg-brand-black hover:text-white transition group/btn w-full"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition" />
            </button>
          }
        />
      </div>
    </motion.div>
  );
}
