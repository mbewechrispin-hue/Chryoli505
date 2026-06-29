import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logActivity } from "@/features/activity/logger";
import { COMPANY_EMAIL } from "@/lib/company";

async function saveSettings(formData: FormData) {
  "use server";
  const payload = {
    company_name: String(formData.get("company_name") ?? "Yolic"),
    company_email: String(formData.get("company_email") ?? COMPANY_EMAIL),
    company_phone: String(formData.get("company_phone") ?? ""),
    company_address: String(formData.get("company_address") ?? ""),
    logo_url: String(formData.get("logo_url") ?? "") || null,
    favicon_url: String(formData.get("favicon_url") ?? "") || null,
    social_links: {
      facebook: String(formData.get("facebook") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      instagram: String(formData.get("instagram") ?? "")
    }
  };

  const { data } = await supabaseAdmin.from("settings").select("id").limit(1).maybeSingle();

  if (data?.id) {
    await supabaseAdmin.from("settings").update(payload).eq("id", data.id);
  } else {
    await supabaseAdmin.from("settings").insert(payload);
  }

  await logActivity({
    action: "settings_updated",
    entityType: "settings",
    entityId: data?.id ?? null,
    metadata: { company_name: payload.company_name }
  });

  revalidatePath("/dashboard/settings");
}

export default async function SettingsPage() {
  const { data } = await supabaseAdmin.from("settings").select("*").limit(1).maybeSingle();

  return (
    <Card>
      <CardHeader><CardTitle>Company Settings</CardTitle></CardHeader>
      <CardContent>
        <form action={saveSettings} className="grid gap-4 md:grid-cols-2">
          <Input name="company_name" placeholder="Company Name" defaultValue={data?.company_name ?? "Yolic"} required />
          <Input name="company_email" type="email" placeholder="Company Email" defaultValue={data?.company_email ?? ""} required />
          <Input name="company_phone" placeholder="Company Phone" defaultValue={data?.company_phone ?? ""} required />
          <Input name="company_address" placeholder="Company Address" defaultValue={data?.company_address ?? ""} required />
          <Input name="facebook" placeholder="Facebook URL" defaultValue={String((data?.social_links as Record<string, string> | undefined)?.facebook ?? "")} />
          <Input name="linkedin" placeholder="LinkedIn URL" defaultValue={String((data?.social_links as Record<string, string> | undefined)?.linkedin ?? "")} />
          <Input name="instagram" placeholder="Instagram URL" defaultValue={String((data?.social_links as Record<string, string> | undefined)?.instagram ?? "")} />
          <Input name="logo_url" placeholder="Logo URL" defaultValue={data?.logo_url ?? ""} />
          <Input name="favicon_url" placeholder="Favicon URL" defaultValue={data?.favicon_url ?? ""} />
          <div className="md:col-span-2"><Button>Save Settings</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
