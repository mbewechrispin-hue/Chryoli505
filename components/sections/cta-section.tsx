import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="rounded-3xl bg-primary px-8 py-14 text-center md:px-14">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Ready To Grow Your Business?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-800">
            Partner with Yolic to scale your brand presence, operations, and market performance.
          </p>
          <Link href="#quote" className="mt-8 inline-block">
            <Button variant="secondary" size="lg">Request A Quote</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
