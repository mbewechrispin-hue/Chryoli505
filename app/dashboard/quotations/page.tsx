import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logActivity } from "@/features/activity/logger";
import type { Database } from "@/types/database";

type QuotationStatus = Database["public"]["Tables"]["quotations"]["Row"]["status"];
const QUOTATION_STATUSES: QuotationStatus[] = ["new", "pending", "contacted", "completed", "rejected"];

async function updateQuotationStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const rawStatus = String(formData.get("status") ?? "pending");
  const status: QuotationStatus = QUOTATION_STATUSES.includes(rawStatus as QuotationStatus)
    ? (rawStatus as QuotationStatus)
    : "pending";
  await supabaseAdmin.from("quotations").update({ status } as unknown as never).eq("id", id);
  await logActivity({
    action: "quote_updated",
    entityType: "quotation",
    entityId: id,
    metadata: { status }
  });
}

async function deleteQuotation(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  await supabaseAdmin.from("quotations").delete().eq("id", id);
  await logActivity({
    action: "quote_deleted",
    entityType: "quotation",
    entityId: id
  });
}

export default async function QuotationsPage({
  searchParams
}: {
  searchParams: Promise<{
    q?: string;
    status?: "new" | "pending" | "contacted" | "completed" | "rejected";
    sort?: "newest" | "oldest";
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = params.status;
  const sort = params.sort ?? "newest";
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseAdmin
    .from("quotations")
    .select("id,full_name,company_name,email,service_type,status,created_at", { count: "exact" });

  if (status) query = query.eq("status", status);
  if (q) query = query.or(`full_name.ilike.%${q}%,company_name.ilike.%${q}%,email.ilike.%${q}%`);

  const { data, count } = await query
    .order("created_at", { ascending: sort === "oldest" })
    .range(from, to);

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / pageSize));

  return (
    <Card>
      <CardHeader><CardTitle>Quotation Management</CardTitle></CardHeader>
      <CardContent>
        <form className="mb-4 grid gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 md:grid-cols-4">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by client/company/email"
            className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
          />
          <select name="status" defaultValue={status ?? ""} className="h-10 rounded-lg border border-zinc-300 px-3 text-sm">
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <select name="sort" defaultValue={sort} className="h-10 rounded-lg border border-zinc-300 px-3 text-sm">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <Button type="submit" variant="outline">Apply</Button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500">
                <th className="py-3">Client</th>
                <th>Company</th>
                <th>Email</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row: {
                id: string;
                full_name: string;
                company_name: string;
                email: string;
                service_type: string;
                status: "new" | "pending" | "contacted" | "completed" | "rejected";
              }) => (
                <tr key={row.id} className="border-b border-zinc-100">
                  <td className="py-3 font-medium">{row.full_name}</td>
                  <td>{row.company_name}</td>
                  <td>{row.email}</td>
                  <td>{row.service_type}</td>
                  <td className="capitalize">{row.status}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`mailto:${row.email}?subject=Regarding your quotation request`}>
                        <Button size="sm" variant="outline">Reply</Button>
                      </Link>
                      <form action={updateQuotationStatus}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="status" value="contacted" />
                        <Button size="sm" variant="outline">Mark Contacted</Button>
                      </form>
                      <form action={updateQuotationStatus}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="status" value="completed" />
                        <Button size="sm" variant="outline">Mark Completed</Button>
                      </form>
                      <form action={deleteQuotation}>
                        <input type="hidden" name="id" value={row.id} />
                        <Button size="sm" variant="ghost">Delete</Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!data || data.length === 0) && <p className="py-6 text-center text-sm text-zinc-500">No quotation records found.</p>}

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Link
                href={`?q=${encodeURIComponent(q)}&status=${status ?? ""}&sort=${sort}&page=${Math.max(1, page - 1)}`}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              >
                Previous
              </Link>
              <Link
                href={`?q=${encodeURIComponent(q)}&status=${status ?? ""}&sort=${sort}&page=${Math.min(totalPages, page + 1)}`}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
