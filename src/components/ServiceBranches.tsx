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
    <section className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-7xl container-px">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">OUR PRESENCE</div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-black">Our Service Branches</h2>
          <p className="mt-3 text-muted-foreground">Five locations across Andhra Pradesh & Telangana for fast on-site support.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {branches.map((b) => (
            <div
              key={b.city}
              className="group relative bg-white border border-border rounded-xl p-5 text-center hover:border-brand-red hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mb-3 group-hover:bg-brand-red group-hover:text-white transition">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="text-lg font-black text-brand-black">{b.city}</div>
              <div className="mt-1 text-xs text-muted-foreground">{b.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
