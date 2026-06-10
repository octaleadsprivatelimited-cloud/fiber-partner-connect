import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/site";
import { z } from "zod";
import { toast } from "sonner";
import { sendToFormspree } from "@/lib/formspree";
import { submitInquiry } from "@/lib/admin-data";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(80),
  mobile: z.string().trim().regex(/^[0-9+\-\s]{7,20}$/, "Invalid mobile number"),
  requirement: z.string().trim().min(1, "Requirement required").max(500),
  address: z.string().trim().min(1, "Address required").max(300),
});

export function QuoteDialog({ trigger, productName }: { trigger: React.ReactNode; productName?: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", requirement: productName ?? "", address: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }

    // 1. Email admin via Formspree
    await sendToFormspree({
      _subject: `Quote Request: ${productName ?? form.requirement}`,
      type: "Product Quote",
      product: productName ?? "",
      name: form.name,
      mobile: form.mobile,
      requirement: form.requirement,
      address: form.address,
    });

    // 2. Save to admin dashboard (Firestore)
    try {
      await submitInquiry({
        name: form.name,
        phone: form.mobile,
        subject: `Quote: ${productName ?? form.requirement}`,
        message: `Requirement: ${form.requirement}\nAddress: ${form.address}`,
      });
    } catch (err) {
      console.error(err);
    }

    // 3. Open WhatsApp to owner
    const msg = `*Quote Request*%0A%0A*Name:* ${form.name}%0A*Mobile:* ${form.mobile}%0A*Requirement:* ${form.requirement}%0A*Address:* ${form.address}`;
    const url = `https://wa.me/${SITE.phoneRaw}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast.success("Quote sent! We'll reach out shortly.");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="q-name">Name</Label>
            <Input id="q-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} required />
          </div>
          <div>
            <Label htmlFor="q-mobile">Mobile Number</Label>
            <Input id="q-mobile" type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} maxLength={20} required />
          </div>
          <div>
            <Label htmlFor="q-req">Requirement</Label>
            <Textarea id="q-req" value={form.requirement} onChange={(e) => setForm({ ...form, requirement: e.target.value })} maxLength={500} rows={3} required />
          </div>
          <div>
            <Label htmlFor="q-addr">Address</Label>
            <Textarea id="q-addr" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={300} rows={2} required />
          </div>
          <button type="submit" className="w-full bg-brand-red text-white font-bold py-2.5 hover:bg-brand-red-dark transition">
            Send via WhatsApp
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
