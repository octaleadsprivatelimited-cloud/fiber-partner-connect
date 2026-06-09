import logoAsset from "@/assets/satya-logo.png.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoAsset.url}
        alt="Satya Power Technologys"
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}
