import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactForm } from "@/components/sections/contact-form";

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="py-20">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Contact</h1>
        </div>
      </section>
      <ContactForm />
      <SiteFooter />
    </main>
  );
}
