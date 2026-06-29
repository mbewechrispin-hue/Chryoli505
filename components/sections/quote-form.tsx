"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quotationSchema, type QuotationInput } from "@/features/quotation/schema";
import { SERVICE_GROUPS } from "@/features/services/catalog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<QuotationInput>({
    resolver: zodResolver(quotationSchema)
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

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken
      },
      body: JSON.stringify(values)
    });

    if (response.ok) {
      setSuccess(true);
      reset();
      window.location.href = "/success?type=quote";
    }

    setSubmitting(false);
  });

  return (
    <section id="quote" className="py-20">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Request a Quotation</h2>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-2">
          <div>
            <Input placeholder="Full Name" {...register("fullName")} />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
          </div>
          <div>
            <Input placeholder="Company Name" {...register("companyName")} />
            {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName.message}</p>}
          </div>
          <div>
            <Input placeholder="Email Address" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder="Phone Number" {...register("phoneNumber")} />
            {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <select
              defaultValue=""
              {...register("serviceType")}
              className="quote-service-select flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Select Service Type
              </option>
              {SERVICE_GROUPS.map((group) => (
                <optgroup key={group.title} label={group.title}>
                  {group.items.map((item) => {
                    const optionValue = `${group.title} - ${item.name}`;

                    return (
                      <option key={optionValue} value={optionValue}>
                        {item.name}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
            {errors.serviceType && <p className="mt-1 text-xs text-red-600">{errors.serviceType.message}</p>}
          </div>
          <div>
            <Input placeholder="Budget Range" {...register("budgetRange")} />
            {errors.budgetRange && <p className="mt-1 text-xs text-red-600">{errors.budgetRange.message}</p>}
          </div>
          <div className="md:col-span-2">
            <Textarea placeholder="Project Description" {...register("projectDescription")} />
            {errors.projectDescription && <p className="mt-1 text-xs text-red-600">{errors.projectDescription.message}</p>}
          </div>
          <div className="md:col-span-2">
            <Button disabled={submitting} className="w-full">{submitting ? "Submitting..." : "Submit Request"}</Button>
            {success && <p className="mt-2 text-sm text-emerald-600">Request submitted successfully.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
