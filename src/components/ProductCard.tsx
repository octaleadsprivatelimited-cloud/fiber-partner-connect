import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";
import { SITE } from "@/lib/site";
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
      {/* Image — clean, square, edge-to-edge */}
      <div className="relative aspect-square bg-gradient-to-br from-[#f7f8fa] to-[#eef1f5] overflow-hidden">
        <img
          src={p.image}
          alt={`${p.name} — ${p.brand} ${p.category} | SATYA POWER TECHNOLOGYS`}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Brand overlay: logo + phone, responsive on all viewports */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between gap-2 p-2 sm:p-2.5 bg-gradient-to-b from-white/95 via-white/85 to-transparent backdrop-blur-[2px]">
          <img
            src={logoAsset.url}
            alt="SATYA POWER TECHNOLOGYS"
            className="h-5 sm:h-6 md:h-7 w-auto object-contain shrink-0"
            loading="lazy"
          />
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-brand-black bg-white/90 border border-border/60 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-sm hover:bg-primary hover:text-white hover:border-primary transition whitespace-nowrap"
          >
            <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span className="hidden sm:inline">{SITE.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>

        {p.featured && (
          <span className="absolute top-12 sm:top-14 left-3 z-10 bg-brand-black/90 backdrop-blur text-white text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full">
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

