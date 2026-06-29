import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { COMPANY_EMAIL, WHATSAPP_CONTACTS } from "@/lib/company";

const services = [
  "Yolic Records",
  "Yolic Engineering",
  "Yolic Academy"
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-100">Yolic</h3>
          <p className="mt-3 text-sm text-zinc-400">
            Business solutions partner delivering audio production, engineering support, and practical learning services.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>
              <Link href={`mailto:${COMPANY_EMAIL}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="size-4" />
                <span>{COMPANY_EMAIL}</span>
              </Link>
            </li>
            {WHATSAPP_CONTACTS.map((contact) => (
              <li key={contact.value}>
                <Link
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                  aria-label={`Chat on WhatsApp: ${contact.label}`}
                >
                  <MessageCircle className="size-4 text-green-500" />
                  <span>{contact.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="container py-5 text-sm text-zinc-500">© {new Date().getFullYear()} Yolic. All rights reserved.</div>
      </div>
    </footer>
  );
}
