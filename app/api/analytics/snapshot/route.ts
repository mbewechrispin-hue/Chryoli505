import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function POST() {
  const now = new Date();
  const dateKey = now.toISOString().slice(0, 10);

  const payload = {
    date_key: dateKey,
    visitors: randomRange(200, 1200),
    page_views: randomRange(400, 2200),
    sessions: randomRange(180, 900),
    quote_requests: randomRange(4, 40),
    devices: { desktop: 58, mobile: 36, tablet: 6 },
    browsers: { chrome: 61, safari: 22, edge: 10, firefox: 7 },
    traffic_sources: { organic: 44, direct: 27, referral: 18, social: 11 },
    countries: { US: 34, UK: 21, KE: 18, NG: 14, IN: 13 }
  };

  const { error } = await supabaseAdmin.from("analytics").upsert(payload, { onConflict: "date_key" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, dateKey });
}
