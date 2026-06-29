import Link from "next/link";
import { loginAction } from "@/features/auth/actions";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <AuthShell title="Admin Login">
      <form action={loginAction} className="space-y-4">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Button className="w-full">Login</Button>
      </form>
      <div className="mt-4 flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="text-zinc-600 hover:text-zinc-900">Forgot password?</Link>
        <Link href="/register" className="text-zinc-600 hover:text-zinc-900">Register</Link>
      </div>
    </AuthShell>
  );
}
