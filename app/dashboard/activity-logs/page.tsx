import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ActivityLogsPage() {
  const { data } = await supabaseAdmin
    .from("activity_logs")
    .select("id,action,entity_type,ip_address,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <Card>
      <CardHeader><CardTitle>Activity Logs</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500">
                <th className="py-3">Action</th>
                <th>Entity</th>
                <th>IP Address</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((item) => (
                <tr key={item.id} className="border-b border-zinc-100">
                  <td className="py-3">{item.action}</td>
                  <td>{item.entity_type}</td>
                  <td>{item.ip_address ?? "-"}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
