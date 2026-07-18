import { useEffect, useState } from "react";
import ownerImg from "@/assets/owner-welcome.jpg";

const KEY = "sparklepro_welcome_seen_v1";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* noop */ }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-card shadow-2xl md:grid-cols-2">
        <button
          type="button"
          onClick={close}
          aria-label="Skip and continue to website"
          className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-primary shadow ring-1 ring-border transition hover:bg-white"
        >
          Skip ✕
        </button>

        <div className="relative hidden bg-primary md:block">
          <img
            src={ownerImg}
            alt="SparklePro owner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Founder</div>
            <div className="text-lg font-black">SparklePro Integrated Cleaning</div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <img
            src={ownerImg}
            alt="SparklePro owner"
            className="mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-brand md:hidden"
          />
          <div className="text-xs font-bold uppercase tracking-widest text-brand">Welcome</div>
          <h2 id="welcome-title" className="mt-2 text-2xl font-black leading-tight text-primary md:text-3xl">
            Welcome to SparklePro Integrated Cleaning Service
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Join our list for cleaning tips, seasonal offers and priority booking in Lekki and across Lagos.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); close(); }}
            className="mt-5 space-y-3"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition hover:opacity-90"
            >
              Continue to Website →
            </button>
          </form>

          <button
            type="button"
            onClick={close}
            className="mt-3 w-full text-center text-xs font-semibold text-muted-foreground hover:text-brand"
          >
            No thanks, take me to the website
          </button>
        </div>
      </div>
    </div>
  );
}