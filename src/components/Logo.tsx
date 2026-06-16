export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`} aria-label="Satya Power Technologys">
      <span className="text-[22px] leading-none font-semibold text-primary tracking-normal">SATYA</span>
      <span className="ml-1.5 text-[18px] leading-none font-light text-foreground tracking-normal">Power Technologys</span>
    </div>
  );
}
