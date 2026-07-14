import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | SparklePro Integrated Cleaning Service" },
      {
        name: "description",
        content: "Reach SparklePro Integrated Cleaning Service — Lekki, Lagos. Call +234 814 626 9080.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const waNumber = "2348146269080";
  const supportEmail = "sparkleprointegrated@gmail.com";
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hello SparklePro, I'd like to get in touch.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`,
  )}`;
  const mailHref = `mailto:${supportEmail}?subject=${encodeURIComponent(
    "New enquiry from SparklePro website",
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`,
  )}`;
  return (
    <div>
      <PageHero title="Contact Us" subtitle="We're open 24 hours — reach out anytime." />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Get In Touch</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Let's make it sparkle.</h2>
            <div className="mt-8 space-y-6">
              <ContactRow label="Address" value="U3 Estate Maruwa, Lekki 105101, Lagos, Nigeria" />
              <ContactRow label="Phone" value="+234 814 626 9080" href="tel:+2348146269080" />
              <ContactRow label="WhatsApp" value="Chat on WhatsApp" href={`https://wa.me/${waNumber}`} />
              <ContactRow label="Email" value={supportEmail} href={`mailto:${supportEmail}`} />
              <ContactRow label="Hours" value="Open 24 hours (Sun 9 AM – 5 PM)" />
              <ContactRow label="Google Rating" value="4.8 ★ — House cleaning service" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90"
              >
                💬 WhatsApp
              </a>
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-90"
              >
                ✉️ Email Us
              </a>
            </div>
          </div>
          <form
            className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waHref, "_blank", "noopener,noreferrer");
            }}
          >
            <div className="grid gap-4">
              <Field label="Your Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Phone" name="phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <div>
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </div>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#25D366] px-7 py-3 text-sm font-bold text-white hover:opacity-90"
                >
                  Send via WhatsApp
                </button>
                <a
                  href={mailHref}
                  className="rounded-full bg-primary px-7 py-3 text-center text-sm font-bold text-primary-foreground hover:opacity-90"
                >
                  Send via Email
                </a>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                WhatsApp opens a chat to +234 814 626 9080 · Email opens your mail app to {supportEmail}.
              </p>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Where We Work</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Our Service Area in Lagos</h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
            <p className="mt-6 text-muted-foreground">
              Based in Lekki, SparklePro covers homes, offices and event venues across Lagos — from the Island
              to the Mainland. If your location isn't listed, reach out anyway; we usually cover it.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
              <iframe
                title="SparklePro service area — Lekki, Lagos"
                src="https://www.google.com/maps?q=Lekki%2C%20Lagos%2C%20Nigeria&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="text-lg font-black text-primary">Areas we cover</div>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold text-foreground">
                {[
                  "Lekki Phase 1 & 2",
                  "Ajah",
                  "Victoria Island",
                  "Ikoyi",
                  "Ikate",
                  "Chevron",
                  "Sangotedo",
                  "Maryland",
                  "Yaba",
                  "Ikeja",
                  "Surulere",
                  "Magodo",
                ].map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Not sure if we cover your area?{" "}
                <a href={`https://wa.me/${waNumber}`} className="font-bold text-brand">
                  Ping us on WhatsApp
                </a>{" "}
                and we'll confirm right away.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="rounded-xl bg-muted/60 p-5">
      <div className="text-xs font-bold uppercase tracking-widest text-brand">{label}</div>
      {href ? (
        <a href={href} className="mt-1 block text-lg font-bold text-primary hover:text-brand">
          {value}
        </a>
      ) : (
        <div className="mt-1 text-lg font-bold text-primary">{value}</div>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </div>
  );
}
