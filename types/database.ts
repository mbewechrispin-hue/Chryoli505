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
          phone_number: string | null;
          service_type: string;
          budget_range: string | null;
          project_description: string | null;
          status: "new" | "pending" | "contacted" | "completed" | "rejected";
          created_at: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          full_name?: string;
          company_name?: string;
          phone_number?: string | null;
          email?: string;
          service_type?: string;
          budget_range?: string | null;
          project_description?: string | null;
          status?: "new" | "pending" | "contacted" | "completed" | "rejected";
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone_number?: string | null;
          company_name?: string;
          email?: string;
          service_type?: string;
          budget_range?: string | null;
          project_description?: string | null;
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
      analytics: {
        Row: {
          date_key: string;
          visitors: number;
          page_views: number;
          sessions: number;
          quote_requests: number;
          devices: Json;
          browsers: Json;
          traffic_sources: Json;
          countries: Json;
          [key: string]: unknown;
        };
        Insert: {
          date_key: string;
          visitors: number;
          page_views: number;
          sessions: number;
          quote_requests?: number;
          devices?: Json;
          browsers?: Json;
          traffic_sources?: Json;
          countries?: Json;
          [key: string]: unknown;
        };
        Update: {
          date_key?: string;
          visitors?: number;
          page_views?: number;
          sessions?: number;
          quote_requests?: number;
          devices?: Json;
          browsers?: Json;
          traffic_sources?: Json;
          countries?: Json;
          [key: string]: unknown;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          ip_address: string | null;
          created_at: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          ip_address?: string | null;
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          ip_address?: string | null;
          created_at?: string;
          [key: string]: unknown;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          created_at: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          created_at?: string;
          [key: string]: unknown;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          image_url: string | null;
          created_at: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon?: string;
          image_url?: string | null;
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon?: string;
          image_url?: string | null;
          created_at?: string;
          [key: string]: unknown;
        };
      };
      settings: {
        Row: {
          id: string;
          company_name: string;
          company_email: string;
          company_phone: string;
          company_address: string;
          logo_url: string | null;
          favicon_url: string | null;
          social_links: Json;
          created_at: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          company_name?: string;
          company_email?: string;
          company_phone?: string;
          company_address?: string;
          logo_url?: string | null;
          favicon_url?: string | null;
          social_links?: Json;
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          company_name?: string;
          company_email?: string;
          company_phone?: string;
          company_address?: string;
          logo_url?: string | null;
          favicon_url?: string | null;
          social_links?: Json;
          created_at?: string;
          [key: string]: unknown;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          position?: string;
          company?: string;
          photo_url?: string | null;
          review: string;
          created_at?: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          name: string;
          position?: string;
          company?: string;
          photo_url?: string | null;
          review: string;
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          name?: string;
          position?: string;
          company?: string;
          photo_url?: string | null;
          review?: string;
          created_at?: string;
          [key: string]: unknown;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: string;
          is_active: boolean;
          created_at: string;
          [key: string]: unknown;
        };
        Insert: {
          id?: string;
          email: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          [key: string]: unknown;
        };
        Update: {
          id?: string;
          email?: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          [key: string]: unknown;
        };
      };
    };
    Views: Record<string, { Row: Record<string, unknown> }>;
    Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
    Enums: Record<string, string>;
  };
};
