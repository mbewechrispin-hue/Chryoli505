import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Database } from "@/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { logActivity } from "@/features/activity/logger";

async function addTestimonial(formData: FormData) {
  "use server";
  const payload: Database["public"]["Tables"]["testimonials"]["Insert"] = {
    name: String(formData.get("name") ?? ""),
    position: String(formData.get("position") ?? ""),
    company: String(formData.get("company") ?? ""),
    photo_url: String(formData.get("photo_url") ?? "") || null,
    review: String(formData.get("review") ?? "")
  };
  const { data } = await supabaseAdmin.from("testimonials").insert(payload as unknown as never[]).select("id").single();
  const testimonialId = (data as { id?: string | null } | null)?.id ?? null;
  await logActivity({
    action: "content_created",
    entityType: "testimonial",
    entityId: testimonialId,
    metadata: { name: payload.name }
  });
  revalidatePath("/dashboard/testimonials");
}

async function deleteTestimonial(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  await supabaseAdmin.from("testimonials").delete().eq("id", id);
  await logActivity({ action: "content_deleted", entityType: "testimonial", entityId: id });
  revalidatePath("/dashboard/testimonials");
}

export default async function TestimonialsAdminPage() {
  const { data } = await supabaseAdmin.from("testimonials").select("id,name,company,review").order("created_at", { ascending: false });
  const rows = (data ?? []) as Database["public"]["Tables"]["testimonials"]["Row"][];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Add Testimonial</CardTitle></CardHeader>
        <CardContent>
          <form action={addTestimonial} className="space-y-3">
            <Input name="name" placeholder="Name" required />
            <Input name="position" placeholder="Position" required />
            <Input name="company" placeholder="Company" required />
            <Input name="photo_url" placeholder="Photo URL" />
            <Textarea name="review" placeholder="Review" required />
            <Button>Add Testimonial</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Testimonials</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {rows.map((item) => (
            <div key={item.id} className="rounded-xl border border-zinc-200 p-3">
              <p className="font-semibold">{item.name} • {item.company}</p>
              <p className="text-sm text-zinc-600">{item.review}</p>
              <form action={deleteTestimonial} className="mt-2">
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
