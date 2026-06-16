import { MapPin } from "lucide-react";

const branches = [
  { city: "Hyderabad", role: "Head Office & Service Center" },
  { city: "Vijayawada", role: "Sales & Service Branch" },
  { city: "Kakinada", role: "Sales & Service Branch" },
  { city: "Srikakulam", role: "Service Support" },
  { city: "Tirupati", role: "Service Support" },
];

export function ServiceBranches() {
  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid md:grid-cols-3 gap-10 mb-12 md:mb-16 items-end">
          <div className="md:col-span-2">
            <div className="text-[11px] font-bold tracking-[0.22em] text-primary mb-4">OUR PRESENCE</div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-black leading-[1.05]">Our Service Branches</h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Five locations across Andhra Pradesh & Telangana for fast on-site support.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {branches.map((b) => (
            <div key={b.city} className="group card-premium p-6 md:p-7 cursor-default">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-lg md:text-xl font-black text-brand-black">{b.city}</div>
              <div className="mt-1.5 text-[11px] text-muted-foreground uppercase tracking-[0.12em]">{b.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
