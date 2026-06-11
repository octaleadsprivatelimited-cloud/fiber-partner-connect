import { SITE } from "@/lib/site";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Product image with a corner watermark: brand wordmark + phone number,
 * plus a subtle diagonal repeating wordmark to deter image theft.
 */
export function WatermarkedImage({ src, alt, className = "", imgClassName = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={imgClassName}
      />

      {/* Diagonal repeating wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07] mix-blend-multiply select-none"
      >
        <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-x-10 gap-y-6 rotate-[-22deg] scale-125 text-[10px] md:text-xs font-black tracking-[0.25em] text-brand-black uppercase">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i}>SATYA POWER TECHNOLOGY'S</span>
          ))}
        </div>
      </div>

      {/* Bottom watermark bar: brand + phone */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 px-2.5 py-1.5 bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-[2px]">
        <span className="inline-flex items-center gap-1.5 shrink-0">
          <span className="h-4 w-4 rounded-sm bg-brand-red text-white text-[9px] font-black flex items-center justify-center leading-none">S</span>
          <span className="text-[9px] md:text-[10px] font-black tracking-[0.12em] text-white/95 uppercase">
            Satya Power
          </span>
        </span>
        <span className="ml-auto text-[9px] md:text-[10px] font-bold tracking-wider text-white/95 truncate">
          {SITE.phone}
        </span>
      </div>
    </div>
  );
}
