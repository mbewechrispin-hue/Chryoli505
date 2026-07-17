import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Database } from "@/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logActivity } from "@/features/activity/logger";
import { COMPANY_EMAIL } from "@/lib/company";

async function saveSettings(formData: FormData) {
  "use server";
  const payload: Database["public"]["Tables"]["settings"]["Insert"] = {
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
  const existing = data as Database["public"]["Tables"]["settings"]["Row"] | null;

  if (existing?.id) {
    await supabaseAdmin.from("settings").update(payload as unknown as never).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("settings").insert(payload as unknown as never[]);
  }

  await logActivity({
    action: "settings_updated",
    entityType: "settings",
    entityId: existing?.id ?? null,
    metadata: { company_name: payload.company_name ?? "" }
  });

  revalidatePath("/dashboard/settings");
}

export default async function SettingsPage() {
  const { data } = await supabaseAdmin.from("settings").select("*").limit(1).maybeSingle();
  const settings = data as Database["public"]["Tables"]["settings"]["Row"] | null;

  return (
    <Card>
      <CardHeader><CardTitle>Company Settings</CardTitle></CardHeader>
      <CardContent>
        <form action={saveSettings} className="grid gap-4 md:grid-cols-2">
          <Input name="company_name" placeholder="Company Name" defaultValue={settings?.company_name ?? "Yolic"} required />
          <Input name="company_email" type="email" placeholder="Company Email" defaultValue={settings?.company_email ?? ""} required />
          <Input name="company_phone" placeholder="Company Phone" defaultValue={settings?.company_phone ?? ""} required />
          <Input name="company_address" placeholder="Company Address" defaultValue={settings?.company_address ?? ""} required />
          <Input name="facebook" placeholder="Facebook URL" defaultValue={String((settings?.social_links as Record<string, string> | undefined)?.facebook ?? "")} />
          <Input name="linkedin" placeholder="LinkedIn URL" defaultValue={String((settings?.social_links as Record<string, string> | undefined)?.linkedin ?? "")} />
          <Input name="instagram" placeholder="Instagram URL" defaultValue={String((settings?.social_links as Record<string, string> | undefined)?.instagram ?? "")} />
          <Input name="logo_url" placeholder="Logo URL" defaultValue={settings?.logo_url ?? ""} />
          <Input name="favicon_url" placeholder="Favicon URL" defaultValue={settings?.favicon_url ?? ""} />
          <div className="md:col-span-2"><Button>Save Settings</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
