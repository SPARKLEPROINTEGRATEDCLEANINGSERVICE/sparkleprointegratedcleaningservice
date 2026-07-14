import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import { useState } from "react";

export const Route = createFileRoute("/book-online")({
  head: () => ({
    meta: [
      { title: "Book Online | SparklePro Integrated Cleaning Service" },
      {
        name: "description",
        content: "Book your house cleaning with SparklePro in Lekki, Lagos in less than a minute.",
      },
    ],
  }),
  component: BookOnline,
});

const SERVICES = ["House Cleaning", "Office / Janitorial", "Fumigation", "Move In / Move Out", "Post-Construction"];
const SUPPORT_EMAIL = "sparkleprointegrated@gmail.com";
const WA_NUMBER = "2348146269080";

function BookOnline() {
  const [channel, setChannel] = useState<"whatsapp" | "email" | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0],
    address: "",
    date: "",
    time: "",
    notes: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const buildBody = () =>
    `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n` +
    `Service: ${form.service}\nAddress: ${form.address}\n` +
    `Date: ${form.date}   Time: ${form.time}\n\nDetails:\n${form.notes}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `New booking request — SparklePro\n\n${buildBody()}`;
    if (channel === "email") {
      const href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
        `New booking request — ${form.name || "SparklePro customer"}`,
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
    } else {
      window.open(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    setSent(true);
  };

  return (
    <div>
      <PageHero title="Book Online" subtitle="Tell us about your space — we'll take it from there." />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          {sent ? (
            <div className="rounded-2xl bg-primary p-10 text-center text-primary-foreground shadow-xl">
              <div className="text-5xl">✅</div>
              <h2 className="mt-3 text-3xl font-black">Booking ready to send!</h2>
              <p className="mt-3 opacity-90">
                Thanks for choosing SparklePro. Your booking has been prefilled in{" "}
                <span className="font-black">{channel === "email" ? "your email app" : "WhatsApp"}</span>{" "}
                and addressed to:
              </p>
              <div className="mx-auto mt-4 inline-block rounded-full bg-white/15 px-5 py-2 text-base font-black tracking-wide">
                {channel === "email" ? SUPPORT_EMAIL : "+234 814 626 9080"}
              </div>
              <p className="mt-4 text-sm opacity-90">
                Just hit <span className="font-bold">Send</span> in the {channel === "email" ? "email" : "WhatsApp"} window
                that opened — we'll confirm your booking shortly.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setChannel(null);
                }}
                className="mt-6 rounded-full bg-brand px-6 py-2 text-sm font-bold text-brand-foreground"
              >
                Make another booking
              </button>
            </div>
          ) : channel === null ? (
            <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="text-xs font-bold uppercase tracking-widest text-brand">Book Online</div>
              <h2 className="mt-3 text-2xl font-black text-primary md:text-3xl">
                Reserve your cleaning in under a minute.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Booking online is the fastest way to lock in your preferred date and time with SparklePro. Fill
                in your details, pick the service you need, and we'll take it from there — no back-and-forth
                phone calls, no waiting. Before you start, pick how you'd like to send your booking to us:
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setChannel("whatsapp")}
                  className="group rounded-2xl border-2 border-border p-6 text-left transition hover:-translate-y-1 hover:border-[#25D366] hover:shadow-lg"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
                    💬
                  </div>
                  <div className="mt-4 text-lg font-black text-primary">Send via WhatsApp</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fastest reply — your booking opens directly in WhatsApp, ready to send to
                    +234 814 626 9080.
                  </p>
                </button>

                <button
                  onClick={() => setChannel("email")}
                  className="group rounded-2xl border-2 border-border p-6 text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    ✉️
                  </div>
                  <div className="mt-4 text-lg font-black text-primary">Send via Email</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll pre-fill everything into your email app, addressed to {SUPPORT_EMAIL} — just hit send.
                  </p>
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Prefer to call? Dial{" "}
                <a href="tel:+2348146269080" className="font-bold text-brand">
                  +234 814 626 9080
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand">
                    Sending via {channel === "email" ? "Email" : "WhatsApp"}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {channel === "email" ? SUPPORT_EMAIL : "+234 814 626 9080"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChannel(null)}
                  className="text-xs font-bold uppercase tracking-widest text-brand hover:underline"
                >
                  ← Change
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" name="name" required value={form.name} onChange={set("name")} />
                <Field label="Phone Number" name="phone" required value={form.phone} onChange={set("phone")} />
                <Field label="Email" name="email" type="email" value={form.email} onChange={set("email")} />
                <div>
                  <label className="text-sm font-semibold">Service</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={set("service")}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
                  >
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <Field label="Address" name="address" className="md:col-span-2" value={form.address} onChange={set("address")} />
                <Field label="Preferred Date" name="date" type="date" value={form.date} onChange={set("date")} />
                <Field label="Preferred Time" name="time" type="time" value={form.time} onChange={set("time")} />
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">Details</label>
                  <textarea
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={set("notes")}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
                    placeholder="Rooms, bathrooms, special requests…"
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`mt-6 w-full rounded-full px-7 py-4 text-sm font-bold shadow-lg hover:opacity-90 ${
                  channel === "email"
                    ? "bg-primary text-primary-foreground shadow-primary/30"
                    : "bg-[#25D366] text-white shadow-[#25D366]/30"
                }`}
              >
                Send Booking via {channel === "email" ? "Email" : "WhatsApp"}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Or call us directly:{" "}
                <a href="tel:+2348146269080" className="font-bold text-brand">
                  +234 814 626 9080
                </a>
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </div>
  );
}
