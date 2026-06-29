import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-10 text-center">
        <h1 className="text-3xl font-bold">Thank You</h1>
        <p className="mt-3 text-zinc-600">
          {params.type === "quote"
            ? "Your quotation request has been submitted."
            : "Your request has been received."}
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Back Home</Button>
        </Link>
      </div>
    </main>
  );
}
