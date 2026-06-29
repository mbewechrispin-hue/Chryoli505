import { logoutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <form action={logoutAction}>
        <Button variant="outline" size="sm">Logout</Button>
      </form>
    </header>
  );
}
