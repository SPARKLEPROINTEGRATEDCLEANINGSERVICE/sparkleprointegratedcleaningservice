import { Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About" },
  { to: "/our-services", label: "Our Services" },
  { to: "/contact", label: "Contact Us" },
  { to: "/book-online", label: "Book Online" },
];

export function SiteLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-black">
              S
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black tracking-wide text-primary">SPARKLEPRO</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Integrated Cleaning
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-semibold tracking-wide text-foreground/80 transition hover:text-brand"
                activeProps={{ className: "text-brand" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-md border border-border p-2 md:hidden"
          >
            <div className="h-0.5 w-5 bg-foreground" />
            <div className="mt-1 h-0.5 w-5 bg-foreground" />
            <div className="mt-1 h-0.5 w-5 bg-foreground" />
          </button>
        </div>
        {open && (
          <div className="border-t border-border md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
          <div>
            <div className="text-lg font-black">SPARKLEPRO</div>
            <div className="text-xs uppercase tracking-widest opacity-80">Integrated Cleaning Service</div>
            <p className="mt-4 text-sm opacity-80">
              A trusted house cleaning service based in Lekki, Lagos. Focus on other things — cleaning is our core.
            </p>
          </div>
          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-widest">Quick Links</div>
            <ul className="space-y-2 text-sm opacity-90">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-brand">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-widest">Contact</div>
            <ul className="space-y-2 text-sm opacity-90">
              <li>U3 Estate Maruwa, Lekki 105101</li>
              <li>Lagos, Nigeria</li>
              <li>
                <a href="tel:+2348146269080" className="hover:text-brand">
                  +234 814 626 9080
                </a>
              </li>
              <li>Open 24 hours</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-widest">Book Now</div>
            <p className="text-sm opacity-90">Get a spotless space today — call us or book online.</p>
            <Link
              to="/book-online"
              className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground hover:opacity-90"
            >
              Book Online
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
          © {new Date().getFullYear()} SparklePro Integrated Cleaning Service. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,var(--color-brand),transparent_40%),radial-gradient(circle_at_80%_60%,var(--color-brand),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8">
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">{subtitle}</p>}
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-brand" />
      </div>
    </section>
  );
}
