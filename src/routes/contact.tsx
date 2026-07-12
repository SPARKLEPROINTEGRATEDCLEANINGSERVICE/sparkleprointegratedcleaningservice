import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";

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
              <ContactRow label="Hours" value="Open 24 hours (Sun 9 AM – 5 PM)" />
              <ContactRow label="Google Rating" value="4.8 ★ — House cleaning service" />
            </div>
          </div>
          <form
            className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you — we'll be in touch shortly.");
            }}
          >
            <div className="grid gap-4">
              <Field label="Your Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" />
              <div>
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-brand-foreground hover:opacity-90"
              >
                Send Message
              </button>
            </div>
          </form>
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

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </div>
  );
}
