import { MotionReveal } from "@/components/sections/motion-reveal";

export function TrustSection() {
  return (
    <section className="py-16">
      <div className="container">
        <MotionReveal>
          <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">One Partner. Multiple Solutions.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-zinc-600">
              Businesses choose Yolic as a trusted partner for branding, printing, marketing, and technology to simplify execution and improve consistency.
            </p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
