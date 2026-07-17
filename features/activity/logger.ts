import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Json, Database } from "@/types/database";

interface ActivityInput {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Json;
  ipAddress?: string | null;
}

export async function logActivity(input: ActivityInput) {
  await supabaseAdmin.from("activity_logs").insert({} as unknown as never[]);
}
