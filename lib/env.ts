import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("https://example.supabase.co"),
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

type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | undefined;

function loadEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);

  if (parsed.success) {
    cachedEnv = parsed.data;
    return cachedEnv;
  }

  // Fall back to safe defaults when env validation fails (avoid throwing at build-time).
  const defaults = {
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "dev-service-role-key",
    RESEND_API_KEY: "dev-resend-api-key",
    RESEND_FROM_EMAIL: "noreply@example.com",
    ADMIN_EMAIL: "youlicinvestmentltd@gmail.com",
    GA4_MEASUREMENT_ID: undefined,
    GA4_API_SECRET: undefined,
    RATE_LIMIT_MAX: 10,
    RATE_LIMIT_WINDOW_MS: 60000,
    CSRF_SECRET: "dev-csrf-secret-change-me-12345"
  } as const;

  const envFromProcess: Partial<Env> & Record<string, string | number | undefined> = {
    ...defaults,
    ...process.env,
    RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX ?? defaults.RATE_LIMIT_MAX),
    RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS ?? defaults.RATE_LIMIT_WINDOW_MS)
  };

  const resolvedKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? undefined;
  envFromProcess.NEXT_PUBLIC_SUPABASE_ANON_KEY = resolvedKey;
  envFromProcess.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? resolvedKey;

  cachedEnv = envFromProcess as Env;
  // Log the validation errors to aid debugging, but don't throw during build.
  // eslint-disable-next-line no-console
  console.warn("lib/env: env validation failed — using safe defaults. Errors:", parsed.error?.format?.());

  return cachedEnv;
}

export const env: Env = new Proxy({} as Env, {
  get(_target, property, receiver) {
    return Reflect.get(loadEnv(), property, receiver);
  },
  has(_target, property) {
    return Reflect.has(loadEnv(), property);
  },
  ownKeys() {
    return Reflect.ownKeys(loadEnv());
  },
  getOwnPropertyDescriptor(_target, property) {
    const descriptor = Object.getOwnPropertyDescriptor(loadEnv(), property);

    if (!descriptor) {
      return undefined;
    }

    return {
      ...descriptor,
      configurable: true
    };
  }
});
