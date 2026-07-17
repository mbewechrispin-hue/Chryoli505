import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Database } from "@/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logActivity } from "@/features/activity/logger";

async function createUser(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "editor") as "super_admin" | "admin" | "editor";

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error || !data.user) return;

  await supabaseAdmin.from("profiles").insert({
    id: data.user.id,
    email,
    role,
    is_active: true
  } as unknown as never[]);

  await logActivity({
    action: "user_created",
    entityType: "user",
    entityId: data.user.id,
    metadata: { email, role }
  });

  revalidatePath("/dashboard/users");
}

async function toggleUserStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const active = String(formData.get("active") ?? "true") === "true";
  await supabaseAdmin.from("profiles").update({ is_active: !active } as unknown as never).eq("id", id);
  await logActivity({
    action: !active ? "user_activated" : "user_suspended",
    entityType: "user",
    entityId: id
  });
  revalidatePath("/dashboard/users");
}

async function deleteUser(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  await supabaseAdmin.auth.admin.deleteUser(id);
  await logActivity({ action: "user_deleted", entityType: "user", entityId: id });
  revalidatePath("/dashboard/users");
}

export default async function UsersPage() {
  const { data } = await supabaseAdmin.from("profiles").select("id,email,role,is_active").order("created_at", { ascending: false });
  const rows = (data ?? []) as Database["public"]["Tables"]["profiles"]["Row"][];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Create User</CardTitle></CardHeader>
        <CardContent>
          <form action={createUser} className="space-y-3">
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Temporary Password" required />
            <select name="role" className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm" defaultValue="editor">
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
            <Button>Create User</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {rows.map((user) => (
            <div key={user.id} className="rounded-xl border border-zinc-200 p-3">
              <p className="font-medium">{user.email}</p>
              <p className="text-sm capitalize text-zinc-600">{user.role} • {user.is_active ? "Active" : "Suspended"}</p>
              <div className="mt-2 flex gap-2">
                <form action={toggleUserStatus}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="hidden" name="active" value={String(user.is_active)} />
                  <Button size="sm" variant="outline">{user.is_active ? "Suspend" : "Activate"}</Button>
                </form>
                <form action={deleteUser}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button size="sm" variant="ghost">Delete</Button>
                </form>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
