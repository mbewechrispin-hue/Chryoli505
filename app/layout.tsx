import type { Metadata } from "next";
import Script from "next/script";
import { COMPANY_EMAIL, PRIMARY_PHONE } from "@/lib/company";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo/logo.png",
    shortcut: "/images/logo/logo.png",
    apple: "/images/logo/logo.png"
  },
  title: {
    default: "Yolic | Professional Business Solutions",
    template: "%s | Yolic"
  },
  description:
    "Yolic delivers Yolic Records, Yolic Engineering, and Yolic Academy services for businesses, institutions, and communities.",
  openGraph: {
    title: "Yolic | Professional Business Solutions",
    description:
      "One partner for audio production, engineering support, and practical learning services.",
    url: "https://yolic.com",
    siteName: "Yolic",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Yolic | Professional Business Solutions",
    description:
      "One partner for audio production, engineering support, and practical learning services."
  },
  metadataBase: new URL("https://yolic.com")
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yolic",
  url: "https://yolic.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: COMPANY_EMAIL,
    telephone: PRIMARY_PHONE
  },
  sameAs: ["https://www.facebook.com", "https://www.linkedin.com"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white">
        {children}
        <Script id="organization-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
