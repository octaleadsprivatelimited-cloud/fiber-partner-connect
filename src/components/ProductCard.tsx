import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import type { Product } from "@/lib/products";

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
        <div className="absolute top-3 left-3 bg-brand-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
          {p.brand}
        </div>
        {/* Watermark overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-brand-black/85 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-3 py-2 border-l-4 border-brand-red">
            <div className="text-white">
              <div className="font-black text-xs leading-none">SATYA POWER TECHNOLOGY'S</div>
              <div className="text-brand-red text-[10px] font-semibold flex items-center gap-1 mt-0.5">
                <Phone className="h-2.5 w-2.5" />{SITE.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{p.category}</div>
        <h3 className="font-bold text-brand-black mt-1 leading-snug">{p.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">{p.description}</p>
        <a
          href={whatsappLink(`Hello, I'd like a quote for ${p.name}.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 bg-brand-red text-white text-sm font-bold py-2.5 hover:bg-brand-red-dark transition group/btn"
        >
          Get Quote <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition" />
        </a>
      </div>
    </motion.div>
  );
}
