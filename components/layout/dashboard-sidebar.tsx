import Link from "next/link";

const items = [
  ["Dashboard", "/dashboard"],
  ["Quotations", "/dashboard/quotations"],
  ["Messages", "/dashboard/messages"],
  ["Services", "/dashboard/services"],
  ["Testimonials", "/dashboard/testimonials"],
  ["FAQ", "/dashboard/faqs"],
  ["Analytics", "/dashboard/analytics"],
  ["Users", "/dashboard/users"],
  ["Activity Logs", "/dashboard/activity-logs"],
  ["Settings", "/dashboard/settings"]
] as const;

export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r border-zinc-200 bg-white p-6">
      <p className="text-xl font-bold">Yolic Admin</p>
      <nav className="mt-6 space-y-2">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
