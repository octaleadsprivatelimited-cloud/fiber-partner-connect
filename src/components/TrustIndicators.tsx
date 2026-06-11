import { Award, Clock, Wrench, Headphones, Users, Map, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Award, value: "2019–2027", label: "Authorized Inno Distributor" },
  { icon: Clock, value: "15+ Years", label: "Industry Experience" },
  { icon: Wrench, value: "Since 2015", label: "Service Center Established" },
  { icon: Headphones, value: "24/7", label: "Service Support" },
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Map, value: "All India", label: "Sales & Service Support" },
  { icon: ShieldCheck, value: "AP & TS", label: "Authorized Service Support" },
];

export function TrustIndicators() {
  return (
    <section className="bg-gradient-to-b from-background to-muted/40 py-16 border-y border-border">
      <div className="mx-auto max-w-7xl container-px">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">TRUSTED ACROSS INDIA</div>
          <h2 className="text-2xl md:text-4xl font-black text-brand-black">Credibility you can verify.</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group bg-white border border-border rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-brand-red transition-all"
            >
              <div className="mx-auto h-11 w-11 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mb-3 group-hover:bg-brand-red group-hover:text-white transition">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-base md:text-lg font-black text-brand-black leading-tight">{s.value}</div>
              <div className="mt-1 text-[11px] md:text-xs text-muted-foreground font-medium leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
