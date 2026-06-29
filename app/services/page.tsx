import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ServicesSection } from "@/components/sections/services-section";

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="py-20">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Our Services</h1>
          <p className="mt-4 max-w-2xl text-zinc-600">Focused service lines from Yolic Records, Yolic Engineering, and Yolic Academy.</p>
        </div>
      </section>
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
