import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import teamKemi from "@/assets/team-kemi.jpg";

export const Route = createFileRoute("/team/kemi-adebayo-praise")({
  head: () => ({
    meta: [
      { title: "Kemi Adebayo Praise — Lead Cleaning Specialist | SparklePro" },
      {
        name: "description",
        content:
          "Meet Kemi Adebayo Praise, Lead Cleaning Specialist at SparklePro Integrated Cleaning Service — 4 years serving Lagos, Nigeria.",
      },
      { property: "og:title", content: "Kemi Adebayo Praise — Lead Cleaning Specialist" },
      {
        property: "og:description",
        content: "4 years of professional cleaning across Lagos. Clean Space, Clear Mind.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  const phoneDigits = "2348146269080";
  const email = "kemmypraise9@gmail.com";
  const waHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
    "Hello Kemi, I saw your profile on SparklePro and would like to talk about a cleaning service.",
  )}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(
    "Cleaning enquiry from SparklePro website",
  )}`;

  const expertise = [
    "Residential Cleaning",
    "Deep Cleaning",
    "Post-Construction Cleaning",
    "Move-In / Move-Out Cleaning",
    "Fumigation & Pest Control",
  ];

  return (
    <div>
      <PageHero title="Kemi Adebayo Praise" subtitle="Lead Cleaning Specialist — SparklePro Integrated Cleaning Service" />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[minmax(0,1fr)_1.4fr] md:px-8">
          <div>
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
              <img
                src={teamKemi}
                alt="Kemi Adebayo Praise — Lead Cleaning Specialist"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <InfoRow label="Role" value="Lead Cleaning Specialist" />
              <InfoRow label="Experience" value="4 Years" />
              <InfoRow label="Location" value="Lagos, Nigeria" />
              <InfoRow label="Phone" value="08146269080" href="tel:+2348146269080" />
              <InfoRow label="Email" value={email} href={mailHref} />

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message Kemi on WhatsApp"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90"
                >
                  <WhatsAppIcon /> WhatsApp
                </a>
                <a
                  href={mailHref}
                  aria-label="Email Kemi"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-90"
                >
                  <MailIcon /> Email
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand">About Me</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
              Passionate about clean, organized spaces.
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-brand" />

            <div className="mt-6 space-y-5 text-muted-foreground">
              <p>
                Kemi Adebayo Praise is the Lead Cleaning Specialist at SparklePro Integrated Cleaning Service,
                bringing 4 years of hands-on experience in delivering professional cleaning solutions to homes,
                offices and event spaces across Lagos, Nigeria.
              </p>
              <p>
                Inspired by a lifelong love for clean and organized spaces, Kemi started out in the industry to
                provide reliable, high-quality cleaning services that give clients real peace of mind. She enjoys
                seeing the amazing transformation that comes with every cleaning project — that moment a client
                walks in and breathes a little easier.
              </p>
              <p>
                Her areas of expertise include Residential Cleaning, Deep Cleaning, Post-Construction Cleaning,
                Move-In / Move-Out Cleaning, and Fumigation & Pest Control. She leads the field team on the
                ground, trains junior cleaners on SparklePro's standards, and personally handles quality checks
                on every completed job.
              </p>
              <p>
                Known for being detail-oriented, professional and reliable, Kemi is committed to using quality
                cleaning products, paying close attention to every corner, and arriving on time for every job.
                Her goal is simple — that every client is genuinely satisfied with the service they receive.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-muted/60 p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-brand">Areas of Expertise</div>
              <ul className="mt-3 grid gap-2 text-sm font-semibold text-primary sm:grid-cols-2">
                {expertise.map((e) => (
                  <li key={e} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {e}
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="mt-8 border-l-4 border-brand pl-5">
              <div className="text-xs font-bold uppercase tracking-widest text-brand">Motto</div>
              <p className="mt-1 text-xl font-black italic text-primary">"Clean Space, Clear Mind."</p>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="border-b border-border/60 py-2 last:border-0">
      <div className="text-[10px] font-bold uppercase tracking-widest text-brand">{label}</div>
      {href ? (
        <a href={href} className="text-sm font-bold text-primary hover:text-brand">
          {value}
        </a>
      ) : (
        <div className="text-sm font-bold text-primary">{value}</div>
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.6 5.93L0 24l6.35-1.66a11.9 11.9 0 0 0 5.69 1.45h.01c6.54 0 11.86-5.32 11.86-11.87 0-3.17-1.23-6.15-3.39-8.44zM12.04 21.6h-.01a9.7 9.7 0 0 1-4.95-1.36l-.36-.21-3.77.99 1-3.67-.23-.38a9.72 9.72 0 0 1-1.5-5.2c0-5.37 4.37-9.74 9.74-9.74 2.6 0 5.05 1.01 6.89 2.85a9.68 9.68 0 0 1 2.85 6.9c0 5.37-4.37 9.82-9.66 9.82zm5.62-7.29c-.31-.15-1.82-.9-2.1-1-.28-.11-.49-.15-.7.15-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.71-2.14-.18-.31-.02-.48.13-.63.14-.14.31-.36.47-.54.15-.18.2-.31.31-.51.1-.2.05-.38-.02-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53l-.6-.01c-.2 0-.54.08-.82.38-.28.31-1.08 1.06-1.08 2.58 0 1.53 1.11 3 1.26 3.21.15.2 2.19 3.34 5.3 4.68.74.32 1.32.51 1.77.66.74.24 1.41.2 1.94.12.59-.09 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.08-.13-.28-.2-.59-.35z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}