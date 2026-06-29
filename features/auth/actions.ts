"use server";

import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase-server";
import { logActivity } from "@/features/activity/logger";

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClientServer();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/login?error=${encodeMessage(error.message)}`);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  await logActivity({
    userId: user?.id ?? null,
    action: "login",
    entityType: "auth",
    metadata: { email }
  });

  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "");
  const supabase = await createClientServer();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`
    }
  });

  if (error) {
    redirect(`/register?error=${encodeMessage(error.message)}`);
  }

  redirect("/register?success=1");
}

export async function logoutAction() {
  const supabase = await createClientServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  await logActivity({
    userId: user?.id ?? null,
    action: "logout",
    entityType: "auth"
  });

  await supabase.auth.signOut();
  redirect("/login");
}

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const supabase = await createClientServer();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
  });

  if (error) {
    redirect(`/forgot-password?error=${encodeMessage(error.message)}`);
  }

  redirect("/forgot-password?success=1");
}

export async function resetPasswordAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const supabase = await createClientServer();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect(`/reset-password?error=${encodeMessage(error.message)}`);
  }

  redirect("/dashboard");
}
