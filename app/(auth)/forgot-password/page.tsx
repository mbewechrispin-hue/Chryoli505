import { forgotPasswordAction } from "@/features/auth/actions";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Forgot Password">
      <form action={forgotPasswordAction} className="space-y-4">
        <Input name="email" type="email" placeholder="Email" required />
        <Button className="w-full">Send reset link</Button>
      </form>
    </AuthShell>
  );
}
