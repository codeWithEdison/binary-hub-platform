export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image: string | null
          importance: string | null
          publish_date: string | null
          published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          importance?: string | null
          publish_date?: string | null
          published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          importance?: string | null
          publish_date?: string | null
          published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "innovators"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          category: string | null
          content: string | null
          created_at: string | null
          date: string
          description: string
          id: string
          image: string | null
          location: string | null
          max_attendees: number | null
          published: boolean | null
          registration_deadline: string | null
          time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date: string
          description: string
          id?: string
          image?: string | null
          location?: string | null
          max_attendees?: number | null
          published?: boolean | null
          registration_deadline?: string | null
          time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          image?: string | null
          location?: string | null
          max_attendees?: number | null
          published?: boolean | null
          registration_deadline?: string | null
          time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      innovator_skills: {
        Row: {
          created_at: string | null
          id: string
          innovator_id: string | null
          skill: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          innovator_id?: string | null
          skill: string
        }
        Update: {
          created_at?: string | null
          id?: string
          innovator_id?: string | null
          skill?: string
        }
        Relationships: [
          {
            foreignKeyName: "innovator_skills_innovator_id_fkey"
            columns: ["innovator_id"]
            isOneToOne: false
            referencedRelation: "innovators"
            referencedColumns: ["id"]
          },
        ]
      }
      innovators: {
        Row: {
          bio: string | null
          created_at: string | null
          department: string
          featured: boolean
          id: string
          image: string | null
          name: string
          role: string
          status: Database["public"]["Enums"]["innovator_status"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          department: string
          featured?: boolean
          id?: string
          image?: string | null
          name: string
          role: string
          status: Database["public"]["Enums"]["innovator_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          department?: string
          featured?: boolean
          id?: string
          image?: string | null
          name?: string
          role?: string
          status?: Database["public"]["Enums"]["innovator_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      project_categories: {
        Row: {
          category: string
          created_at: string | null
          id: string
          project_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          project_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_categories_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_gallery: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          project_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          project_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_gallery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_innovators: {
        Row: {
          created_at: string | null
          id: string
          innovator_id: string | null
          project_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          innovator_id?: string | null
          project_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          innovator_id?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_innovators_innovator_id_fkey"
            columns: ["innovator_id"]
            isOneToOne: false
            referencedRelation: "innovators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_innovators_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_links: {
        Row: {
          created_at: string | null
          id: string
          link_type: string
          project_id: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link_type: string
          project_id?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link_type?: string
          project_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_links_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_team: {
        Row: {
          created_at: string | null
          id: string
          image: string | null
          name: string
          project_id: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image?: string | null
          name: string
          project_id?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string
          project_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_technologies: {
        Row: {
          created_at: string | null
          id: string
          project_id: string | null
          technology: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          technology: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          technology?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_updates: {
        Row: {
          content: string
          created_at: string | null
          date: string
          id: string
          project_id: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          date: string
          id?: string
          project_id?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          date?: string
          id?: string
          project_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          created_at: string | null
          date: string | null
          description: string
          featured: boolean
          full_description: string | null
          future_plans: string | null
          id: string
          image: string | null
          impact: string | null
          problem_statement: string | null
          results: string | null
          solution: string | null
          stage: Database["public"]["Enums"]["project_stage"]
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          date?: string | null
          description: string
          featured?: boolean
          full_description?: string | null
          future_plans?: string | null
          id?: string
          image?: string | null
          impact?: string | null
          problem_statement?: string | null
          results?: string | null
          solution?: string | null
          stage: Database["public"]["Enums"]["project_stage"]
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          date?: string | null
          description?: string
          featured?: boolean
          full_description?: string | null
          future_plans?: string | null
          id?: string
          image?: string | null
          impact?: string | null
          problem_statement?: string | null
          results?: string | null
          solution?: string | null
          stage?: Database["public"]["Enums"]["project_stage"]
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      stakeholders: {
        Row: {
          category: string
          contact_email: string | null
          contact_phone: string | null
          contribution: string | null
          created_at: string
          id: string
          logo: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          category: string
          contact_email?: string | null
          contact_phone?: string | null
          contribution?: string | null
          created_at?: string
          id?: string
          logo?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          category?: string
          contact_email?: string | null
          contact_phone?: string | null
          contribution?: string | null
          created_at?: string
          id?: string
          logo?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string | null
          id: string
          label: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_innovator_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          role: string
          status: Database["public"]["Enums"]["innovator_status"]
          department: string
          image: string
          bio: string
          created_at: string
          updated_at: string
        }[]
      }
      get_my_projects: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          title: string
          description: string
          stage: Database["public"]["Enums"]["project_stage"]
          category: string
          image: string
          date: string
          status: string
          full_description: string
          problem_statement: string
          solution: string
          results: string
          impact: string
          future_plans: string
          created_at: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      innovator_status:
        | "student"
        | "alumni"
        | "faculty"
        | "innovator"
        | "mentor"
      project_stage: "concept" | "prototype" | "development" | "launched"
      user_role: "admin" | "innovator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      innovator_status: ["student", "alumni", "faculty", "innovator", "mentor"],
      project_stage: ["concept", "prototype", "development", "launched"],
      user_role: ["admin", "innovator"],
    },
  },
} as const
