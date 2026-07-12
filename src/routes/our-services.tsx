import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import cleaningImg from "@/assets/service-cleaning.jpg";
import janitorialImg from "@/assets/service-janitorial.jpg";
import fumigationImg from "@/assets/service-fumigation.jpg";
import suppliesImg from "@/assets/supplies.jpg";

export const Route = createFileRoute("/our-services")({
  head: () => ({
    meta: [
      { title: "Our Services | SparklePro Integrated Cleaning Service" },
      {
        name: "description",
        content:
          "House cleaning, janitorial, fumigation and post-construction cleaning services by SparklePro in Lekki, Lagos.",
      },
      { property: "og:title", content: "SparklePro Services" },
      { property: "og:description", content: "Cleaning, janitorial and fumigation in Lagos." },
    ],
  }),
  component: Services,
});

const services = [
  {
    id: "house-cleaning",
    img: cleaningImg,
    title: "House Cleaning",
    text: "Deep cleaning for apartments, duplexes and estates across Lekki, Ajah, Ikoyi and VI. Floor care, kitchen, bathrooms and living areas.",
    features: [
      "Kitchen degrease, appliance & cabinet wipe-down",
      "Bathroom sanitisation and descaling",
      "Floor mop, vacuum and surface dusting",
      "Bed making and living-area tidy",
    ],
  },
  {
    id: "janitorial",
    img: janitorialImg,
    title: "Office & Janitorial",
    text: "Trained janitors deployed to your office. Daily, weekly or monthly plans with full supervision.",
    features: [
      "Dedicated, background-checked janitors",
      "Daily / weekly / monthly rotation",
      "On-site supervisor and QA visits",
      "Consumables & restroom restocking",
    ],
  },
  {
    id: "fumigation",
    img: fumigationImg,
    title: "Fumigation & Pest Control",
    text: "Odorless, eco-friendly fumigation for bed bugs, cockroaches, rodents and termites.",
    features: [
      "Thermal-fogging virus disinfection",
      "Bed bug, cockroach & rodent treatment",
      "Termite pre & post-construction",
      "Safe for children and pets",
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
  },
  {
    id: "events",
    img: janitorialImg,
    title: "Events Clean-Up",
    text: "Pre and post-event cleaning for weddings, corporate functions and private parties.",
    features: [
      "Venue pre-event setup cleaning",
      "On-site attendants during event",
      "Overnight teardown and clean-up",
      "Waste sorting and disposal",
    ],
  },
];

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
                  <Link
                    to="/book-online"
                    className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground hover:opacity-90"
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
