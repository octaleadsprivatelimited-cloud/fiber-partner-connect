import logoAsset from "@/assets/satya-logo.png.asset.json";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Satya Power Technologys"
      className={`w-auto object-contain ${className}`}
    />
  );
}
