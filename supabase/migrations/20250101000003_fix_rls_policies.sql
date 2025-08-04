-- Fix RLS policies for project-related tables

-- Enable RLS on project_categories
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;

-- Create policy for project_categories
CREATE POLICY "Enable all operations for project_categories" 
ON public.project_categories 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Enable RLS on project_technologies
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;

-- Create policy for project_technologies
CREATE POLICY "Enable all operations for project_technologies" 
ON public.project_technologies 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Enable RLS on project_team
ALTER TABLE public.project_team ENABLE ROW LEVEL SECURITY;

-- Create policy for project_team
CREATE POLICY "Enable all operations for project_team" 
ON public.project_team 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Enable RLS on project_links
ALTER TABLE public.project_links ENABLE ROW LEVEL SECURITY;

-- Create policy for project_links
CREATE POLICY "Enable all operations for project_links" 
ON public.project_links 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Enable RLS on project_gallery
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;

-- Create policy for project_gallery
CREATE POLICY "Enable all operations for project_gallery" 
ON public.project_gallery 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Enable RLS on project_innovators
ALTER TABLE public.project_innovators ENABLE ROW LEVEL SECURITY;

-- Create policy for project_innovators
CREATE POLICY "Enable all operations for project_innovators" 
ON public.project_innovators 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Enable RLS on innovator_skills
ALTER TABLE public.innovator_skills ENABLE ROW LEVEL SECURITY;

-- Create policy for innovator_skills
CREATE POLICY "Enable all operations for innovator_skills" 
ON public.innovator_skills 
FOR ALL 
USING (true) 
WITH CHECK (true); 