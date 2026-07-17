import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section-gradient py-20 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Who We Are</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">About Yolic</h1>
            <p className="mt-5 text-lg text-zinc-700">
              Yolic helps organizations execute growth through integrated branding, production, marketing, and technology delivery.
              We combine strategy, design, and implementation in one team so clients move faster with consistent quality.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-zinc-900">1200+</p>
                <p className="text-xs text-zinc-500">Projects</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-zinc-900">98%</p>
                <p className="text-xs text-zinc-500">Satisfaction</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-zinc-900">3</p>
                <p className="text-xs text-zinc-500">Core Services</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-xl">
              <Image
                src="/images/logo/logo.png"
                alt="Yolic team cover"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="absolute -bottom-5 -left-4 hidden w-40 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg sm:block md:w-48">
              <div className="relative aspect-square">
                <Image
                  src="/images/printing/branded/brand.JPG"
                  alt="Branded production example"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>

            <div className="absolute -right-4 top-5 hidden w-40 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg sm:block md:w-48">
              <div className="relative aspect-square">
                <Image
                  src="/images/printing/3d-lights/3d-4.jpg"
                  alt="3D signage sample"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Our Mission</h2>
            <p className="mt-2 text-sm text-zinc-600">Deliver practical, creative, and reliable business solutions that improve visibility, operations, and growth.</p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Our Approach</h2>
            <p className="mt-2 text-sm text-zinc-600">We plan deeply, execute fast, and maintain quality across every touchpoint from idea to final delivery.</p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Our Promise</h2>
            <p className="mt-2 text-sm text-zinc-600">Clear communication, dependable timelines, and outcomes that support your brand and business goals.</p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
