import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroTeam from "@/assets/hero-team.jpg";
import heroVideo from "@/assets/284189.mp4.asset.json";
import { VideoPlayer } from "@/components/video-player";
import cleaningImg from "@/assets/service-cleaning.jpg";
import fumigationImg from "@/assets/service-fumigation.jpg";
import suppliesImg from "@/assets/supplies.jpg";
import cleanHome from "@/assets/clean-home.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-foreground">
              Cleaning is Our Core
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-primary md:text-6xl">
              Focus On Other Things.
              <span className="block text-brand">We'll Handle The Cleaning.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              SparklePro Integrated Cleaning Service is a trusted house cleaning provider based in Lekki, Lagos.
              Open 24 hours to keep your home and office spotless.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/book-online"
                className="rounded-full bg-brand px-7 py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition hover:opacity-90"
              >
                Book Online
              </Link>
              <a
                href="tel:+2348146269080"
                className="rounded-full border-2 border-primary px-7 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Call +234 814 626 9080
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm">
              <div>
                <div className="text-3xl font-black text-primary">4.8★</div>
                <div className="text-muted-foreground">Google Rating</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-3xl font-black text-primary">24/7</div>
                <div className="text-muted-foreground">Always Open</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-3xl font-black text-primary">Lekki</div>
                <div className="text-muted-foreground">Based in Lagos</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <VideoPlayer src={heroVideo.url} poster={heroTeam} aspect="16/10" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-brand px-6 py-4 text-brand-foreground shadow-xl md:block">
              <div className="text-xs uppercase tracking-widest opacity-90">Trusted House Cleaners</div>
              <div className="text-2xl font-black">Lekki, Lagos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services cards */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">What We Do</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
              The Home of Professional Cleaning
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                img: cleaningImg,
                title: "Cleaning Services",
                text: "Regular house cleaning, deep cleaning, move-in/out and sanitation & disinfection across Lagos.",
              },
              {
                img: fumigationImg,
                title: "Fumigation & Pest Control",
                text: "Odorless, eco-friendly fumigation and disinfection for bed bugs, cockroaches, rodents and more.",
              },
              {
                img: suppliesImg,
                title: "Deep Cleaning",
                text: "Complete resets for kitchens, bathrooms, appliances and living areas — every corner, done properly.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-primary">{c.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.text}</p>
                  <Link
                    to="/our-services"
                    className="mt-4 inline-block text-sm font-bold text-brand hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision + stats */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <img
            src={cleanHome}
            alt="Spotless Lagos apartment after cleaning"
            width={1200}
            height={800}
            loading="lazy"
            className="rounded-2xl object-cover shadow-lg"
          />
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Our Vision</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
              To be the only available option of choice for our customers.
            </h2>
            <p className="mt-5 text-muted-foreground">
              At SparklePro Integrated Cleaning Service we deliver quality — every visit, every corner, every time.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { label: "House Cleaning", v: 96 },
                { label: "Deep Cleaning", v: 94 },
                { label: "Fumigation", v: 89 },
                { label: "Training", v: 94 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{s.label}</span>
                    <span className="text-brand">{s.v}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-black md:text-4xl">Why Choose SparklePro</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              ["Professional Cleaners", "We clean with a touch of professionalism."],
              ["Trained & Secured Janitors", "We don't just train — we deploy the right people."],
              ["Managed Services", "Facilities managed services with dedication."],
              ["Eco-Friendly Fumigation", "Reagents that are safe for humans and nature."],
              ["Commitment To Service", "We don't just clean. We clean right."],
              ["Training", "We train and empower our team continuously."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-black">
                  ✓
                </div>
                <div className="text-lg font-bold">{t}</div>
                <p className="mt-2 text-sm opacity-80">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form + stats */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand">About</div>
            <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
              One of the best cleaning services in Lekki, Lagos.
            </h2>
            <p className="mt-5 text-muted-foreground">
              SparklePro Integrated Cleaning Service is a professional house cleaning service company based at U3 Estate Maruwa, Lekki.
              What we do, how we render our services, and the people we serve make us stand out. We create positive impact on
              nature — our reagents and equipment are eco-friendly.
            </p>
            <Link
              to="/about-us"
              className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
            >
              Read More
            </Link>
          </div>
          <img
            src={suppliesImg}
            alt="Cleaning supplies"
            width={1000}
            height={800}
            loading="lazy"
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-accent py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 md:px-8">
          {[
            ["4.8★", "Google Rating"],
            ["24/7", "Open Hours"],
            ["250+", "Homes Cleaned"],
            ["100%", "Satisfaction"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-4xl font-black text-accent-foreground">{n}</div>
              <div className="mt-1 text-sm font-semibold text-accent-foreground/80">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground shadow-xl">
          <h2 className="text-3xl font-black md:text-4xl">Ready for a spotless space?</h2>
          <p className="mt-3 opacity-90">Book SparklePro today — house cleaning done right in Lekki and across Lagos.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/book-online"
              className="rounded-full bg-brand px-7 py-3 text-sm font-bold text-brand-foreground hover:opacity-90"
            >
              Book Online
            </Link>
            <a
              href="tel:+2348146269080"
              className="rounded-full border-2 border-white/60 px-7 py-3 text-sm font-bold hover:bg-white/10"
            >
              +234 814 626 9080
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
