import logoUrl from "@/assets/satya-logo.png";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Satya Power Technologys"
      className={`w-auto object-contain ${className}`}
    />
  );
}
