-- Add code_response column to projects table to store generated code
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS code_response TEXT;