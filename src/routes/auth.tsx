import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign In | SparklePro" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        setMsg("Account created. You may need to be granted admin access — contact the owner.");
      }
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero title="Admin Access" subtitle="Sign in to view submissions." />
      <section className="py-20">
        <form onSubmit={submit} className="mx-auto max-w-md rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
          <div className="flex gap-2">
            <button type="button" onClick={() => setMode("signin")} className={`flex-1 rounded-full px-4 py-2 text-sm font-bold ${mode === "signin" ? "bg-brand text-brand-foreground" : "bg-muted"}`}>Sign In</button>
            <button type="button" onClick={() => setMode("signup")} className={`flex-1 rounded-full px-4 py-2 text-sm font-bold ${mode === "signup" ? "bg-brand text-brand-foreground" : "bg-muted"}`}>Sign Up</button>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
            </div>
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
            </div>
            {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
            <button disabled={loading} className="w-full rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground disabled:opacity-60">
              {loading ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}