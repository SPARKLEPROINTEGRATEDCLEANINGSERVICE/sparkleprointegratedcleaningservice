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

      <WhyChooseUs />
    </div>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      title: "Professional Cleaners",
      text: "Every SparklePro job is handled with a touch of professionalism — we are proud to be a professional cleaning services company in Lekki, Lagos.",
    },
    {
      title: "Trained & Secured Janitors",
      text: "We don't just train. We vet, background-check and deploy the right candidates to your home or office.",
    },
    {
      title: "Managed Services",
      text: "We provide uncommon facilities managed services with dedication, supervision and reliable follow-through.",
    },
    {
      title: "Eco-Friendly Fumigation",
      text: "Our reagents are odourless and safe for people and pets — effective on pests, gentle on your space.",
    },
    {
      title: "Commitment to Quality",
      text: "We are committed to quality service. We don't just clean — we clean right, every single time.",
    },
    {
      title: "Ongoing Training",
      text: "We continually train and empower our cleaners so every SparklePro visit meets the same 4.8★ standard.",
    },
  ];

  return (
    <section className="bg-muted/50 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-brand">Why Choose Us</div>
          <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
            Not just anybody can clean and get it right.
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
          <p className="mt-6 text-muted-foreground">
            You can't afford to deploy just anyone to take care of your investments and properties. SparklePro
            Integrated Cleaning Service is a team of professionals who know exactly what to do for your peace of
            mind — a janitorial services company in Lekki, Lagos with a difference.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <div className="text-lg font-black text-primary">{r.title}</div>
              <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <article className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
            <h3 className="text-2xl font-black text-primary">
              One of the best cleaning teams in Lekki
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              There are many cleaning companies in Lagos, but what sets SparklePro apart is how we work — our people,
              our reagents and our attention to detail. We create positive impact by using eco-friendly products and
              equipment so your space is spotless without harming the environment.
            </p>
          </article>

          <article className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
            <h3 className="text-2xl font-black text-primary">
              Fumigation, disinfection & decontamination
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Our technicians combine eco-friendly reagents with the right equipment — including thermal fogging — for
              fumigation, virus disinfection and pest control in homes, offices and public spaces across Lekki, Ajah,
              Ikoyi and Victoria Island.
            </p>
          </article>

          <article className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:col-span-2">
            <h3 className="text-2xl font-black text-primary">
              Janitorial services you can rely on
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Cleaning may seem simple, but a truly spotless and hygienic environment takes expertise. SparklePro
              deploys trained cleaners and janitors across Lagos with full supervision, so you never have to worry
              about unexpected absence or drop in quality. We serve residential, commercial and post-construction
              spaces — Lekki, Ajah, VI, Ikoyi, Maryland and surrounding areas. Call{" "}
              <a href="tel:+2348146269080" className="font-bold text-brand">
                +234 814 626 9080
              </a>{" "}
              to request a tailored proposal.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
