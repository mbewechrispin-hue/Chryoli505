import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorsChart, TrafficSourceChart } from "@/features/analytics/charts";

const cards = [
  ["Total Visitors", "24,830"],
  ["Total Quotations", "1,240"],
  ["Total Messages", "742"],
  ["Conversion Rate", "5.4%"],
  ["New Requests Today", "18"]
] as const;

const visitors = [
  { date: "Mon", visitors: 430 },
  { date: "Tue", visitors: 520 },
  { date: "Wed", visitors: 470 },
  { date: "Thu", visitors: 610 },
  { date: "Fri", visitors: 740 },
  { date: "Sat", visitors: 580 },
  { date: "Sun", visitors: 530 }
];

const sources = [
  { name: "Organic", value: 44 },
  { name: "Direct", value: 27 },
  { name: "Referral", value: 18 },
  { name: "Social", value: 11 }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-sm text-zinc-500">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Visitors Chart</CardTitle></CardHeader>
          <CardContent><VisitorsChart data={visitors} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Traffic Sources</CardTitle></CardHeader>
          <CardContent><TrafficSourceChart data={sources} /></CardContent>
        </Card>
      </div>
    </div>
  );
}
