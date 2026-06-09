export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center bg-brand-red text-white font-black text-lg">
        F
      </div>
      <div className="leading-none">
        <div className="font-black tracking-tight text-brand-black text-base">FUJITOMO</div>
        <div className="text-[10px] font-semibold tracking-[0.18em] text-brand-red">ELECTRONICS</div>
      </div>
    </div>
  );
}
