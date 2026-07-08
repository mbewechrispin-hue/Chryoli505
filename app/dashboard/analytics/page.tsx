import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorsChart, TrafficSourceChart } from "@/features/analytics/charts";

export default async function AnalyticsPage() {
  const { data } = await supabaseAdmin
    .from("analytics")
    .select("date_key,visitors,page_views,sessions,traffic_sources")
    .order("date_key", { ascending: false })
    .limit(30);

  const rows = [...(data ?? [])].reverse();

  const visitorsData = rows.map((item) => ({
    date: item.date_key,
    visitors: item.visitors
  }));

  const sourceTotals = new Map<string, number>();
  for (const row of rows) {
    const sources = (row.traffic_sources ?? {}) as Record<string, number>;
    Object.entries(sources).forEach(([key, value]) => {
      sourceTotals.set(key, (sourceTotals.get(key) ?? 0) + Number(value));
    });
  }

  const sourceData = Array.from(sourceTotals.entries()).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Daily Visitors</CardTitle></CardHeader>
        <CardContent><VisitorsChart data={visitorsData} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Traffic Sources</CardTitle></CardHeader>
        <CardContent><TrafficSourceChart data={sourceData.length ? sourceData : [{ name: "No Data", value: 1 }]} /></CardContent>
      </Card>
    </div>
  );
}
