import { NextResponse } from "next/server";

// Minimal middleware shim for Supabase auth used by middleware.ts
// This avoids a hard build failure when the real helper is not present.
// It returns a simple object with a `supabase` stub exposing `auth.getUser()`
// and a `response` which is `NextResponse.next()`.

export function createClient(_request: Request) {
  const response = NextResponse.next();

  const supabase = {
    auth: {
      // Always return no user during build; runtime behavior may differ.
      getUser: async () => ({ data: { user: null } })
    }
  } as const;

  return { supabase, response };
}

export default createClient;
