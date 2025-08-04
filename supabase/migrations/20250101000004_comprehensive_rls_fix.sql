-- Comprehensive RLS fix for all project-related tables

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Enable all operations for project_categories" ON public.project_categories;
DROP POLICY IF EXISTS "Enable all operations for project_technologies" ON public.project_technologies;
DROP POLICY IF EXISTS "Enable all operations for project_team" ON public.project_team;
DROP POLICY IF EXISTS "Enable all operations for project_links" ON public.project_links;
DROP POLICY IF EXISTS "Enable all operations for project_gallery" ON public.project_gallery;
DROP POLICY IF EXISTS "Enable all operations for project_innovators" ON public.project_innovators;
DROP POLICY IF EXISTS "Enable all operations for innovator_skills" ON public.innovator_skills;

-- Create comprehensive policies for all project-related tables
CREATE POLICY "project_categories_policy" 
ON public.project_categories 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "project_technologies_policy" 
ON public.project_technologies 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "project_team_policy" 
ON public.project_team 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "project_links_policy" 
ON public.project_links 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "project_gallery_policy" 
ON public.project_gallery 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "project_innovators_policy" 
ON public.project_innovators 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "innovator_skills_policy" 
ON public.innovator_skills 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Also ensure main tables have proper policies
DROP POLICY IF EXISTS "projects_policy" ON public.projects;
CREATE POLICY "projects_policy" 
ON public.projects 
FOR ALL 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "innovators_policy" ON public.innovators;
CREATE POLICY "innovators_policy" 
ON public.innovators 
FOR ALL 
USING (true) 
WITH CHECK (true); 