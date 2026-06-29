"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What services does Yolic provide?",
    a: "We provide Yolic Records, Yolic Engineering, and Yolic Academy services, including voice over recording, adverts, music recording, audio engineering, and mastering."
  },
  {
    q: "Can Yolic handle enterprise-scale projects?",
    a: "Yes. Our processes are designed for enterprise delivery with quality controls and dedicated account management."
  },
  {
    q: "How quickly can I receive a quotation?",
    a: "Most quotation requests are reviewed and responded to within one business day."
  }
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-zinc-50 py-20">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item, index) => (
            <div key={item.q} className="rounded-2xl border border-zinc-200 bg-white">
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="font-semibold">{item.q}</span>
                <ChevronDown className={cn("size-5 transition", open === index ? "rotate-180" : "rotate-0")} />
              </button>
              {open === index && <p className="px-5 pb-5 text-sm text-zinc-600">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
