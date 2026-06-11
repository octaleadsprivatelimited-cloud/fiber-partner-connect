import logoUrl from "@/assets/satya-logo.png";
import { SITE } from "@/lib/site";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Product image with a corner watermark: company logo + phone number.
 * Renders as a CSS overlay so it always looks crisp and stays in sync
 * with the SITE config.
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

      {/* Diagonal repeating wordmark — subtle, prevents image theft */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07] mix-blend-multiply select-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-30deg, transparent 0 90px, rgba(0,0,0,0.0) 90px 91px)",
        }}
      >
        <div
          className="absolute inset-0 flex flex-wrap content-center justify-center gap-x-10 gap-y-6 rotate-[-22deg] scale-125 text-[10px] md:text-xs font-black tracking-[0.25em] text-brand-black uppercase"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i}>SATYA POWER TECHNOLOGY'S</span>
          ))}
        </div>
      </div>

      {/* Bottom watermark bar: logo + phone */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 px-2 py-1.5 bg-gradient-to-r from-black/75 via-black/65 to-black/75 backdrop-blur-[2px]">
        <span className="block h-1 w-1.5 bg-brand-red rounded-sm shrink-0" />
        <img
          src={logoUrl}
          alt=""
          className="h-4 md:h-5 w-auto object-contain shrink-0 brightness-0 invert"
        />
        <span className="ml-auto text-[9px] md:text-[10px] font-bold tracking-wider text-white/95 truncate">
          {SITE.phone}
        </span>
      </div>
    </div>
  );
}
