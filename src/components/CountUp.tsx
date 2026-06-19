import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up. Parses a numeric prefix from `value` (e.g. "5000+", "10K+",
 * "24/7", "Pan-India") and smoothly counts from 1 → number whenever the element
 * enters the viewport. Non-numeric values are rendered as-is.
 */
export function CountUp({
  value,
  duration = 1800,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  // Match leading number with optional K/M/+/% suffix
  const match = /^(\d+(?:\.\d+)?)\s*([KMkm]?)([+%]?)(.*)$/.exec(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(match ? "1" + (match[2] ?? "") + (match[3] ?? "") + (match[4] ?? "") : value);

  useEffect(() => {
    if (!match) return;
    const target = parseFloat(match[1]);
    const unit = match[2] ?? "";
    const suffix = (match[3] ?? "") + (match[4] ?? "");
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let start = 0;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      const current = 1 + (target - 1) * eased;
      const formatted = Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(formatted + unit + suffix);
      if (p < 1) raf = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            cancelAnimationFrame(raf);
            start = 0;
            raf = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [match, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
