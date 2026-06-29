import { Resend } from "resend";
import { COMPANY_EMAIL } from "@/lib/company";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

function emailShell(title: string, body: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px;">
      <div style="background:#F4C400;padding:16px 20px;border-radius:12px 12px 0 0;font-weight:700;">Yolic</div>
      <div style="border:1px solid #E5E7EB;border-top:0;padding:24px;border-radius:0 0 12px 12px;">
        <h2 style="margin-top:0;color:#111827;">${title}</h2>
        <div style="color:#374151;line-height:1.6;">${body}</div>
      </div>
    </div>
  `;
}

export async function sendNewQuoteNotification(adminEmail: string, payload: Record<string, string>) {
  const body = Object.entries(payload)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
    .join("");

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: adminEmail,
    subject: "New quotation request",
    html: emailShell("New quotation request", body)
  });
}

export async function sendQuoteConfirmation(clientEmail: string, fullName: string) {
  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: clientEmail,
    subject: "We received your quotation request",
    html: emailShell("Request received", `<p>Hi ${fullName},</p><p>Thank you for contacting Yolic. Our team will reach out shortly.</p>`)
  });
}

export async function sendContactNotification(payload: Record<string, string>) {
  const body = Object.entries(payload)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
    .join("");

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: COMPANY_EMAIL,
    subject: "New contact message",
    html: emailShell("Contact message", body)
  });
}
