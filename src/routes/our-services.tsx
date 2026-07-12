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
    img: cleaningImg,
    title: "House Cleaning",
    text: "Deep cleaning for apartments, duplexes and estates across Lekki, Ajah, Ikoyi and VI. Floor care, kitchen, bathrooms and living areas.",
  },
  {
    img: janitorialImg,
    title: "Office & Janitorial",
    text: "Trained janitors deployed to your office. Daily, weekly or monthly plans with full supervision.",
  },
  {
    img: fumigationImg,
    title: "Fumigation & Pest Control",
    text: "Odorless, eco-friendly fumigation for bed bugs, cockroaches, rodents and termites.",
  },
  {
    img: suppliesImg,
    title: "Move In / Move Out",
    text: "Get keys to a spotless new home or leave your old one spotless for the next tenant.",
  },
  {
    img: cleaningImg,
    title: "Post-Construction Cleaning",
    text: "Remove dust, paint splatter and debris after renovation or new build handover.",
  },
  {
    img: janitorialImg,
    title: "Events Clean-Up",
    text: "Pre and post-event cleaning for weddings, corporate functions and private parties.",
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
