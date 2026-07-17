import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import cleaningImg from "@/assets/service-cleaning.jpg";
import fumigationImg from "@/assets/service-fumigation.jpg";
import suppliesImg from "@/assets/supplies.jpg";

export const Route = createFileRoute("/our-services")({
  head: () => ({
    meta: [
      { title: "Our Services | SparklePro Integrated Cleaning Service" },
      {
        name: "description",
        content:
          "House cleaning, fumigation, deep cleaning, sanitation and move-in/out services by SparklePro in Lekki, Lagos.",
      },
      { property: "og:title", content: "SparklePro Services" },
      { property: "og:description", content: "Cleaning and fumigation services in Lagos." },
    ],
  }),
  component: Services,
});

const services = [
  {
    id: "cleaning",
    img: cleaningImg,
    title: "Cleaning Services",
    text: "Comprehensive residential cleaning across Lagos — regular, deep, move-in/out, and sanitation.",
    features: [
      "Regular House Cleaning",
      "Move In & Move Out Cleaning",
      "Sanitation & Disinfection",
      "Deep Cleaning Services",
    ],
    subs: [
      { title: "Regular House Cleaning", slug: "regular-house-cleaning" },
      { title: "Move In & Move Out", slug: "move-in-move-out" },
      { title: "Sanitation & Disinfection", slug: "sanitation-disinfection" },
      { title: "Deep Cleaning", slug: "deep-cleaning" },
    ],
  },
  {
    id: "fumigation",
    img: fumigationImg,
    title: "Fumigation & Pest Control",
    text: "Odorless, eco-friendly fumigation for bed bugs, cockroaches, rodents and termites.",
    features: [
      "Insect Control (Cockroach, Bedbug, Mosquito, Ants)",
      "Rodent Control",
      "Termite & pre-construction treatment",
      "Safe for children and pets",
    ],
    subs: [
      { title: "Insect & Pest Control", slug: "insect-control" },
    ],
  },
  {
    id: "move-in-out",
    img: suppliesImg,
    title: "Move In / Move Out",
    text: "Get keys to a spotless new home or leave your old one spotless for the next tenant.",
    features: [
      "Full inside-cabinet and wardrobe cleaning",
      "Wall spot-cleaning and skirting",
      "Deep bathroom & kitchen reset",
      "Landlord hand-over ready",
    ],
    subs: [{ title: "Move In / Move Out", slug: "move-in-move-out" }],
  },
  {
    id: "post-construction",
    img: cleaningImg,
    title: "Post-Construction Cleaning",
    text: "Remove dust, paint splatter and debris after renovation or new build handover.",
    features: [
      "Fine construction dust removal",
      "Paint, cement & adhesive spot removal",
      "Window, frame & fitting polish",
      "Debris haul-out and final buff",
    ],
    subs: [{ title: "Deep Cleaning", slug: "deep-cleaning" }],
  },
] as const;

function Services() {
  return (
    <div>
      <PageHero title="Our Services" subtitle="Cleaning is our core — here's how we help." />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-primary">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
                  <a
                    href={`#${s.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline"
                  >
                    Learn more →
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-24 space-y-16">
            {services.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className={`grid scroll-mt-24 items-center gap-10 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>img]:order-2" : ""
                }`}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand">Service</div>
                  <h3 className="mt-2 text-3xl font-black text-primary">{s.title}</h3>
                  <div className="mt-3 h-1 w-14 rounded-full bg-brand" />
                  <p className="mt-5 text-muted-foreground">{s.text}</p>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {s.subs && s.subs.length > 0 && (
                    <div className="mt-6">
                      <div className="text-xs font-bold uppercase tracking-widest text-brand">Read more about:</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.subs.map((sub) => (
                          <Link
                            key={sub.slug}
                            to="/services/$slug"
                            params={{ slug: sub.slug }}
                            className="rounded-full border-2 border-brand px-4 py-2 text-xs font-bold text-brand hover:bg-brand hover:text-brand-foreground"
                          >
                            {sub.title} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link
                    to="/book-online"
                    className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground hover:opacity-90"
                  >
                    Book {s.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/book-online"
              className="inline-block rounded-full bg-brand px-8 py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 hover:opacity-90"
            >
              Book Your Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
