import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { logActivity } from "@/features/activity/logger";

async function addService(formData: FormData) {
  "use server";
  const payload = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    icon: String(formData.get("icon") ?? "Briefcase"),
    image_url: String(formData.get("image_url") ?? "") || null
  };
  const { data } = await supabaseAdmin.from("services").insert(payload).select("id").single();
  await logActivity({
    action: "content_created",
    entityType: "service",
    entityId: data?.id ?? null,
    metadata: { title: payload.title }
  });
  revalidatePath("/dashboard/services");
}

async function deleteService(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  await supabaseAdmin.from("services").delete().eq("id", id);
  await logActivity({
    action: "content_deleted",
    entityType: "service",
    entityId: id
  });
  revalidatePath("/dashboard/services");
}

export default async function ServicesAdminPage() {
  const { data } = await supabaseAdmin.from("services").select("id,title,description").order("created_at", { ascending: false });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Add Service</CardTitle></CardHeader>
        <CardContent>
          <form action={addService} className="space-y-3">
            <Input name="title" placeholder="Title" required />
            <Input name="icon" placeholder="Icon" required />
            <Input name="image_url" placeholder="Image URL" />
            <Textarea name="description" placeholder="Description" required />
            <Button>Add Service</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Service List</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {(data ?? []).map((service) => (
            <div key={service.id} className="rounded-xl border border-zinc-200 p-3">
              <p className="font-semibold">{service.title}</p>
              <p className="text-sm text-zinc-600">{service.description}</p>
              <form action={deleteService} className="mt-2">
                <input type="hidden" name="id" value={service.id} />
                <Button size="sm" variant="ghost">Delete</Button>
              </form>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
