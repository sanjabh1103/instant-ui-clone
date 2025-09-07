-- Add confidence_score to projects table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS confidence_score DECIMAL(3,2);