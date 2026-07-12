export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      quotations: {
        Row: {
          id: string;
          full_name: string;
          company_name: string;
          email: string;
          service_type: string;
          status: "new" | "pending" | "contacted" | "completed" | "rejected";
          created_at: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          full_name?: string;
          company_name?: string;
          email?: string;
          service_type?: string;
          status?: "new" | "pending" | "contacted" | "completed" | "rejected";
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          full_name?: string;
          company_name?: string;
          email?: string;
          service_type?: string;
          status?: "new" | "pending" | "contacted" | "completed" | "rejected";
          created_at?: string;
          [key: string]: unknown;
        };
      };
      activity_logs: {
        Row: {
          user_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          ip_address: string | null;
          [key: string]: unknown;
        };
        Insert: {
          user_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json;
          ip_address?: string | null;
          [key: string]: unknown;
        };
        Update: {
          user_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          metadata?: Json;
          ip_address?: string | null;
          [key: string]: unknown;
        };
      };
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: Record<string, { Row: Record<string, unknown> }>;
    Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
    Enums: Record<string, string>;
  };
};
