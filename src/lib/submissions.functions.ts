import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: { name: string; email?: string; phone?: string; message: string; service?: string; source?: string }) => d)
  .handler(async ({ data }) => {
    const c = publicClient();
    const { error } = await c.from("contact_requests").insert({
      name: data.name.slice(0, 200),
      email: data.email?.slice(0, 255) ?? null,
      phone: data.phone?.slice(0, 50) ?? null,
      message: data.message.slice(0, 4000),
      service: data.service?.slice(0, 100) ?? null,
      source: data.source?.slice(0, 100) ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((d: { name: string; phone: string; email?: string; service: string; address?: string; date?: string; time?: string; notes?: string }) => d)
  .handler(async ({ data }) => {
    const c = publicClient();
    const { error } = await c.from("booking_requests").insert({
      name: data.name.slice(0, 200),
      phone: data.phone.slice(0, 50),
      email: data.email?.slice(0, 255) ?? null,
      service: data.service.slice(0, 100),
      address: data.address?.slice(0, 500) ?? null,
      preferred_date: data.date || null,
      preferred_time: data.time || null,
      notes: data.notes?.slice(0, 4000) ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const logWhatsappClick = createServerFn({ method: "POST" })
  .inputValidator((d: { service?: string; page?: string; details?: string }) => d)
  .handler(async ({ data }) => {
    const c = publicClient();
    await c.from("whatsapp_clicks").insert({
      service: data.service?.slice(0, 100) ?? null,
      page: data.page?.slice(0, 200) ?? null,
      details: data.details?.slice(0, 2000) ?? null,
    });
    return { ok: true };
  });

export const listSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await (context.supabase.rpc as unknown as (fn: string, args: Record<string, unknown>) => Promise<{ data: boolean | null }>) ("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const [c, b, w] = await Promise.all([
      context.supabase.from("contact_requests").select("*").order("created_at", { ascending: false }).limit(1000),
      context.supabase.from("booking_requests").select("*").order("created_at", { ascending: false }).limit(1000),
      context.supabase.from("whatsapp_clicks").select("*").order("created_at", { ascending: false }).limit(1000),
    ]);
    return { contacts: c.data ?? [], bookings: b.data ?? [], whatsapp: w.data ?? [] };
  });