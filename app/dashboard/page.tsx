import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  ["Total Visitors", "24,830"],
  ["Total Quotations", "1,240"],
  ["Total Messages", "742"],
  ["Conversion Rate", "5.4%"],
  ["New Requests Today", "18"]
] as const;


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

      <div className="grid gap-6 lg:grid-cols-1">
        <Card>
          <CardHeader><CardTitle>Analytics Removed</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600">Analytics functionality has been removed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
