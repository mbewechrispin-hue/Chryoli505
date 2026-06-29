import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).default("dev-service-role-key"),
  RESEND_API_KEY: z.string().min(1).default("dev-resend-api-key"),
  RESEND_FROM_EMAIL: z.string().email().default("noreply@example.com"),
  ADMIN_EMAIL: z.string().email().default("youlicinvestmentltd@gmail.com"),
  GA4_MEASUREMENT_ID: z.string().optional(),
  GA4_API_SECRET: z.string().optional(),
  RATE_LIMIT_MAX: z.coerce.number().default(10),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  CSRF_SECRET: z.string().min(16).default("dev-csrf-secret-change-me-12345")
})
  .superRefine((values, context) => {
    if (!values.NEXT_PUBLIC_SUPABASE_ANON_KEY && !values.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
        message: "Provide NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
      });
    }
  })
  .transform((values) => {
    const resolvedKey = values.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? values.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

    return {
      ...values,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: resolvedKey,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: values.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? resolvedKey
    };
  });

export const env = envSchema.parse(process.env);
