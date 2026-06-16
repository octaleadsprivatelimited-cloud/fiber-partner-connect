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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border">
          {branches.map((b) => (
            <div key={b.city} className="group bg-white p-6 md:p-8 hover:bg-brand-black transition-colors">
              <MapPin className="h-6 w-6 text-primary mb-6" />
              <div className="text-xl md:text-2xl font-black text-brand-black group-hover:text-white transition-colors">{b.city}</div>
              <div className="mt-2 text-xs text-muted-foreground group-hover:text-white/70 uppercase tracking-wide">{b.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
