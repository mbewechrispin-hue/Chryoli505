import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { quotationSchema } from "@/features/quotation/schema";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { logActivity } from "@/features/activity/logger";
import { sendNewQuoteNotification, sendQuoteConfirmation } from "@/lib/emails";
import { sanitizeInput } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";
import { verifyCsrfToken } from "@/lib/csrf";
import { COMPANY_EMAIL } from "@/lib/company";
import type { Database } from "@/types/database";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const csrfHeader = request.headers.get("x-csrf-token");
  const csrfCookie = cookieStore.get("csrf-token")?.value ?? null;

  if (!verifyCsrfToken(csrfHeader, csrfCookie)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rate = checkRateLimit(`quote:${ip}`, env.RATE_LIMIT_MAX, env.RATE_LIMIT_WINDOW_MS);

  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = quotationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload: Database["public"]["Tables"]["quotations"]["Insert"] = {
    full_name: sanitizeInput(parsed.data.fullName),
    company_name: sanitizeInput(parsed.data.companyName),
    email: sanitizeInput(parsed.data.email),
    phone_number: sanitizeInput(parsed.data.phoneNumber),
    service_type: sanitizeInput(parsed.data.serviceType),
    budget_range: sanitizeInput(parsed.data.budgetRange),
    project_description: sanitizeInput(parsed.data.projectDescription)
  };

  const { data, error } = await supabaseAdmin.from("quotations").insert(payload as unknown as never[]).select("id").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const insertedId = (data as { id?: string | null } | null)?.id ?? null;

  await Promise.all([
    sendNewQuoteNotification(COMPANY_EMAIL, {
      Name: payload.full_name!,
      Company: payload.company_name!,
      Email: payload.email!,
      Phone: payload.phone_number!,
      Service: payload.service_type!,
      Budget: payload.budget_range!,
      Description: payload.project_description!
    }),
    sendQuoteConfirmation(payload.email!, payload.full_name!),
    logActivity({
      action: "quote_created",
      entityType: "quotation",
      entityId: insertedId,
      metadata: { email: payload.email ?? "" },
      ipAddress: ip
    })
  ]);

  return NextResponse.json({ success: true, id: insertedId });
}
