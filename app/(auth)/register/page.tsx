import Link from "next/link";
import { registerAction } from "@/features/auth/actions";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <AuthShell title="Create Admin Account">
      <form action={registerAction} className="space-y-4">
        <Input name="fullName" placeholder="Full Name" required />
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Button className="w-full">Register</Button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        Already have an account? <Link className="underline" href="/login">Login</Link>
      </p>
    </AuthShell>
  );
}
