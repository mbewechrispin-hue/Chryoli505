import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/csrf";

export async function GET() {
  const token = generateCsrfToken();
  const cookieStore = await cookies();
  cookieStore.set("csrf-token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/"
  });

  return NextResponse.json({ token });
}
