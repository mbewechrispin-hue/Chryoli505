import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { env } from "@/lib/env";
import { z } from "zod";

const breakdownSchema = z.record(z.string(), z.coerce.number().min(0)).default({});

const snapshotSchema = z.object({
  dateKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  visitors: z.coerce.number().int().min(0),
  pageViews: z.coerce.number().int().min(0),
  sessions: z.coerce.number().int().min(0),
  quoteRequests: z.coerce.number().int().min(0).default(0),
  devices: breakdownSchema,
  browsers: breakdownSchema,
  trafficSources: breakdownSchema,
  countries: breakdownSchema
});

function readAuthSecret(request: NextRequest) {
  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return bearer.slice(7).trim();
  }

  return request.headers.get("x-analytics-secret")?.trim() ?? "";
}

export async function POST(request: NextRequest) {
  if (env.GA4_API_SECRET) {
    const requestSecret = readAuthSecret(request);
    if (requestSecret !== env.GA4_API_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = snapshotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const dateKey = parsed.data.dateKey ?? new Date().toISOString().slice(0, 10);

  const payload = {
    date_key: dateKey,
    visitors: parsed.data.visitors,
    page_views: parsed.data.pageViews,
    sessions: parsed.data.sessions,
    quote_requests: parsed.data.quoteRequests,
    devices: parsed.data.devices,
    browsers: parsed.data.browsers,
    traffic_sources: parsed.data.trafficSources,
    countries: parsed.data.countries
  };

  const { error } = await supabaseAdmin.from("analytics").upsert(payload, { onConflict: "date_key" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, dateKey });
}
