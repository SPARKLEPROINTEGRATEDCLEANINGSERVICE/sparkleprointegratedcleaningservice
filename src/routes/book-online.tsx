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

function BookOnline() {
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
  const waNumber = "2348146269080";
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `New booking request — SparklePro\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n` +
      `Service: ${form.service}\nAddress: ${form.address}\n` +
      `Date: ${form.date}   Time: ${form.time}\n\nDetails:\n${form.notes}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div>
      <PageHero title="Book Online" subtitle="Tell us about your space — we'll take it from there." />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          {sent ? (
            <div className="rounded-2xl bg-primary p-10 text-center text-primary-foreground shadow-xl">
              <h2 className="text-3xl font-black">Booking received!</h2>
              <p className="mt-3 opacity-90">
                Thanks for choosing SparklePro. Your booking details have been opened in WhatsApp — send the message and
                we'll confirm shortly on +234 814 626 9080.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 rounded-full bg-brand px-6 py-2 text-sm font-bold text-brand-foreground"
              >
                Make another booking
              </button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border"
            >
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
                className="mt-6 w-full rounded-full bg-brand px-7 py-4 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 hover:opacity-90"
              >
                Send Booking via WhatsApp
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
