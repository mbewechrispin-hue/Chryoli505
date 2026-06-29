"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/features/contact/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { COMPANY_EMAIL, WHATSAPP_CONTACTS } from "@/lib/company";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    fetch("/api/csrf")
      .then((response) => response.json())
      .then((data: { token?: string }) => {
        if (data.token) setCsrfToken(data.token);
      })
      .catch(() => null);
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setSuccess(false);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken
      },
      body: JSON.stringify({ ...values, website: "" })
    });

    if (response.ok) {
      setSuccess(true);
      reset();
    }

    setSubmitting(false);
  });

  return (
    <section id="contact" className="py-20">
      <div className="container grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Contact Us</h2>
          <p className="mt-4 text-zinc-600">Discuss your requirements with our team and receive a tailored response.</p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-700">
            {WHATSAPP_CONTACTS.map((contact) => (
              <li key={contact.value}>
                <Link
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2 transition hover:border-green-500 hover:text-green-700"
                  aria-label={`Chat on WhatsApp: ${contact.label}`}
                >
                  <MessageCircle className="size-4 text-green-600" />
                  <span>{contact.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={`mailto:${COMPANY_EMAIL}`} className="inline-flex items-center gap-3 text-zinc-700 hover:text-zinc-950">
                <Mail className="size-4" />
                <span>{COMPANY_EMAIL}</span>
              </Link>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
          <div>
            <Input placeholder="Name" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <Input placeholder="Email" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder="Subject" {...register("subject")} />
            {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
          </div>
          <div>
            <Textarea placeholder="Message" {...register("message")} />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
          </div>
          <Button disabled={submitting}>{submitting ? "Sending..." : "Send Message"}</Button>
          {success && <p className="text-sm text-emerald-600">Your message was sent successfully.</p>}
        </form>
      </div>
    </section>
  );
}
