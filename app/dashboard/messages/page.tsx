import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MessagesPage() {
  const { data } = await supabaseAdmin
    .from("contact_messages")
    .select("id,name,email,subject,message,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  type MessageRow = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
  };

  const rows = (data ?? []) as MessageRow[];

  return (
    <Card>
      <CardHeader><CardTitle>Messages</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rows.map((message) => (
            <div key={message.id} className="rounded-2xl border border-zinc-200 p-4">
              <p className="font-semibold">{message.subject}</p>
              <p className="text-sm text-zinc-500">{message.name} • {message.email}</p>
              <p className="mt-2 text-sm text-zinc-700">{message.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
