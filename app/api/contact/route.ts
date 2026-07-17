import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { contactSchema } from "@/features/contact/schema";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeInput } from "@/lib/sanitize";
import { sendContactNotification } from "@/lib/emails";
import { env } from "@/lib/env";
import { verifyCsrfToken } from "@/lib/csrf";
import type { Database } from "@/types/database";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const csrfHeader = request.headers.get("x-csrf-token");
  const csrfCookie = cookieStore.get("csrf-token")?.value ?? null;

  if (!verifyCsrfToken(csrfHeader, csrfCookie)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rate = checkRateLimit(`contact:${ip}`, env.RATE_LIMIT_MAX, env.RATE_LIMIT_WINDOW_MS);

  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const payload: Database["public"]["Tables"]["contact_messages"]["Insert"] = {
    name: sanitizeInput(parsed.data.name),
    email: sanitizeInput(parsed.data.email),
    subject: sanitizeInput(parsed.data.subject),
    message: sanitizeInput(parsed.data.message),
    ip_address: ip
  };

  const { error } = await supabaseAdmin.from("contact_messages").insert(payload as unknown as never[]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await sendContactNotification({
    Name: payload.name,
    Email: payload.email,
    Subject: payload.subject,
    Message: payload.message
  });

  return NextResponse.json({ success: true });
}
