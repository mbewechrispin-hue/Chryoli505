import { z } from "zod";
import { SERVICE_OPTIONS } from "@/features/services/catalog";

export const quotationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.string().regex(/^[0-9+()\-\s]{7,20}$/, "Valid phone number is required"),
  serviceType: z
    .string()
    .min(2, "Service type is required")
    .refine((value) => SERVICE_OPTIONS.includes(value), "Please select a valid service type"),
  budgetRange: z.string().min(2, "Budget range is required"),
  projectDescription: z.string().min(10, "Project description is too short")
});

export type QuotationInput = z.infer<typeof quotationSchema>;
