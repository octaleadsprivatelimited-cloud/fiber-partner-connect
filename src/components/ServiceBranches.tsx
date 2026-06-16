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
    <section className="py-14 md:py-20 bg-card">
      <div className="mx-auto max-w-[1920px] px-6 md:px-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10 md:mb-12 items-end">
          <div className="md:col-span-2">
            <div className="text-sm font-normal text-muted-foreground mb-3">Our presence</div>
            <h2 className="text-3xl md:text-5xl font-light text-foreground leading-[1.15]">Our Service Branches</h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Five locations across Andhra Pradesh & Telangana for fast on-site support.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {branches.map((b) => (
            <div key={b.city} className="group card-premium p-5 md:p-6 cursor-default">
              <div className="h-10 w-10 bg-accent text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-lg md:text-xl font-light text-foreground">{b.city}</div>
              <div className="mt-1.5 text-xs text-muted-foreground">{b.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
