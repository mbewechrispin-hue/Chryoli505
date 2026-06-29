import { resetPasswordAction } from "@/features/auth/actions";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Reset Password">
      <form action={resetPasswordAction} className="space-y-4">
        <Input name="password" type="password" placeholder="New Password" required />
        <Button className="w-full">Update password</Button>
      </form>
    </AuthShell>
  );
}
