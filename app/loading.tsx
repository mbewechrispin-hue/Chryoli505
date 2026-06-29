export default function Loading() {
  return (
    <main className="p-8">
      <div className="container space-y-4">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-52 w-full animate-pulse rounded-2xl bg-zinc-200" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-24 animate-pulse rounded-xl bg-zinc-200" />
          <div className="h-24 animate-pulse rounded-xl bg-zinc-200" />
          <div className="h-24 animate-pulse rounded-xl bg-zinc-200" />
        </div>
      </div>
    </main>
  );
}
