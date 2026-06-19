import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/lib/products";
import { QuoteDialog } from "@/components/QuoteDialog";

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: idx * 0.04 }}
      className="group flex flex-col bg-card border border-border hover:border-primary transition-colors overflow-hidden h-full"
    >
      {/* Image (links to detail page) */}
      <Link to={`/product/${p.id}`} className="relative aspect-[16/10] sm:aspect-[4/3] bg-muted overflow-hidden block">
        <img
          src={p.image}
          alt={`${p.name} — ${p.brand} ${p.category} | SATYA POWER TECHNOLOGYS`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        {p.featured && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-primary text-primary-foreground text-[11px] font-normal px-2.5 py-1">
            Featured
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
        <div className="text-xs font-normal text-muted-foreground">{p.brand}</div>
        <Link to={`/product/${p.id}`} className="mt-1.5">
          <h3 className="text-sm md:text-lg font-light text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {p.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {p.category}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <QuoteDialog
            productName={p.name}
            trigger={
              <button type="button" className="inline-flex items-center gap-1 text-sm font-normal bg-yellow-500 text-black px-3 py-1.5 hover:bg-yellow-400 group/btn">
                Get a quote
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            }
          />
          <Link
            to={`/product/${p.id}`}
            className="inline-flex items-center gap-1 text-sm font-normal border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
