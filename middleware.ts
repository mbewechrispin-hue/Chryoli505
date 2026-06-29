import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

const protectedPaths = ["/dashboard", "/admin", "/settings"];

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  try {
    const { data } = await supabase.auth.getUser();

    if (isProtected && !data.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/settings/:path*"]
};
