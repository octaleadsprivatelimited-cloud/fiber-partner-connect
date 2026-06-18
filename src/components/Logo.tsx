import logoAsset from "@/assets/satya-logo-new.png.asset.json";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Satya Power Technologies"
      className={`object-contain ${className}`}
    />
  );
}
