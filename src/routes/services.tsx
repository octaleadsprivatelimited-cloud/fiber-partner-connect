import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { submitInquiry } from "@/lib/admin-data";
import { loadServices, ICONS } from "@/lib/services-data";
import bgServices from "@/assets/bg-services.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — SATYA POWER TECHNOLOGY'S | Fusion Splicer Repair & OTDR Calibration" },
      { name: "description", content: "Authorized service center for fiber optic equipment across AP & Telangana — splicer repair, OTDR calibration, on-site support and genuine spares." },
    ],
  }),
  component: ServicesPage,
});

interface Form { name: string; phone: string; equipment: string; issue: string; }

interface Form { name: string; phone: string; equipment: string; issue: string; }

function ServicesPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Form>();
  const onSubmit = async (data: Form) => {
    try {
      await submitInquiry({
        name: data.name, phone: data.phone,
        subject: `Service: ${data.equipment}`, message: data.issue,
      });
    } catch (e) { console.error(e); }
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <PageHero
        eyebrow="OUR DIFFERENTIATOR"
        title={<>We Don't Just Sell — <span className="text-primary">We Service.</span></>}
        description="Competitors stop at the sale. We go further — providing authorized repair, calibration and on-site support for every product we deliver."
        bgImage={bgServices}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-border p-7 hover:border-brand-red transition group"
              >
                <div className="h-12 w-12 bg-brand-red text-white flex items-center justify-center mb-4 group-hover:bg-brand-black transition">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-black">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-brand-red mb-3">COVERAGE</div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-black">Service across Andhra Pradesh & Telangana</h2>
            <p className="mt-4 text-muted-foreground">Our authorized service network reaches every major city and industrial hub. Typical turnaround: 48 hours for diagnosis, same-week resolution.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["Hyderabad", "Vijayawada", "Visakhapatnam", "Warangal", "Guntur", "Tirupati", "Nellore", "Kakinada"].map((c) => (
                <div key={c} className="bg-white border-l-4 border-brand-red px-4 py-3 font-semibold text-sm">{c}</div>
              ))}
            </div>
          </div>

          <div className="bg-white p-7 border border-border">
            <h3 className="text-2xl font-black text-brand-black">Book a Service</h3>
            <p className="text-sm text-muted-foreground mt-1">Tell us about your equipment — we'll get back within hours.</p>
            {sent ? (
              <div className="mt-6 bg-brand-red/10 border border-brand-red p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <div><div className="font-bold text-brand-red">Request received</div><div className="text-sm text-muted-foreground">Our team will contact you shortly.</div></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                <Field label="Your name" error={errors.name?.message}>
                  <input {...register("name", { required: "Required" })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input {...register("phone", { required: "Required", pattern: { value: /^[0-9+\s-]{8,}$/, message: "Invalid phone" } })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                </Field>
                <Field label="Equipment (brand + model)" error={errors.equipment?.message}>
                  <input {...register("equipment", { required: "Required" })} placeholder="e.g. INNO View 7" className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                </Field>
                <Field label="Issue / service required" error={errors.issue?.message}>
                  <textarea rows={3} {...register("issue", { required: "Required", maxLength: { value: 1000, message: "Max 1000 chars" } })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                </Field>
                <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 hover:bg-brand-red-dark transition">Submit Request</button>
              </form>
            )}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-black">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-brand-red mt-1 block">{error}</span>}
    </label>
  );
}
