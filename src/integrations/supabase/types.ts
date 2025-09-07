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
      ab_tests: {
        Row: {
          created_at: string
          id: string
          prompt_a: string
          prompt_b: string
          response_a: string | null
          response_b: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          votes_a: number | null
          votes_b: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          prompt_a: string
          prompt_b: string
          response_a?: string | null
          response_b?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          votes_a?: number | null
          votes_b?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          prompt_a?: string
          prompt_b?: string
          response_a?: string | null
          response_b?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          votes_a?: number | null
          votes_b?: number | null
        }
        Relationships: []
      }
      agricultural_profiles: {
        Row: {
          created_at: string | null
          farming_experience: number | null
          farming_method: string | null
          id: string
          irrigation_access: boolean | null
          land_ownership: string | null
          land_size: number | null
          last_season_yield: Json | null
          primary_crops: string[]
          soil_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          farming_experience?: number | null
          farming_method?: string | null
          id?: string
          irrigation_access?: boolean | null
          land_ownership?: string | null
          land_size?: number | null
          last_season_yield?: Json | null
          primary_crops?: string[]
          soil_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          farming_experience?: number | null
          farming_method?: string | null
          id?: string
          irrigation_access?: boolean | null
          land_ownership?: string | null
          land_size?: number | null
          last_season_yield?: Json | null
          primary_crops?: string[]
          soil_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agricultural_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_analysis: {
        Row: {
          analysis_type: string
          anatomical_structures: Json | null
          confidence_score: number | null
          created_at: string
          educational_content: string | null
          id: string
          image_id: string | null
          learning_points: Json | null
          results: Json
        }
        Insert: {
          analysis_type?: string
          anatomical_structures?: Json | null
          confidence_score?: number | null
          created_at?: string
          educational_content?: string | null
          id?: string
          image_id?: string | null
          learning_points?: Json | null
          results?: Json
        }
        Update: {
          analysis_type?: string
          anatomical_structures?: Json | null
          confidence_score?: number | null
          created_at?: string
          educational_content?: string | null
          id?: string
          image_id?: string | null
          learning_points?: Json | null
          results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ai_analysis_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "medical_images"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_reskilling_resources: {
        Row: {
          cost_type: string | null
          created_at: string
          description: string | null
          id: string
          provider: string
          skill_area: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          cost_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          provider: string
          skill_area: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          cost_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          provider?: string
          skill_area?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      ai_task_assessments: {
        Row: {
          category: string
          confidence: number | null
          created_at: string
          explanation: string | null
          id: string
          occupation_code: string
          task_description: string
          updated_at: string
        }
        Insert: {
          category: string
          confidence?: number | null
          created_at?: string
          explanation?: string | null
          id?: string
          occupation_code: string
          task_description: string
          updated_at?: string
        }
        Update: {
          category?: string
          confidence?: number | null
          created_at?: string
          explanation?: string | null
          id?: string
          occupation_code?: string
          task_description?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      assessment_sessions: {
        Row: {
          assistant_id: string
          completed_at: string | null
          correct_answers: number | null
          created_at: string
          current_difficulty: number | null
          final_score: number | null
          id: string
          mastery_level: number | null
          questions_asked: number | null
          recommendations: Json | null
          session_data: Json | null
          session_type: string | null
          started_at: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assistant_id: string
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          current_difficulty?: number | null
          final_score?: number | null
          id?: string
          mastery_level?: number | null
          questions_asked?: number | null
          recommendations?: Json | null
          session_data?: Json | null
          session_type?: string | null
          started_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assistant_id?: string
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          current_difficulty?: number | null
          final_score?: number | null
          id?: string
          mastery_level?: number | null
          questions_asked?: number | null
          recommendations?: Json | null
          session_data?: Json | null
          session_type?: string | null
          started_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          business_name: string
          business_type: string
          categories: string[]
          created_at: string | null
          description: string | null
          employee_count: number | null
          growth_stage: string | null
          id: string
          monthly_revenue: number | null
          start_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_name: string
          business_type: string
          categories?: string[]
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          growth_stage?: string | null
          id?: string
          monthly_revenue?: number | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string
          categories?: string[]
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          growth_stage?: string | null
          id?: string
          monthly_revenue?: number | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          issuing_organization: string
          name: string
          requirements: string | null
          skill_id: string | null
          validity_period_months: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          issuing_organization: string
          name: string
          requirements?: string | null
          skill_id?: string | null
          validity_period_months?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          issuing_organization?: string
          name?: string
          requirements?: string | null
          skill_id?: string | null
          validity_period_months?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "certifications_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          context_modules: string[] | null
          conversation_data: Json | null
          created_at: string | null
          id: string
          last_activity: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          context_modules?: string[] | null
          conversation_data?: Json | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          context_modules?: string[] | null
          conversation_data?: Json | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          image_id: string | null
          is_active: boolean | null
          session_data: Json
          session_title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_id?: string | null
          is_active?: boolean | null
          session_data?: Json
          session_title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_id?: string | null
          is_active?: boolean | null
          session_data?: Json
          session_title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "medical_images"
            referencedColumns: ["id"]
          },
        ]
      }
      climate_risk_assessments: {
        Row: {
          adaptation_strategies: Json
          ai_insights: string | null
          climate_data: Json
          created_at: string | null
          id: string
          location_data: Json
          risk_analysis: Json
          status: string
          updated_at: string | null
          user_id: string
          zip_code: string
        }
        Insert: {
          adaptation_strategies?: Json
          ai_insights?: string | null
          climate_data?: Json
          created_at?: string | null
          id?: string
          location_data?: Json
          risk_analysis?: Json
          status?: string
          updated_at?: string | null
          user_id: string
          zip_code: string
        }
        Update: {
          adaptation_strategies?: Json
          ai_insights?: string | null
          climate_data?: Json
          created_at?: string | null
          id?: string
          location_data?: Json
          risk_analysis?: Json
          status?: string
          updated_at?: string | null
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          id: string
          rating: number | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          rating?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          rating?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      content_validation: {
        Row: {
          content: string
          created_at: string | null
          id: number
          model_name: string
          user_id: string | null
          validation: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          model_name: string
          user_id?: string | null
          validation?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          model_name?: string
          user_id?: string | null
          validation?: Json | null
        }
        Relationships: []
      }
      custom_models: {
        Row: {
          category: string
          complexity_score: number
          created_at: string
          description: string
          example: string
          id: string
          is_public: boolean | null
          name: string
          prompt_template: string
          updated_at: string
          use_cases: string[] | null
          user_id: string
        }
        Insert: {
          category: string
          complexity_score: number
          created_at?: string
          description: string
          example: string
          id?: string
          is_public?: boolean | null
          name: string
          prompt_template: string
          updated_at?: string
          use_cases?: string[] | null
          user_id: string
        }
        Update: {
          category?: string
          complexity_score?: number
          created_at?: string
          description?: string
          example?: string
          id?: string
          is_public?: boolean | null
          name?: string
          prompt_template?: string
          updated_at?: string
          use_cases?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      ecosystem_insights: {
        Row: {
          action_items: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          insight_data: Json
          insight_type: string
          modules_involved: string[]
          priority_level: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          action_items?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_data: Json
          insight_type: string
          modules_involved: string[]
          priority_level?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          action_items?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_data?: Json
          insight_type?: string
          modules_involved?: string[]
          priority_level?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecosystem_insights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      enhanced_solutions: {
        Row: {
          alternative_approaches: string | null
          created_at: string | null
          id: string
          is_ai_enhanced: boolean | null
          model_id: number
          potential_pitfalls: string | null
          problem_id: number
          reasoning_process: string | null
          solution_text: string
          success_metrics: string | null
          user_rating: number | null
        }
        Insert: {
          alternative_approaches?: string | null
          created_at?: string | null
          id?: string
          is_ai_enhanced?: boolean | null
          model_id: number
          potential_pitfalls?: string | null
          problem_id: number
          reasoning_process?: string | null
          solution_text: string
          success_metrics?: string | null
          user_rating?: number | null
        }
        Update: {
          alternative_approaches?: string | null
          created_at?: string | null
          id?: string
          is_ai_enhanced?: boolean | null
          model_id?: number
          potential_pitfalls?: string | null
          problem_id?: number
          reasoning_process?: string | null
          solution_text?: string
          success_metrics?: string | null
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_solutions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enhanced_solutions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enhanced_solutions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_profiles: {
        Row: {
          bank_account_status: string | null
          created_at: string | null
          credit_score: number | null
          debt_amount: number | null
          financial_goals: Json | null
          id: string
          insurance_coverage: string[] | null
          monthly_expenses: number | null
          monthly_income: number | null
          savings_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bank_account_status?: string | null
          created_at?: string | null
          credit_score?: number | null
          debt_amount?: number | null
          financial_goals?: Json | null
          id?: string
          insurance_coverage?: string[] | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          savings_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bank_account_status?: string | null
          created_at?: string | null
          credit_score?: number | null
          debt_amount?: number | null
          financial_goals?: Json | null
          id?: string
          insurance_coverage?: string[] | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          savings_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_analytics: {
        Row: {
          attempts: number | null
          concept: string
          created_at: string
          difficulty_progression: Json | null
          id: string
          last_practiced: string | null
          mastery_score: number | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number | null
          concept: string
          created_at?: string
          difficulty_progression?: Json | null
          id?: string
          last_practiced?: string | null
          mastery_score?: number | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number | null
          concept?: string
          created_at?: string
          difficulty_progression?: Json | null
          id?: string
          last_practiced?: string | null
          mastery_score?: number | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      learning_assessments: {
        Row: {
          assessment_type: string
          completed_at: string | null
          created_at: string
          id: string
          image_id: string | null
          questions: Json
          score: number | null
          time_spent: number | null
          user_answers: Json | null
          user_id: string | null
        }
        Insert: {
          assessment_type?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          image_id?: string | null
          questions?: Json
          score?: number | null
          time_spent?: number | null
          user_answers?: Json | null
          user_id?: string | null
        }
        Update: {
          assessment_type?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          image_id?: string | null
          questions?: Json
          score?: number | null
          time_spent?: number | null
          user_answers?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_assessments_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "medical_images"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_content: {
        Row: {
          content_text: string | null
          content_type: string | null
          content_url: string | null
          created_at: string | null
          id: string
          is_required: boolean | null
          learning_path_id: string
          order_index: number | null
          title: string
        }
        Insert: {
          content_text?: string | null
          content_type?: string | null
          content_url?: string | null
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          learning_path_id: string
          order_index?: number | null
          title: string
        }
        Update: {
          content_text?: string | null
          content_type?: string | null
          content_url?: string | null
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          learning_path_id?: string
          order_index?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_content_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: number | null
          estimated_duration_hours: number | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_hours?: number | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: number | null
          estimated_duration_hours?: number | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      medical_images: {
        Row: {
          body_part: string | null
          created_at: string
          description: string | null
          file_size: number | null
          file_type: string
          file_url: string | null
          id: string
          metadata: Json | null
          modality: string | null
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          body_part?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_type: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          modality?: string | null
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          body_part?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          modality?: string | null
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      mental_models: {
        Row: {
          category: string
          category_rank: number | null
          complexity_score: number | null
          created_at: string | null
          description: string
          examples: Json | null
          id: number
          key_principles: Json | null
          last_used: string | null
          name: string
          overall_rank: number | null
          prompt_template: string
          rating_count: number | null
          related_models: Json | null
          success_rate: number | null
          tags: string[] | null
          updated_at: string | null
          usage_count: number | null
          use_cases: Json | null
        }
        Insert: {
          category: string
          category_rank?: number | null
          complexity_score?: number | null
          created_at?: string | null
          description: string
          examples?: Json | null
          id?: number
          key_principles?: Json | null
          last_used?: string | null
          name: string
          overall_rank?: number | null
          prompt_template: string
          rating_count?: number | null
          related_models?: Json | null
          success_rate?: number | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          use_cases?: Json | null
        }
        Update: {
          category?: string
          category_rank?: number | null
          complexity_score?: number | null
          created_at?: string | null
          description?: string
          examples?: Json | null
          id?: number
          key_principles?: Json | null
          last_used?: string | null
          name?: string
          overall_rank?: number | null
          prompt_template?: string
          rating_count?: number | null
          related_models?: Json | null
          success_rate?: number | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          use_cases?: Json | null
        }
        Relationships: []
      }
      model_recommendations: {
        Row: {
          created_at: string | null
          expected_outcome: string | null
          id: string
          model_id: number
          problem_id: number
          reasoning: string
          recommendation_rank: number
          relevance_score: number
        }
        Insert: {
          created_at?: string | null
          expected_outcome?: string | null
          id?: string
          model_id: number
          problem_id: number
          reasoning: string
          recommendation_rank: number
          relevance_score: number
        }
        Update: {
          created_at?: string | null
          expected_outcome?: string | null
          id?: string
          model_id?: number
          problem_id?: number
          reasoning?: string
          recommendation_rank?: number
          relevance_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "model_recommendations_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_recommendations_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_recommendations_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      model_usage_stats: {
        Row: {
          avg_rating: number | null
          category_rank: number | null
          id: string
          last_used: string | null
          model_id: number
          overall_rank: number | null
          success_rate: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          avg_rating?: number | null
          category_rank?: number | null
          id?: string
          last_used?: string | null
          model_id: number
          overall_rank?: number | null
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          avg_rating?: number | null
          category_rank?: number | null
          id?: string
          last_used?: string | null
          model_id?: number
          overall_rank?: number | null
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "model_usage_stats_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_usage_stats_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      problems: {
        Row: {
          complexity_score: number | null
          created_at: string | null
          domain: string | null
          estimated_impact: string | null
          expertise_level: string | null
          id: number
          problem_statement: string
          problem_type: string | null
          stakeholders: string[] | null
          time_constraint: string | null
          updated_at: string | null
          urgency: string | null
          user_id: string | null
        }
        Insert: {
          complexity_score?: number | null
          created_at?: string | null
          domain?: string | null
          estimated_impact?: string | null
          expertise_level?: string | null
          id?: number
          problem_statement: string
          problem_type?: string | null
          stakeholders?: string[] | null
          time_constraint?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Update: {
          complexity_score?: number | null
          created_at?: string | null
          domain?: string | null
          estimated_impact?: string | null
          expertise_level?: string | null
          id?: number
          problem_statement?: string
          problem_type?: string | null
          stakeholders?: string[] | null
          time_constraint?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          location: Json | null
          phone: string | null
          preferences: Json | null
          updated_at: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          location?: Json | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
          user_id: string
          user_type?: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          location?: Json | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          code_response: string | null
          confidence_score: number | null
          created_at: string
          description: string | null
          files: string[] | null
          id: string
          image_url: string | null
          is_public: boolean
          name: string
          project_id: string
          prompt: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          code_response?: string | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name: string
          project_id: string
          prompt?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          code_response?: string | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name?: string
          project_id?: string
          prompt?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      question_responses: {
        Row: {
          ai_feedback: string | null
          correct_answer: string | null
          created_at: string
          difficulty_level: number | null
          id: string
          is_correct: boolean | null
          question_data: Json
          question_text: string
          session_id: string | null
          time_taken_seconds: number | null
          user_answer: string | null
        }
        Insert: {
          ai_feedback?: string | null
          correct_answer?: string | null
          created_at?: string
          difficulty_level?: number | null
          id?: string
          is_correct?: boolean | null
          question_data?: Json
          question_text: string
          session_id?: string | null
          time_taken_seconds?: number | null
          user_answer?: string | null
        }
        Update: {
          ai_feedback?: string | null
          correct_answer?: string | null
          created_at?: string
          difficulty_level?: number | null
          id?: string
          is_correct?: boolean | null
          question_data?: Json
          question_text?: string
          session_id?: string | null
          time_taken_seconds?: number | null
          user_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendation_feedback: {
        Row: {
          created_at: string | null
          feedback_text: string | null
          id: string
          model_id: number
          problem_id: number
          rating: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          model_id: number
          problem_id: number
          rating: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          model_id?: number
          problem_id?: number
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_feedback_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_model_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_feedback_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "mental_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_feedback_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      renewai_ai_insights: {
        Row: {
          content: string
          created_at: string | null
          expires_at: string | null
          id: string
          insight_type: string
          metadata: Json | null
          priority: string
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_type?: string
          metadata?: Json | null
          priority?: string
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          insight_type?: string
          metadata?: Json | null
          priority?: string
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      renewai_energy_data: {
        Row: {
          battery_level_percent: number
          consumption_kwh: number
          cost_usd: number
          created_at: string | null
          device_metadata: Json | null
          grid_export_kwh: number
          grid_import_kwh: number
          id: string
          solar_production_kwh: number
          timestamp: string | null
          user_id: string
          weather_data: Json | null
        }
        Insert: {
          battery_level_percent?: number
          consumption_kwh?: number
          cost_usd?: number
          created_at?: string | null
          device_metadata?: Json | null
          grid_export_kwh?: number
          grid_import_kwh?: number
          id?: string
          solar_production_kwh?: number
          timestamp?: string | null
          user_id: string
          weather_data?: Json | null
        }
        Update: {
          battery_level_percent?: number
          consumption_kwh?: number
          cost_usd?: number
          created_at?: string | null
          device_metadata?: Json | null
          grid_export_kwh?: number
          grid_import_kwh?: number
          id?: string
          solar_production_kwh?: number
          timestamp?: string | null
          user_id?: string
          weather_data?: Json | null
        }
        Relationships: []
      }
      renewai_notifications: {
        Row: {
          action_url: string | null
          category: string
          created_at: string | null
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          priority: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          category?: string
          created_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          priority?: string
          read_at?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          category?: string
          created_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          priority?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_prompts: {
        Row: {
          complexity: number | null
          created_at: string | null
          id: string
          include_examples: boolean | null
          is_public: boolean | null
          mental_model: string | null
          prompt_text: string
          scenario: string | null
          title: string
          tone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          complexity?: number | null
          created_at?: string | null
          id?: string
          include_examples?: boolean | null
          is_public?: boolean | null
          mental_model?: string | null
          prompt_text: string
          scenario?: string | null
          title: string
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          complexity?: number | null
          created_at?: string | null
          id?: string
          include_examples?: boolean | null
          is_public?: boolean | null
          mental_model?: string | null
          prompt_text?: string
          scenario?: string | null
          title?: string
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      skill_assessment_sessions: {
        Row: {
          answers: Json | null
          assessment_id: string
          completed_at: string | null
          id: string
          score: number | null
          started_at: string | null
          status: string | null
          time_taken_minutes: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          assessment_id: string
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          time_taken_minutes?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          assessment_id?: string
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          time_taken_minutes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessment_sessions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "skill_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessments: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          passing_score: number | null
          questions: Json | null
          skill_id: string
          time_limit_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          passing_score?: number | null
          questions?: Json | null
          skill_id: string
          time_limit_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          passing_score?: number | null
          questions?: Json | null
          skill_id?: string
          time_limit_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessments_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: number | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: number | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: number | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills_profiles: {
        Row: {
          career_goals: string[] | null
          certifications: Json | null
          created_at: string | null
          current_skills: string[] | null
          desired_skills: string[] | null
          education_level: string | null
          id: string
          learning_preferences: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          career_goals?: string[] | null
          certifications?: Json | null
          created_at?: string | null
          current_skills?: string[] | null
          desired_skills?: string[] | null
          education_level?: string | null
          id?: string
          learning_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          career_goals?: string[] | null
          certifications?: Json | null
          created_at?: string | null
          current_skills?: string[] | null
          desired_skills?: string[] | null
          education_level?: string | null
          id?: string
          learning_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      solution_comparisons: {
        Row: {
          compared_models: Json
          comparison_data: Json
          created_at: string | null
          id: string
          problem_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          compared_models?: Json
          comparison_data?: Json
          created_at?: string | null
          id?: string
          problem_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          compared_models?: Json
          comparison_data?: Json
          created_at?: string | null
          id?: string
          problem_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      supply_chain_profiles: {
        Row: {
          created_at: string | null
          customer_base_size: number | null
          id: string
          inventory_categories: string[] | null
          logistics_challenges: string[] | null
          storage_capacity: number | null
          supplier_relationships: Json | null
          transportation_methods: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_base_size?: number | null
          id?: string
          inventory_categories?: string[] | null
          logistics_challenges?: string[] | null
          storage_capacity?: number | null
          supplier_relationships?: Json | null
          transportation_methods?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_base_size?: number | null
          id?: string
          inventory_categories?: string[] | null
          logistics_challenges?: string[] | null
          storage_capacity?: number | null
          supplier_relationships?: Json | null
          transportation_methods?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "unified_users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      unified_users: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          ecosystem_tier: string | null
          email: string
          full_name: string
          id: string
          language_preference: string | null
          location: Json
          phone: string | null
          profile_completion_score: number | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          ecosystem_tier?: string | null
          email: string
          full_name: string
          id?: string
          language_preference?: string | null
          location?: Json
          phone?: string | null
          profile_completion_score?: number | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          ecosystem_tier?: string | null
          email?: string
          full_name?: string
          id?: string
          language_preference?: string | null
          location?: Json
          phone?: string | null
          profile_completion_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_certifications: {
        Row: {
          certificate_url: string | null
          certification_id: string
          created_at: string | null
          earned_date: string
          expiry_date: string | null
          id: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          certification_id: string
          created_at?: string | null
          earned_date: string
          expiry_date?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          certification_id?: string
          created_at?: string | null
          earned_date?: string
          expiry_date?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_engagement_metrics: {
        Row: {
          action_details: Json | null
          action_type: string
          id: string
          metadata: Json | null
          page_url: string | null
          session_id: string | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          id: string
          interaction_data: Json | null
          interaction_type: string | null
          session_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          interaction_data?: Json | null
          interaction_type?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          interaction_data?: Json | null
          interaction_type?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          learning_content_id: string | null
          learning_path_id: string
          progress_percentage: number | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          learning_content_id?: string | null
          learning_path_id: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          learning_content_id?: string | null
          learning_path_id?: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_learning_content_id_fkey"
            columns: ["learning_content_id"]
            isOneToOne: false
            referencedRelation: "learning_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_learning_progress_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          language: string | null
          learning_level: string | null
          notification_settings: Json | null
          specialty_focus: string[] | null
          ui_theme: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          language?: string | null
          learning_level?: string | null
          notification_settings?: Json | null
          specialty_focus?: string[] | null
          ui_theme?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          language?: string | null
          learning_level?: string | null
          notification_settings?: Json | null
          specialty_focus?: string[] | null
          ui_theme?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          id: string
          notification_settings: Json | null
          preferences: Json | null
          privacy_settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_settings?: Json | null
          preferences?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_settings?: Json | null
          preferences?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          created_at: string | null
          id: string
          last_assessed_at: string | null
          proficiency_level: number | null
          skill_id: string
          updated_at: string | null
          user_id: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_assessed_at?: string | null
          proficiency_level?: number | null
          skill_id: string
          updated_at?: string | null
          user_id: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_assessed_at?: string | null
          proficiency_level?: number | null
          skill_id?: string
          updated_at?: string | null
          user_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          created_at: string | null
          events: string[] | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      mental_model_analytics: {
        Row: {
          avg_feedback_rating: number | null
          category: string | null
          category_rank: number | null
          feedback_count: number | null
          id: number | null
          name: string | null
          overall_rank: number | null
          recommendation_count: number | null
          success_rate: number | null
          usage_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_top_models_for_dropdown: {
        Args: { filter_category?: string; model_limit?: number }
        Returns: {
          id: number
          name: string
          category: string
          description: string
          complexity_score: number
          success_rate: number
          usage_count: number
          overall_rank: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
