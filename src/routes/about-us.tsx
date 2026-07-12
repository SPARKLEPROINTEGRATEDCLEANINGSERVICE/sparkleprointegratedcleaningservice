import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import cleanHome from "@/assets/clean-home.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us | SparklePro Integrated Cleaning Service" },
      {
        name: "description",
        content:
          "Learn about SparklePro Integrated Cleaning Service — a trusted house cleaning company in Lekki, Lagos. Our mission, vision and team.",
      },
      { property: "og:title", content: "About SparklePro Integrated Cleaning Service" },
      { property: "og:description", content: "Our mission, vision and team." },
    ],
  }),
  component: About,
});

function About() {
  const skills = [
    ["Cleaners Deployments", 92],
    ["Move-in / Move-out Cleaning", 93],
    ["Fumigation & Pest Control", 94],
    ["Pre & Post Events Cleaning", 98],
    ["Waste Management", 93],
    ["Residential Cleaning", 92],
    ["Commercial Cleaning", 93],
    ["Post-Construction Cleaning", 91],
  ] as const;

  const team = [
    {
      img: team1,
      name: "Adewale O.",
      role: "Executive Director",
      bio: "Adewale leads strategy at SparklePro Integrated Cleaning Service.",
    },
    {
      img: team2,
      name: "Chidinma E.",
      role: "General Manager",
      bio: "Chidinma manages daily operations across every SparklePro job.",
    },
    {
      img: team3,
      name: "Tunde A.",
      role: "Operations Manager",
      bio: "Tunde coordinates our field teams and quality assurance.",
    },
  ];

  return (
    <div>
      <PageHero title="About Us" subtitle="House cleaning service — Lekki, Lagos." />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <img
            src={cleanHome}
            alt="Clean home after SparklePro service"
            width={1200}
            height={800}
            loading="lazy"
            className="rounded-2xl object-cover shadow-lg"
          />
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Who We Are</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
              A cleaning service you can trust.
            </h2>
            <p className="mt-5 text-muted-foreground">
              SparklePro Integrated Cleaning Service is a house cleaning company located at U3 Estate Maruwa, Lekki 105101, Lagos.
              We are open 24 hours and rated 4.8★ on Google. We help homes and offices stay spotless so you can focus on other things.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-muted/60 p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-brand">Our Vision</div>
                <p className="mt-2 text-sm text-foreground">
                  To be the best option for our customers.
                </p>
              </div>
              <div className="rounded-xl bg-muted/60 p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-brand">Our Mission</div>
                <p className="mt-2 text-sm text-foreground">
                  To offer uncommon quality services to our customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="text-3xl font-black text-primary md:text-4xl">
            The best cleaning &amp; janitorial service you can trust.
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {skills.map(([label, v]) => (
              <div key={label}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{label}</span>
                  <span className="text-brand">{v}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Our People</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Meet Our Team</h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {team.map((m) => (
              <article
                key={m.name}
                className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    width={800}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="text-xl font-black text-primary">{m.name}</div>
                  <div className="mt-1 text-sm font-semibold text-brand">{m.role}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
