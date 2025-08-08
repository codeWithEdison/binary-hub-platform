-- Add admin policies for projects table
CREATE POLICY "Admins can manage all projects" 
ON public.projects 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Add delete policy for project owners
CREATE POLICY "Users can delete their own projects" 
ON public.projects 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add admin policies for project related tables
CREATE POLICY "Admins can manage project categories" 
ON public.project_categories 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage project technologies" 
ON public.project_technologies 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage project team" 
ON public.project_team 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage project links" 
ON public.project_links 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage project gallery" 
ON public.project_gallery 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage project innovators" 
ON public.project_innovators 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Add missing policies for announcements and events admin management
CREATE POLICY "Admins can manage announcements" 
ON public.announcements 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage events" 
ON public.events 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));