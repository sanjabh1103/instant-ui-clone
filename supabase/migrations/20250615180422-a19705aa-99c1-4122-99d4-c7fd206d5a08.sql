
-- Step 1: Enable RLS for "projects" table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read or modify only their own projects
CREATE POLICY "Users can view own projects"
    ON public.projects
    FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update own projects"
    ON public.projects
    FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own projects"
    ON public.projects
    FOR DELETE
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert projects for themselves"
    ON public.projects
    FOR INSERT
    WITH CHECK (user_id = auth.uid());
