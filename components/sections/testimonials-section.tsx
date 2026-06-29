"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Mary A.",
    role: "Operations Lead",
    quote: "Yolic became our all-in-one execution partner. Delivery quality and responsiveness are exceptional."
  },
  {
    name: "James K.",
    role: "Marketing Director",
    quote: "From campaign concepts to print deployment, Yolic handled everything with premium consistency."
  },
  {
    name: "Ruth N.",
    role: "Procurement Manager",
    quote: "Reliable timelines, transparent communication, and excellent production standards every time."
  }
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const active = testimonials[index];

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Client Testimonials</h2>
        <Card className="mt-10">
          <CardContent className="pt-8">
            <p className="text-xl leading-relaxed text-zinc-700">“{active.quote}”</p>
            <p className="mt-6 font-semibold">{active.name}</p>
            <p className="text-sm text-zinc-500">{active.role}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
