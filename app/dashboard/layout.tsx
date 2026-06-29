import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase-server";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClientServer();
  let user = null;

  try {
    const {
      data: { user: authUser }
    } = await supabase.auth.getUser();

    user = authUser;
  } catch {
    redirect("/login");
  }

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
