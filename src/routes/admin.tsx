import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { listSubmissions } from "@/lib/submissions.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin | SparklePro" }] }),
  component: AdminPage,
});

type ContactRow = { id: string; name: string; email: string | null; phone: string | null; message: string; service: string | null; source: string | null; created_at: string };
type BookingRow = { id: string; name: string; phone: string; email: string | null; service: string; address: string | null; preferred_date: string | null; preferred_time: string | null; notes: string | null; created_at: string };
type WaRow = { id: string; service: string | null; page: string | null; details: string | null; created_at: string };

type Tab = "contacts" | "bookings" | "whatsapp";

function AdminPage() {
  const navigate = useNavigate();
  const fetchAll = useServerFn(listSubmissions);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [whatsapp, setWhatsapp] = useState<WaRow[]>([]);
  const [tab, setTab] = useState<Tab>("bookings");
  const [q, setQ] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/auth" });
        return;
      }
      try {
        const res = await fetchAll();
        setContacts(res.contacts as ContactRow[]);
        setBookings(res.bookings as BookingRow[]);
        setWhatsapp(res.whatsapp as WaRow[]);
      } catch (e: unknown) {
        setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchAll, navigate]);

  const services = useMemo(() => {
    const s = new Set<string>();
    contacts.forEach((c) => c.service && s.add(c.service));
    bookings.forEach((b) => s.add(b.service));
    whatsapp.forEach((w) => w.service && s.add(w.service));
    return Array.from(s).sort();
  }, [contacts, bookings, whatsapp]);

  const filter = <T extends Record<string, unknown>>(rows: T[], fields: (keyof T)[], svcField?: keyof T) => {
    const ql = q.toLowerCase();
    return rows.filter((r) => {
      if (service && svcField && String(r[svcField] ?? "") !== service) return false;
      if (!ql) return true;
      return fields.some((f) => String(r[f] ?? "").toLowerCase().includes(ql));
    });
  };

  const filteredContacts = filter(contacts, ["name", "email", "phone", "message", "service", "source"], "service");
  const filteredBookings = filter(bookings, ["name", "email", "phone", "service", "address", "notes"], "service");
  const filteredWa = filter(whatsapp, ["service", "page", "details"], "service");

  const exportCsv = () => {
    const rows = tab === "contacts" ? filteredContacts : tab === "bookings" ? filteredBookings : filteredWa;
    if (!rows.length) return;
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(",")].concat(
      rows.map((r) => keys.map((k) => `"${String((r as Record<string, unknown>)[k] ?? "").replace(/"/g, '""')}"`).join(",")),
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div>
      <PageHero title="Admin Dashboard" subtitle="Contact, booking and WhatsApp requests." />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {loading ? (
            <p>Loading…</p>
          ) : err ? (
            <div className="rounded-xl bg-red-50 p-6 text-red-700 ring-1 ring-red-200">
              <div className="font-black">Access denied</div>
              <p className="mt-2 text-sm">{err}</p>
              <p className="mt-2 text-sm">You need admin role. Contact the owner to grant access to your account, or <Link to="/auth" className="underline">sign in again</Link>.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {(["bookings", "contacts", "whatsapp"] as Tab[]).map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-bold capitalize ${tab === t ? "bg-brand text-brand-foreground" : "bg-muted"}`}>
                      {t} ({t === "bookings" ? bookings.length : t === "contacts" ? contacts.length : whatsapp.length})
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                  <select value={service} onChange={(e) => setService(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <option value="">All services</option>
                    {services.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <button onClick={exportCsv} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Export CSV</button>
                  <button onClick={signOut} className="rounded-full border border-border px-4 py-2 text-sm font-bold">Sign out</button>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto rounded-2xl bg-card shadow-sm ring-1 ring-border">
                {tab === "bookings" && <Table rows={filteredBookings} cols={["created_at", "name", "phone", "email", "service", "address", "preferred_date", "preferred_time", "notes"]} />}
                {tab === "contacts" && <Table rows={filteredContacts} cols={["created_at", "name", "phone", "email", "service", "source", "message"]} />}
                {tab === "whatsapp" && <Table rows={filteredWa} cols={["created_at", "service", "page", "details"]} />}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function Table<T extends Record<string, unknown>>({ rows, cols }: { rows: T[]; cols: (keyof T & string)[] }) {
  if (!rows.length) return <p className="p-8 text-center text-sm text-muted-foreground">No records.</p>;
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-muted text-xs uppercase">
        <tr>{cols.map((c) => <th key={c} className="px-4 py-3">{c.replace(/_/g, " ")}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-border">
            {cols.map((c) => (
              <td key={c} className="max-w-xs truncate px-4 py-3 align-top">
                {c === "created_at" ? new Date(String(r[c])).toLocaleString() : String(r[c] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}