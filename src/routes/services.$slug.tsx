import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import { useState } from "react";
import { submitContact, logWhatsappClick } from "@/lib/submissions.functions";
import { useServerFn } from "@tanstack/react-start";
import subRegular from "@/assets/sub-regular.jpg";
import subMovein from "@/assets/sub-movein.jpg";
import subSanitation from "@/assets/sub-sanitation.jpg";
import subDeep from "@/assets/sub-deep.jpg";
import subInsect from "@/assets/sub-insect.jpg";
import v284854 from "@/assets/284854.mp4.asset.json";
import v284217 from "@/assets/284217.mp4.asset.json";
import v284201 from "@/assets/284201.mp4.asset.json";
import { VideoPlayer } from "@/components/video-player";

type Sub = {
  slug: string;
  parent: "Cleaning Services" | "Fumigation & Pest Control";
  title: string;
  tagline: string;
  img: string;
  video?: string;
  importance: string[];
  how: string[];
  why: string[];
  impact: string[];
  contactUs: string;
};

export const SUB_SERVICES: Record<string, Sub> = {
  "regular-house-cleaning": {
    slug: "regular-house-cleaning",
    parent: "Cleaning Services",
    title: "Regular House Cleaning",
    tagline: "Weekly or bi-weekly cleaning that keeps your Lagos home fresh, spotless and stress-free.",
    img: subRegular,
    video: v284854.url,
    importance: [
      "Prevents dust, mould and allergen build-up that trigger asthma and skin problems.",
      "Keeps your home guest-ready every day — no more panic cleaning.",
      "Protects furniture, floors and appliances from long-term damage caused by neglect.",
      "Frees up hours in your week to spend on family, work and rest.",
    ],
    how: [
      "You pick a schedule (weekly, twice-weekly or bi-weekly) that suits your household.",
      "We assign a trained, vetted SparklePro cleaner who visits at the same time every visit.",
      "Every visit covers dusting, sweeping, mopping, bathrooms, kitchen surfaces, bed making and bin-out.",
      "A supervisor spot-checks the work regularly so quality never drops.",
    ],
    why: [
      "The same cleaner comes every visit — they know your home and your preferences.",
      "Eco-friendly reagents that are safe for children and pets.",
      "Fixed monthly pricing — no surprises, no hidden fees.",
      "We come with our own supplies and equipment.",
    ],
    impact: [
      "Dust builds up in vents and rugs, worsening respiratory issues.",
      "Kitchen grease hardens and becomes almost impossible to remove.",
      "Bathrooms develop stubborn mould and mildew stains.",
      "You waste weekends scrubbing instead of resting.",
    ],
    contactUs: "We are Lagos's most reliable recurring-cleaning team. Once you book, you never have to think about house cleaning again — we show up like clockwork.",
  },
  "move-in-move-out": {
    slug: "move-in-move-out",
    parent: "Cleaning Services",
    title: "Move In & Move Out Cleaning",
    tagline: "Get keys to a spotless new home — or leave your old one immaculate for the next tenant.",
    img: subMovein,
    video: v284854.url,
    importance: [
      "Move-in cleaning removes dust, paint residue and the last tenant's germs before your things arrive.",
      "Move-out cleaning helps you recover your full security deposit from your landlord.",
      "Prevents pests and bacteria from settling into an empty space.",
      "Starts your new chapter in a genuinely clean, healthy environment.",
    ],
    how: [
      "We inspect the property before quoting so pricing is transparent.",
      "A team enters an empty apartment and deep-cleans every surface top-to-bottom.",
      "Inside cabinets, wardrobes, ovens, fridges, windows, walls and skirting are all included.",
      "Final walkthrough with you (or your agent) before we hand back keys.",
    ],
    why: [
      "A crew — not a single cleaner — so a full flat is done in one day.",
      "Detailed checklist covers areas most cleaners forget (behind fridges, inside drawers).",
      "Landlord/agent-ready standard so you don't lose any of your deposit.",
      "Same-day and weekend slots available in Lekki, Ajah, VI, Ikoyi and mainland.",
    ],
    impact: [
      "New home feels dirty and unfamiliar — hurts your fresh-start mood.",
      "Landlords deduct heavy cleaning fees from your deposit.",
      "Hidden pests and bacteria from the previous tenant transfer into your things.",
      "Weeks of settling-in stress that could have been avoided in one day.",
    ],
    contactUs: "Moving is stressful enough. Hand the cleaning to SparklePro and focus on the actual move.",
  },
  "sanitation-disinfection": {
    slug: "sanitation-disinfection",
    parent: "Cleaning Services",
    title: "Sanitation & Disinfection",
    tagline: "Kill germs, viruses and bacteria on high-touch surfaces across your home or office.",
    img: subSanitation,
    video: v284217.url,
    importance: [
      "Kills viruses (including COVID-19, influenza), bacteria and fungi that ordinary cleaning misses.",
      "Essential for offices, clinics, schools, gyms and any space with high foot traffic.",
      "Protects vulnerable people — children, elderly and immunocompromised — living in your home.",
      "Reduces sick days and boosts productivity for teams.",
    ],
    how: [
      "Technicians in PPE arrive with hospital-grade, eco-friendly disinfectants.",
      "We use thermal fogging for full-room coverage plus manual wipe-down on high-touch points.",
      "Door handles, switches, remotes, taps, desks, phones and toilets get special attention.",
      "Space is safe to re-enter within 30–60 minutes of treatment.",
    ],
    why: [
      "Certified reagents effective against 99.9% of common pathogens.",
      "Odourless — no lingering chemical smell after treatment.",
      "Trained technicians, not general cleaners doing double duty.",
      "Certificate of disinfection provided for offices and clinics.",
    ],
    impact: [
      "Silent germ spread — one sick person infects the whole household or office.",
      "Recurring stomach bugs, flu and skin infections.",
      "Higher medical bills and time off work or school.",
      "For businesses: reputational damage if a customer falls sick.",
    ],
    contactUs: "For after-illness disinfection, routine office sanitation or post-event decontamination — SparklePro's disinfection team is on call 24/7.",
  },
  "deep-cleaning": {
    slug: "deep-cleaning",
    parent: "Cleaning Services",
    title: "Deep Cleaning Services",
    tagline: "The complete reset — every corner, every crevice, every surface, done properly.",
    img: subDeep,
    video: v284217.url,
    importance: [
      "Removes built-up grime that regular cleaning can't reach — grease, limescale, hard-water stains.",
      "Restores tiles, grout, upholstery and appliances to near-new condition.",
      "Recommended every 3–6 months even for well-maintained homes.",
      "Essential before hosting a big event or after long absences.",
    ],
    how: [
      "A team of 2–4 cleaners spends 4–8 hours on the space, depending on size.",
      "Kitchen: oven interior, extractor hood, cabinet interiors, tile grout, appliances.",
      "Bathroom: descaling, grout whitening, deep tile scrub, silicone-seal cleaning.",
      "Living areas: sofa shampoo, carpet extraction, fan blades, skirting, windows inside and out.",
    ],
    why: [
      "Industrial equipment (steam cleaners, extractors, buffers) — not just mops and cloths.",
      "Trained deep-cleaning specialists, not entry-level cleaners.",
      "Before-and-after photos so you see the difference clearly.",
      "Detail-first approach — we clean areas most people don't even think about.",
    ],
    impact: [
      "Grease and dust fires — clogged extractor hoods are a real fire risk in Lagos flats.",
      "Permanent staining of surfaces that could have been saved.",
      "Poor indoor air quality causing constant sneezing and headaches.",
      "Pest infestation — roaches and rodents love neglected corners.",
    ],
    contactUs: "One SparklePro deep clean will make you wonder why you ever tolerated less. Book a one-off or schedule quarterly resets.",
  },
  "insect-control": {
    slug: "insect-control",
    parent: "Fumigation & Pest Control",
    title: "Insect & Pest Control (Cockroaches, Bedbugs, Mosquitoes, Ants, Rodents)",
    tagline: "Targeted, eco-friendly pest control for every crawling and flying nuisance in your Lagos home.",
    img: subInsect,
    video: v284201.url,
    importance: [
      "Cockroaches spread salmonella, E. coli and trigger asthma in children.",
      "Bedbugs cause severe skin reactions, insomnia and psychological distress.",
      "Mosquitoes remain the #1 disease vector in Nigeria — malaria, dengue, yellow fever.",
      "Rodents chew wiring (fire risk), contaminate food and carry Lassa fever in Nigeria.",
      "Ants and other insects damage food stores and property structure.",
    ],
    how: [
      "Site inspection to identify the pest species and severity of infestation.",
      "Targeted treatment plan — gel baits for roaches, heat/spray for bedbugs, larvicide for mosquitoes, tamper-proof rodent stations.",
      "Eco-friendly, odourless reagents applied to cracks, crevices, drains, mattresses and entry points.",
      "Follow-up visit after 2 weeks to break the breeding cycle completely.",
    ],
    why: [
      "Reagents that are child- and pet-safe — you can re-enter within hours.",
      "Species-specific treatment — not one-spray-fits-all.",
      "Written guarantee: if pests return within our warranty window, we come back free.",
      "Discreet unmarked vehicles for private residences.",
    ],
    impact: [
      "Malaria from mosquitoes remains a leading cause of death in Nigeria.",
      "Bedbug bites spread across the whole household in weeks.",
      "Cockroach droppings contaminate food and trigger childhood asthma.",
      "Rodent-chewed wires cause house fires and power damage.",
      "Untreated infestations reduce property value and rental attractiveness.",
    ],
    contactUs: "Don't wait until the infestation spreads to your neighbours. SparklePro handles cockroaches, bedbugs, mosquitoes, ants and rodents with proven eco-friendly protocols.",
  },
};

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const s = SUB_SERVICES[params.slug];
    return {
      meta: [
        { title: s ? `${s.title} | SparklePro Lagos` : "Service | SparklePro" },
        { name: "description", content: s?.tagline ?? "" },
        { property: "og:title", content: s?.title ?? "SparklePro" },
        { property: "og:description", content: s?.tagline ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    if (!SUB_SERVICES[params.slug]) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-black text-primary">Service not found</h1>
      <Link to="/our-services" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground">Back to services</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-black text-primary">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: SubServicePage,
});

function SubServicePage() {
  const { slug } = Route.useParams();
  const sub = SUB_SERVICES[slug]!;
  return (
    <div>
      <PageHero title={sub.title} subtitle={sub.tagline} />
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-brand">
            <Link to="/our-services" className="hover:underline">Our Services</Link> / {sub.parent}
          </div>
          {sub.video ? (
            <div className="mt-6">
              <VideoPlayer src={sub.video} poster={sub.img} aspect="16/9" />
            </div>
          ) : (
            <img src={sub.img} alt={sub.title} loading="lazy" className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg" />
          )}

          <Block title="Why it matters" items={sub.importance} />
          <Block title="How it works" items={sub.how} />
          <Block title="Why SparklePro does it perfectly" items={sub.why} />
          <Block title="What happens if you don't do it" items={sub.impact} />

          <div className="mt-14 rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Why contact us</div>
            <p className="mt-3 text-lg font-semibold">{sub.contactUs}</p>
          </div>

          <QuickForm service={sub.title} />
        </div>
      </section>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-black text-primary md:text-3xl">{title}</h2>
      <div className="mt-3 h-1 w-14 rounded-full bg-brand" />
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 rounded-xl bg-card p-4 ring-1 ring-border">
            <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-brand" />
            <span className="text-sm text-foreground">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickForm({ service }: { service: string }) {
  const submit = useServerFn(submitContact);
  const logClick = useServerFn(logWhatsappClick);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setErr("Name, phone and message are required.");
      setState("error");
      return;
    }
    setState("sending");
    try {
      await submit({ data: { ...form, service, source: `service:${service}` } });
      setState("sent");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed");
      setState("error");
    }
  };

  const waMessage = `Hi SparklePro, I'd like to book ${service}.\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`;
  const waHref = `https://wa.me/2348146269080?text=${encodeURIComponent(waMessage)}`;

  return (
    <div id="quote" className="mt-14 rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
      <div className="text-xs font-bold uppercase tracking-widest text-brand">Quick Quote</div>
      <h3 className="mt-2 text-2xl font-black text-primary">Book {service}</h3>
      <p className="mt-2 text-sm text-muted-foreground">Fill this in and we'll reply within minutes on WhatsApp.</p>

      {state === "sent" ? (
        <div className="mt-6 rounded-xl bg-primary/10 p-6 ring-1 ring-primary/30">
          <div className="text-lg font-black text-primary">✅ Request received!</div>
          <p className="mt-2 text-sm text-foreground">
            We've logged your request for <span className="font-bold">{service}</span> and will call you shortly on{" "}
            <span className="font-bold">{form.phone}</span>. For a faster reply, tap WhatsApp below.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => logClick({ data: { service, page: "sub-service", details: waMessage } })}
            className="mt-4 inline-block rounded-full bg-[#25D366] px-6 py-2 text-sm font-bold text-white"
          >
            💬 Send on WhatsApp
          </a>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Your Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Input label="Phone Number *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} className="md:col-span-2" />
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Tell us about the job *</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
              placeholder="Address, size of space, preferred date…"
            />
          </div>
          {state === "error" && <div className="md:col-span-2 text-sm text-red-600">{err}</div>}
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button
              disabled={state === "sending"}
              className="rounded-full bg-brand px-7 py-3 text-sm font-bold text-brand-foreground disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Submit request"}
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => logClick({ data: { service, page: "sub-service", details: waMessage } })}
              className="rounded-full bg-[#25D366] px-7 py-3 text-sm font-bold text-white"
            >
              💬 WhatsApp Instead
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </div>
  );
}