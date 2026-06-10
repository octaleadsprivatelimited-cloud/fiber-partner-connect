import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SITE, whatsappLink } from "@/lib/site";
import { submitInquiry } from "@/lib/admin-data";
import { sendToFormspree } from "@/lib/formspree";
import { PageHero } from "@/components/PageHero";
import bgContact from "@/assets/bg-contact.jpg";


interface Form { name: string; email: string; phone: string; subject: string; message: string; }

function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Form>();
  const onSubmit = async (data: Form) => {
    // 1. Email admin via Formspree
    await sendToFormspree({
      _subject: `Contact: ${data.subject}`,
      type: "Contact Form",
      ...data,
    });
    // 2. Save to admin dashboard
    try { await submitInquiry(data); } catch (e) { console.error(e); }
    // 3. Notify owner on WhatsApp
    const msg = `*New Enquiry*%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Email:* ${data.email}%0A*Subject:* ${data.subject}%0A*Message:* ${data.message}`;
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${msg}`, "_blank", "noopener,noreferrer");

    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Let's talk fiber."
        description="Quotes, service requests, partnership enquiries — we typically reply within hours."
        bgImage={bgContact}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="space-y-6">
            <ContactRow icon={Phone} label="Phone" value={SITE.phone} href={`tel:${SITE.phoneRaw}`} />
            <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat with us" href={whatsappLink()} accent />
            <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactRow icon={MapPin} label="Address" value={SITE.address} />

            <div className="aspect-video bg-muted border border-border overflow-hidden">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.2,17.2,78.7,17.6&layer=mapnik"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-white border border-border p-7">
            <h2 className="text-2xl font-black text-brand-black">Send a message</h2>
            {sent ? (
              <div className="mt-6 bg-brand-red/10 border border-brand-red p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <div><div className="font-bold text-brand-red">Message sent</div><div className="text-sm text-muted-foreground">We'll get back to you shortly.</div></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid sm:grid-cols-2 gap-4">
                <Field label="Name" error={errors.name?.message}>
                  <input {...register("name", { required: "Required", maxLength: 100 })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input {...register("phone", { required: "Required" })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Email" error={errors.email?.message}>
                    <input {...register("email", { required: "Required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Subject" error={errors.subject?.message}>
                    <input {...register("subject", { required: "Required", maxLength: 150 })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message" error={errors.message?.message}>
                    <textarea rows={5} {...register("message", { required: "Required", maxLength: { value: 1000, message: "Max 1000 chars" } })} className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
                  </Field>
                </div>
                <button type="submit" className="sm:col-span-2 bg-brand-red text-white font-bold py-3 hover:bg-brand-red-dark transition">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon: Icon, label, value, href, accent }: { icon: any; label: string; value: string; href?: string; accent?: boolean }) {
  const inner = (
    <div className={`flex items-start gap-4 p-5 border ${accent ? "bg-brand-red text-white border-brand-red" : "bg-white border-border hover:border-brand-red"} transition`}>
      <Icon className="h-6 w-6 shrink-0 mt-0.5" />
      <div>
        <div className={`text-xs font-bold tracking-[0.2em] uppercase ${accent ? "text-white/80" : "text-brand-red"}`}>{label}</div>
        <div className="font-bold mt-0.5">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a> : inner;
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

export default ContactPage;
