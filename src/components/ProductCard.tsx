import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";
import { Logo } from "@/components/Logo";

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="group bg-white border border-border hover:border-brand-red transition-all overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Watermark overlay - top: logo + contact number */}
        <div className="absolute inset-x-0 top-0 bg-white/95 backdrop-blur-sm border-l-4 border-brand-red">
          <div className="flex items-center justify-between gap-2 px-2.5 py-1.5">
            <Logo className="h-7" />
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center gap-1 text-brand-black text-[11px] font-bold whitespace-nowrap"
            >
              <Phone className="h-3 w-3 text-brand-red" />{SITE.phone}
            </a>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 bg-brand-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
          {p.brand}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{p.category}</div>
        <h3 className="font-bold text-brand-black mt-1 leading-snug">{p.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">{p.description}</p>
        <QuoteDialog
          productName={p.name}
          trigger={
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-brand-red text-white text-sm font-bold py-2.5 hover:bg-brand-red-dark transition group/btn w-full"
            >
              Get a Quote <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition" />
            </button>
          }
        />
      </div>
    </motion.div>
  );
}
