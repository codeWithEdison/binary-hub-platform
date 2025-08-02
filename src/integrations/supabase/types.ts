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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      asset_disposals: {
        Row: {
          asset_id: string | null
          created_at: string | null
          date_of_disposal: string | null
          id: string
          reason: string | null
          remarks: string | null
        }
        Insert: {
          asset_id?: string | null
          created_at?: string | null
          date_of_disposal?: string | null
          id?: string
          reason?: string | null
          remarks?: string | null
        }
        Update: {
          asset_id?: string | null
          created_at?: string | null
          date_of_disposal?: string | null
          id?: string
          reason?: string | null
          remarks?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_disposals_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_history: {
        Row: {
          action: string
          asset_id: string | null
          changed_by: string | null
          created_at: string | null
          field_name: string | null
          id: string
          new_value: string | null
          old_value: string | null
        }
        Insert: {
          action: string
          asset_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          field_name?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
        }
        Update: {
          action?: string
          asset_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          field_name?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_history_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_issues: {
        Row: {
          asset_id: string | null
          assigned_at: string | null
          assigned_to: string | null
          created_at: string | null
          description: string
          id: string
          priority: Database["public"]["Enums"]["issue_priority"] | null
          reported_by: string | null
          reported_to: string | null
          resolution_notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["issue_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          asset_id?: string | null
          assigned_at?: string | null
          assigned_to?: string | null
          created_at?: string | null
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["issue_priority"] | null
          reported_by?: string | null
          reported_to?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["issue_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          asset_id?: string | null
          assigned_at?: string | null
          assigned_to?: string | null
          created_at?: string | null
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["issue_priority"] | null
          reported_by?: string | null
          reported_to?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["issue_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_issues_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_issues_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_issues_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_issues_reported_to_fkey"
            columns: ["reported_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_requests: {
        Row: {
          approval_notes: string | null
          approved_by: string | null
          created_at: string | null
          id: string
          requested_by: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
        }
        Insert: {
          approval_notes?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          requested_by?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
        }
        Update: {
          approval_notes?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          requested_by?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_specification_values: {
        Row: {
          asset_id: string | null
          created_at: string | null
          id: string
          specification_id: string
          specification_type: string
          specification_value: string | null
        }
        Insert: {
          asset_id?: string | null
          created_at?: string | null
          id?: string
          specification_id: string
          specification_type: string
          specification_value?: string | null
        }
        Update: {
          asset_id?: string | null
          created_at?: string | null
          id?: string
          specification_id?: string
          specification_type?: string
          specification_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_specification_values_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_transfers: {
        Row: {
          approved_by: string | null
          asset_id: string | null
          created_at: string | null
          from_custodian_id: string | null
          from_room_id: string | null
          id: string
          notes: string | null
          requested_by: string | null
          status: Database["public"]["Enums"]["transfer_status"] | null
          to_custodian_id: string | null
          to_department_id: string | null
          to_organization_id: string | null
          to_room_id: string | null
          transfer_date: string | null
          transfer_reason: string | null
          transfer_type:
            | Database["public"]["Enums"]["transfer_type_enum"]
            | null
          updated_at: string | null
        }
        Insert: {
          approved_by?: string | null
          asset_id?: string | null
          created_at?: string | null
          from_custodian_id?: string | null
          from_room_id?: string | null
          id?: string
          notes?: string | null
          requested_by?: string | null
          status?: Database["public"]["Enums"]["transfer_status"] | null
          to_custodian_id?: string | null
          to_department_id?: string | null
          to_organization_id?: string | null
          to_room_id?: string | null
          transfer_date?: string | null
          transfer_reason?: string | null
          transfer_type?:
            | Database["public"]["Enums"]["transfer_type_enum"]
            | null
          updated_at?: string | null
        }
        Update: {
          approved_by?: string | null
          asset_id?: string | null
          created_at?: string | null
          from_custodian_id?: string | null
          from_room_id?: string | null
          id?: string
          notes?: string | null
          requested_by?: string | null
          status?: Database["public"]["Enums"]["transfer_status"] | null
          to_custodian_id?: string | null
          to_department_id?: string | null
          to_organization_id?: string | null
          to_room_id?: string | null
          transfer_date?: string | null
          transfer_reason?: string | null
          transfer_type?:
            | Database["public"]["Enums"]["transfer_type_enum"]
            | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_transfers_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_from_custodian_id_fkey"
            columns: ["from_custodian_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_from_room_id_fkey"
            columns: ["from_room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_to_custodian_id_fkey"
            columns: ["to_custodian_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_to_department_id_fkey"
            columns: ["to_department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_to_organization_id_fkey"
            columns: ["to_organization_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_to_room_id_fkey"
            columns: ["to_room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_validation_queue: {
        Row: {
          asset_data: Json
          created_at: string | null
          draft_owner_id: string | null
          id: string
          row_number: number
          updated_at: string | null
          upload_batch_id: string
          validated_at: string | null
          validated_by: string | null
          validation_errors: Json | null
          validation_status:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Insert: {
          asset_data: Json
          created_at?: string | null
          draft_owner_id?: string | null
          id?: string
          row_number: number
          updated_at?: string | null
          upload_batch_id: string
          validated_at?: string | null
          validated_by?: string | null
          validation_errors?: Json | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Update: {
          asset_data?: Json
          created_at?: string | null
          draft_owner_id?: string | null
          id?: string
          row_number?: number
          updated_at?: string | null
          upload_batch_id?: string
          validated_at?: string | null
          validated_by?: string | null
          validation_errors?: Json | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_validation_queue_draft_owner_id_fkey"
            columns: ["draft_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_validation_queue_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_valuations: {
        Row: {
          accumulated_depreciation_value: number | null
          acquisition_price: number | null
          actual_depreciated_amount: number | null
          actual_depreciation_rate: number | null
          annual_depreciation_rate: number | null
          asset_id: string | null
          created_at: string | null
          id: string
          net_book_value: number | null
          net_current_value: number | null
          remarks: string | null
          replacement_cost: number | null
          valuation_date: string | null
        }
        Insert: {
          accumulated_depreciation_value?: number | null
          acquisition_price?: number | null
          actual_depreciated_amount?: number | null
          actual_depreciation_rate?: number | null
          annual_depreciation_rate?: number | null
          asset_id?: string | null
          created_at?: string | null
          id?: string
          net_book_value?: number | null
          net_current_value?: number | null
          remarks?: string | null
          replacement_cost?: number | null
          valuation_date?: string | null
        }
        Update: {
          accumulated_depreciation_value?: number | null
          acquisition_price?: number | null
          actual_depreciated_amount?: number | null
          actual_depreciation_rate?: number | null
          annual_depreciation_rate?: number | null
          asset_id?: string | null
          created_at?: string | null
          id?: string
          net_book_value?: number | null
          net_current_value?: number | null
          remarks?: string | null
          replacement_cost?: number | null
          valuation_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_valuations_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          asset_tag: string
          condition: Database["public"]["Enums"]["asset_condition"] | null
          created_at: string | null
          created_by: string | null
          current_value: number | null
          custodian_id: string | null
          description: string | null
          funding_source_id: string | null
          id: string
          image_url: string | null
          institution_id: string | null
          name: string
          purchase_date: string | null
          purchase_price: number | null
          room_id: string | null
          status: Database["public"]["Enums"]["asset_status"] | null
          status_flag: string | null
          subcategory_id: string | null
          supplier: string | null
          updated_at: string | null
          useful_life_years: number | null
          warranty_expiry: string | null
        }
        Insert: {
          asset_tag: string
          condition?: Database["public"]["Enums"]["asset_condition"] | null
          created_at?: string | null
          created_by?: string | null
          current_value?: number | null
          custodian_id?: string | null
          description?: string | null
          funding_source_id?: string | null
          id?: string
          image_url?: string | null
          institution_id?: string | null
          name: string
          purchase_date?: string | null
          purchase_price?: number | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          status_flag?: string | null
          subcategory_id?: string | null
          supplier?: string | null
          updated_at?: string | null
          useful_life_years?: number | null
          warranty_expiry?: string | null
        }
        Update: {
          asset_tag?: string
          condition?: Database["public"]["Enums"]["asset_condition"] | null
          created_at?: string | null
          created_by?: string | null
          current_value?: number | null
          custodian_id?: string | null
          description?: string | null
          funding_source_id?: string | null
          id?: string
          image_url?: string | null
          institution_id?: string | null
          name?: string
          purchase_date?: string | null
          purchase_price?: number | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          status_flag?: string | null
          subcategory_id?: string | null
          supplier?: string | null
          updated_at?: string | null
          useful_life_years?: number | null
          warranty_expiry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_custodian_id_fkey"
            columns: ["custodian_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_funding_source_id_fkey"
            columns: ["funding_source_id"]
            isOneToOne: false
            referencedRelation: "funding_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      buildings: {
        Row: {
          address: string | null
          building_code: string | null
          created_at: string | null
          description: string | null
          id: string
          institution_id: string | null
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          building_code?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id?: string | null
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          building_code?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id?: string | null
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buildings_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          institution_id: string | null
          name: string
          parent_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id?: string | null
          name: string
          parent_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id?: string | null
          name?: string
          parent_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "departments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      funding_sources: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      global_specifications: {
        Row: {
          allowed_values: Json | null
          created_at: string | null
          data_type: string
          description: string | null
          id: string
          is_required: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          allowed_values?: Json | null
          created_at?: string | null
          data_type: string
          description?: string | null
          id?: string
          is_required?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          allowed_values?: Json | null
          created_at?: string | null
          data_type?: string
          description?: string | null
          id?: string
          is_required?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      institutions: {
        Row: {
          address: string | null
          code: string
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          parent_id: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          code: string
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          parent_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          code?: string
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          parent_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "institutions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_schedules: {
        Row: {
          actual_cost: number | null
          asset_id: string | null
          assigned_to: string | null
          completed_at: string | null
          completed_by: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          issue_id: string | null
          maintenance_type: string | null
          notes: string | null
          scheduled_date: string
          status: Database["public"]["Enums"]["maintenance_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          asset_id?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          issue_id?: string | null
          maintenance_type?: string | null
          notes?: string | null
          scheduled_date: string
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          asset_id?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          issue_id?: string | null
          maintenance_type?: string | null
          notes?: string | null
          scheduled_date?: string
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_schedules_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_schedules_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_schedules_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_schedules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_schedules_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "asset_issues"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read_status: boolean | null
          related_entity_id: string | null
          related_entity_type: string | null
          status: string | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read_status?: boolean | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read_status?: boolean | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      positions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          custom_permissions: Json | null
          department_id: string | null
          email: string
          full_name: string
          id: string
          institution_id: string | null
          phone: string | null
          position_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          custom_permissions?: Json | null
          department_id?: string | null
          email: string
          full_name: string
          id: string
          institution_id?: string | null
          phone?: string | null
          position_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          custom_permissions?: Json | null
          department_id?: string | null
          email?: string
          full_name?: string
          id?: string
          institution_id?: string | null
          phone?: string | null
          position_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      requested_item_specification_values: {
        Row: {
          created_at: string | null
          id: string
          requested_item_id: string | null
          requested_value: string | null
          specification_id: string
          specification_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          requested_item_id?: string | null
          requested_value?: string | null
          specification_id: string
          specification_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          requested_item_id?: string | null
          requested_value?: string | null
          specification_id?: string
          specification_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "requested_item_specification_values_requested_item_id_fkey"
            columns: ["requested_item_id"]
            isOneToOne: false
            referencedRelation: "requested_items"
            referencedColumns: ["id"]
          },
        ]
      }
      requested_items: {
        Row: {
          approved_at: string | null
          approved_quantity: number | null
          created_at: string | null
          description: string
          id: string
          request_id: string | null
          requested_quantity: number
          reviewed_at: string | null
          reviewed_quantity: number | null
          subcategory_id: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_quantity?: number | null
          created_at?: string | null
          description: string
          id?: string
          request_id?: string | null
          requested_quantity?: number
          reviewed_at?: string | null
          reviewed_quantity?: number | null
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_quantity?: number | null
          created_at?: string | null
          description?: string
          id?: string
          request_id?: string | null
          requested_quantity?: number
          reviewed_at?: string | null
          reviewed_quantity?: number | null
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requested_items_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "asset_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requested_items_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          permissions: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rooms: {
        Row: {
          building_id: string | null
          capacity: number | null
          created_at: string | null
          description: string | null
          id: string
          level_code: string | null
          name: string
          room_code: string | null
          room_height: number | null
          room_length: number | null
          room_type: Database["public"]["Enums"]["room_type"] | null
          room_width: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          building_id?: string | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          level_code?: string | null
          name: string
          room_code?: string | null
          room_height?: number | null
          room_length?: number | null
          room_type?: Database["public"]["Enums"]["room_type"] | null
          room_width?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          building_id?: string | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          level_code?: string | null
          name?: string
          room_code?: string | null
          room_height?: number | null
          room_length?: number | null
          room_type?: Database["public"]["Enums"]["room_type"] | null
          room_width?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_sessions: {
        Row: {
          id: string
          scanned_code: string | null
          session_code: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          scanned_code?: string | null
          session_code: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          scanned_code?: string | null
          session_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategory_specifications: {
        Row: {
          allowed_values: Json | null
          created_at: string | null
          data_type: string
          description: string | null
          id: string
          is_required: boolean | null
          name: string
          subcategory_id: string | null
          updated_at: string | null
        }
        Insert: {
          allowed_values?: Json | null
          created_at?: string | null
          data_type: string
          description?: string | null
          id?: string
          is_required?: boolean | null
          name: string
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Update: {
          allowed_values?: Json | null
          created_at?: string | null
          data_type?: string
          description?: string | null
          id?: string
          is_required?: boolean | null
          name?: string
          subcategory_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategory_specifications_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role_id: string
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role_id: string
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { _user_id: string; _role: string }
        Returns: boolean
      }
      insert_asset_with_specifications: {
        Args: { asset_data: Json; specifications: Json[] }
        Returns: {
          asset_id: string
          asset_tag: string
          name: string
          created_at: string
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin_or_asset_manager: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      asset_condition: "Good" | "Fair" | "Poor" | "Unusable"
      asset_status: "active" | "disposed"
      issue_priority: "low" | "medium" | "high" | "critical"
      issue_status:
        | "open"
        | "in_progress"
        | "resolved"
        | "closed"
        | "awaiting_maintenance"
      maintenance_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
      request_status: "pending" | "approved" | "rejected" | "fulfilled"
      room_type:
        | "classroom"
        | "stock"
        | "office"
        | "lab"
        | "meeting_room"
        | "library"
        | "auditorium"
        | "workshop"
        | "storage"
        | "other"
      transfer_status:
        | "pending"
        | "approved"
        | "in_transit"
        | "completed"
        | "cancelled"
      transfer_type_enum: "staff" | "department" | "institution"
      validation_status: "pending" | "valid" | "invalid" | "needs_review"
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
      asset_condition: ["Good", "Fair", "Poor", "Unusable"],
      asset_status: ["active", "disposed"],
      issue_priority: ["low", "medium", "high", "critical"],
      issue_status: [
        "open",
        "in_progress",
        "resolved",
        "closed",
        "awaiting_maintenance",
      ],
      maintenance_status: [
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
      ],
      request_status: ["pending", "approved", "rejected", "fulfilled"],
      room_type: [
        "classroom",
        "stock",
        "office",
        "lab",
        "meeting_room",
        "library",
        "auditorium",
        "workshop",
        "storage",
        "other",
      ],
      transfer_status: [
        "pending",
        "approved",
        "in_transit",
        "completed",
        "cancelled",
      ],
      transfer_type_enum: ["staff", "department", "institution"],
      validation_status: ["pending", "valid", "invalid", "needs_review"],
    },
  },
} as const
