import crypto from "crypto";
import { env } from "@/lib/env";

export function generateCsrfToken() {
  return crypto.createHmac("sha256", env.CSRF_SECRET).update(String(Date.now())).digest("hex");
}

export function verifyCsrfToken(token: string | null, expected: string | null) {
  if (!token || !expected) return false;
  return token === expected;
}
