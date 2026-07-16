import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import { useState } from "react";
import { submitContact, logWhatsappClick } from "@/lib/submissions.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | SparklePro Integrated Cleaning Service" },
      {
        name: "description",
        content: "Reach SparklePro Integrated Cleaning Service — Lekki, Lagos. Call +234 814 626 9080.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "SparklePro Integrated Cleaning Service",
          image: "https://sparkleprointegratedcleaningservice.lovable.app/favicon.png",
          telephone: "+2348146269080",
          email: "sparkleprointegrated@gmail.com",
          url: "https://sparkleprointegratedcleaningservice.lovable.app/",
          priceRange: "₦₦",
          address: {
            "@type": "PostalAddress",
            streetAddress: "U3 Estate Maruwa",
            addressLocality: "Lekki",
            postalCode: "105101",
            addressRegion: "Lagos",
            addressCountry: "NG",
          },
          areaServed: [
            "Lekki", "Ajah", "Victoria Island", "Ikoyi", "Ikate", "Chevron",
            "Sangotedo", "Maryland", "Yaba", "Ikeja", "Surulere", "Magodo",
          ].map((a) => ({ "@type": "Place", name: `${a}, Lagos` })),
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "00:00", closes: "23:59" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "17:00" },
          ],
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "40" },
          sameAs: ["https://maps.app.goo.gl/GJoHJ4HuWCG4B2dcA"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What areas of Lagos do you cover?", acceptedAnswer: { "@type": "Answer", text: "We cover Lekki (Phase 1 & 2), Ajah, Victoria Island, Ikoyi, Ikate, Chevron, Sangotedo, Maryland, Yaba, Ikeja, Surulere and Magodo. If your area isn't listed, message us on WhatsApp — we usually cover it." } },
            { "@type": "Question", name: "How quickly can you respond?", acceptedAnswer: { "@type": "Answer", text: "We're open 24 hours Monday–Saturday and 9am–5pm on Sundays. Most bookings on WhatsApp get a reply within minutes." } },
            { "@type": "Question", name: "How do I book a cleaning?", acceptedAnswer: { "@type": "Answer", text: "Use the Book Online form, chat us on WhatsApp at +234 814 626 9080, or email sparkleprointegrated@gmail.com." } },
            { "@type": "Question", name: "Are your fumigation reagents safe?", acceptedAnswer: { "@type": "Answer", text: "Yes — we use eco-friendly, odourless reagents that are safe for people and pets while remaining effective on pests." } },
          ],
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState<null | { via: "whatsapp"; to: string } | { via: "email"; to: string }>(null);
  const submit = useServerFn(submitContact);
  const logClick = useServerFn(logWhatsappClick);
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
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await submit({ data: { ...form, source: "contact-page" } });
                await logClick({ data: { service: "Contact", page: "contact", details: form.message } });
              } catch { /* still open whatsapp */ }
              window.open(waHref, "_blank", "noopener,noreferrer");
              setSent({ via: "whatsapp", to: "+234 814 626 9080" });
            }}
          >
            {sent && (
              <div className="mb-5 rounded-xl bg-primary/10 p-4 text-sm text-primary ring-1 ring-primary/30">
                <div className="font-black">✅ Message ready to send!</div>
                <div className="mt-1">
                  We opened {sent.via === "whatsapp" ? "WhatsApp" : "your email app"} with your message
                  addressed to{" "}
                  <span className="font-bold">{sent.to}</span>. Please hit send there to complete your enquiry.
                </div>
              </div>
            )}
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
                  onClick={() => setSent({ via: "email", to: supportEmail })}
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
                className="h-[320px] w-full sm:h-[420px] lg:h-[520px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="text-lg font-black text-primary">Lagos coverage</div>
              <p className="mt-2 text-sm text-muted-foreground">Same-day service across the Island and Mainland.</p>
              <div className="mt-5 space-y-4 text-sm">
                <AreaGroup title="Lekki Peninsula" items={["Lekki Phase 1", "Lekki Phase 2", "Ikate", "Chevron", "Ajah", "Sangotedo"]} />
                <AreaGroup title="Island" items={["Victoria Island", "Ikoyi", "Oniru"]} />
                <AreaGroup title="Mainland" items={["Maryland", "Yaba", "Ikeja", "Surulere", "Magodo", "Gbagada"]} />
              </div>
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

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">FAQ</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Frequently Asked Questions</h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
          </div>
          <div className="mt-10 space-y-4">
            {[
              ["What areas of Lagos do you cover?", "We cover Lekki (Phase 1 & 2), Ajah, Victoria Island, Ikoyi, Ikate, Chevron, Sangotedo, Maryland, Yaba, Ikeja, Surulere and Magodo. If your area isn't listed, message us on WhatsApp — we usually cover it."],
              ["How quickly can you respond?", "We're open 24 hours Monday–Saturday and 9am–5pm on Sundays. Most bookings on WhatsApp get a reply within minutes."],
              ["How do I book a cleaning?", "Use the Book Online form, chat us on WhatsApp at +234 814 626 9080, or email sparkleprointegrated@gmail.com."],
              ["Are your fumigation reagents safe?", "Yes — we use eco-friendly, odourless reagents that are safe for people and pets while remaining effective on pests."],
            ].map(([q, a]) => (
              <details key={q} className="group rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
                <summary className="cursor-pointer list-none text-base font-bold text-primary marker:hidden">
                  <span className="mr-2 text-brand">＋</span>{q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AreaGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-widest text-brand">{title}</div>
      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-semibold text-foreground">
        {items.map((a) => (
          <li key={a} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {a}
          </li>
        ))}
      </ul>
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
