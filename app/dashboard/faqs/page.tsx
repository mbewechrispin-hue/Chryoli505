import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { logActivity } from "@/features/activity/logger";

async function addFaq(formData: FormData) {
  "use server";
  const payload = {
    question: String(formData.get("question") ?? ""),
    answer: String(formData.get("answer") ?? "")
  };
  const { data } = await supabaseAdmin.from("faqs").insert(payload).select("id").single();
  await logActivity({
    action: "content_created",
    entityType: "faq",
    entityId: data?.id ?? null,
    metadata: { question: payload.question }
  });
  revalidatePath("/dashboard/faqs");
}

async function deleteFaq(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  await supabaseAdmin.from("faqs").delete().eq("id", id);
  await logActivity({ action: "content_deleted", entityType: "faq", entityId: id });
  revalidatePath("/dashboard/faqs");
}

export default async function FaqAdminPage() {
  const { data } = await supabaseAdmin.from("faqs").select("id,question,answer").order("created_at", { ascending: false });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Add FAQ</CardTitle></CardHeader>
        <CardContent>
          <form action={addFaq} className="space-y-3">
            <Input name="question" placeholder="Question" required />
            <Textarea name="answer" placeholder="Answer" required />
            <Button>Add FAQ</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>FAQ List</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {(data ?? []).map((item) => (
            <div key={item.id} className="rounded-xl border border-zinc-200 p-3">
              <p className="font-semibold">{item.question}</p>
              <p className="text-sm text-zinc-600">{item.answer}</p>
              <form action={deleteFaq} className="mt-2">
                <input type="hidden" name="id" value={item.id} />
                <Button size="sm" variant="ghost">Delete</Button>
              </form>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
