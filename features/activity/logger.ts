import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Json } from "@/types/database";

interface ActivityInput {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Json;
  ipAddress?: string | null;
}

export async function logActivity(input: ActivityInput) {
  await supabaseAdmin.from("activity_logs").insert({
    user_id: input.userId ?? null,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    metadata: input.metadata ?? {},
    ip_address: input.ipAddress ?? null
  });
}
