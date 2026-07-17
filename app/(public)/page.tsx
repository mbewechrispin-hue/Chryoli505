import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyYolicSection } from "@/components/sections/why-yolic-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { QuoteForm } from "@/components/sections/quote-form";
import { ContactForm } from "@/components/sections/contact-form";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <WhyYolicSection />
      <PortfolioSection />
      <IndustriesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <QuoteForm />
      <ContactForm />
      <SiteFooter />
    </main>
  );
}
