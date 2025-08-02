-- Create normalized database schema and insert data from src/lib/data.ts

-- Create ENUM types
CREATE TYPE innovator_status AS ENUM ('student', 'alumni', 'faculty');
CREATE TYPE project_stage AS ENUM ('concept', 'prototype', 'development', 'launched');

-- Create innovators table
CREATE TABLE public.innovators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  status innovator_status NOT NULL,
  department TEXT NOT NULL,
  image TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  stage project_stage NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  date DATE,
  status TEXT,
  full_description TEXT,
  problem_statement TEXT,
  solution TEXT,
  results TEXT,
  impact TEXT,
  future_plans TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stats table
CREATE TABLE public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create junction tables for many-to-many relationships
CREATE TABLE public.innovator_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  innovator_id UUID REFERENCES public.innovators(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.project_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.project_innovators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  innovator_id UUID REFERENCES public.innovators(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(project_id, innovator_id)
);

CREATE TABLE public.project_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.project_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  link_type TEXT NOT NULL, -- 'demo', 'github', 'website'
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.project_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  technology TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.project_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.innovators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.innovator_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_innovators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;

-- Create public read policies (data is publicly accessible)
CREATE POLICY "Public read access for innovators" ON public.innovators FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read access for stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Public read access for innovator_skills" ON public.innovator_skills FOR SELECT USING (true);
CREATE POLICY "Public read access for project_categories" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for project_innovators" ON public.project_innovators FOR SELECT USING (true);
CREATE POLICY "Public read access for project_team" ON public.project_team FOR SELECT USING (true);
CREATE POLICY "Public read access for project_links" ON public.project_links FOR SELECT USING (true);
CREATE POLICY "Public read access for project_technologies" ON public.project_technologies FOR SELECT USING (true);
CREATE POLICY "Public read access for project_updates" ON public.project_updates FOR SELECT USING (true);
CREATE POLICY "Public read access for project_gallery" ON public.project_gallery FOR SELECT USING (true);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_innovators_updated_at BEFORE UPDATE ON public.innovators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON public.stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert innovators data
INSERT INTO public.innovators (name, role, status, department, image, bio) VALUES
('MBONABUCYA Celestin', 'Hub Coordinator (Academic Staff)', 'faculty', 'School of ICT', '/img/Team/cordinator.jpg', 'Hub Coordinator overseeing strategic coordination and partnerships at UR Binary Hub.'),
('NDAYISHIMIYE Habibu', 'Assistant Coordinator (Student)', 'student', 'School of ICT', '/img/Team/habibu.jpg', 'Assistant Coordinator managing day-to-day operations and team coordination at UR Binary Hub.'),
('ISHIMWE KARLISE Lucie', 'Assistant Administrator', 'student', 'School of ICT', '/img/Team/karlise.jpg', 'Assistant Administrator managing hub documentation, logistics, and internal communication.'),
('NIYONGABO Emmanuel', 'Frontend Mentor', 'alumni', 'External Expert', '/img/Team/emmanuel.png', 'Frontend Mentor providing technical guidance and mentorship for frontend development.'),
('SHYIRAMBERE Joseph', 'Backend & DB Mentor', 'alumni', 'External Expert', '/img/Team/joseph.jpg', 'Backend & Database Mentor leading backend architecture and database optimization.'),
('David TUYISHIME', 'Backend Team Leader', 'student', 'School of ICT', '/img/Team/david.jpg', 'Backend Team Leader coordinating backend development activities and mentoring junior developers.'),
('UWIHANGANYE Edison', 'UI/UX & Frontend Team Leader', 'student', 'Computer Science', '/img/Team/edison.jpg', 'UI/UX & Frontend Team Leader coordinating frontend development and design activities.'),
('Eric TUYISHIMIRE', 'UI/UX Designer', 'alumni', 'External Expert', '/img/Team/eric.jpg', 'UI/UX Designer leading design thinking sessions and establishing UI/UX standards.'),
('Derrick IRADUKUNDA', 'Systems Administrator', 'student', 'School of ICT', '/img/Team/derrick.jpg', 'Systems Administrator managing internal infrastructure and deployment environments.'),
('Igor IHIMBAZWE', 'DevOps Advisor', 'student', 'School of ICT', '/img/Team/igor.jpg', 'DevOps Advisor setting up DevOps pipelines and cloud deployment strategies.'),
('Danny HATEGEKIMANA', 'Designer for social, print, and events', 'student', 'School of ICT', '/img/Team/danny.jpg', 'Designer creating promotional materials and maintaining Binary Hub branding.'),
('Marie Claire UWIRINYIYIMANA', 'Health & Sports Coordinator', 'student', 'School of ICT', '/img/Team/claire.jpg', 'Health & Sports Coordinator organizing wellness activities and team-building events.'),
('Denis UWIHIRWE', 'Junior Developer', 'student', 'School of ICT', '/img/Team/denis.jpg', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Jado Fils SEZIKEYE', 'Junior Developer', 'student', 'School of ICT', '/img/Team/jado.png', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Olivier BYIRINGORO', 'Junior Developer', 'student', 'School of ICT', '/img/Team/olvier.jpg', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Poli NDIRAMIYE', 'Junior Developer', 'student', 'School of ICT', '/img/Team/poli.jpg', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Michael MUNEZERO NTAGANIRA', 'Junior Developer', 'student', 'School of ICT', '/img/Team/michel.png', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Clement NSENGIYUMVA', 'Junior Developer', 'student', 'School of ICT', '/img/Team/clement.jpg', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Obed UWIHANGANYE', 'Junior Developer', 'student', 'School of ICT', '/img/Team/obed.jpg', 'Junior Developer learning and contributing to Binary Hub projects.'),
('TUYISHIME KAYITSINGA Hertillan', 'Junior Developer', 'student', 'School of ICT', '/img/Team/hertillan.jpg', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Eric TUYISHIME', 'Junior Developer', 'student', 'School of ICT', '/img/Team/ericc.jpg', 'Junior Developer learning and contributing to Binary Hub projects.'),
('Merci RUYANGA', 'Junior Developer', 'student', 'School of ICT', '/img/Team/merci.jpg', 'Junior Developer learning and contributing to Binary Hub projects.');

-- Insert projects data
INSERT INTO public.projects (title, description, stage, category, image, date, status, full_description, problem_statement, solution) VALUES
('UMUTUNGO Box', 'Asset Management System for public institutions to track assets, value, and depreciation.', 'development', 'Asset Management', '/img/Project/umutungo.png', '2023-03-15', 'Completed', 'Comprehensive asset management solution for public institutions to track assets, value, and depreciation.', 'Public institutions lacked proper asset tracking and management systems.', 'Developed a comprehensive web-based system for asset registration, tracking, and depreciation calculation.'),
('IMOTRAK', 'Fleet Management System for monitoring usage, maintenance, and cost of institutional vehicles.', 'development', 'Fleet Management', '/img/Project/imotrack.png', '2023-06-20', 'development', 'Complete fleet management solution for institutional vehicle monitoring.', 'Institutions had no systematic way to track vehicle usage, maintenance, and costs.', 'Built a comprehensive system for vehicle registration, usage tracking, maintenance scheduling, and cost analysis.'),
('INUMA App', 'Request flow management system for submitting and following up on staff inquiries in institutions.', 'development', 'Request Management', '/img/Project/inuma.png', '2023-09-10', 'In Progress', 'Streamlined request management system for institutional staff inquiries.', 'Staff requests and inquiries were handled manually without proper tracking.', 'Developed a digital workflow system for request submission, tracking, and resolution.'),
('Customer Support System – Rwanda FDA', 'Helps citizens submit and track requests to Rwanda FDA; integrated with email and SMS.', 'launched', 'Customer Support', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3', '2023-11-15', 'Completed', 'Comprehensive customer support platform for Rwanda FDA citizen services.', 'Citizens had difficulty submitting and tracking requests to Rwanda FDA.', 'Built an integrated platform with email and SMS notifications for request management.'),
('Academic Records System', 'Digital system for managing student academic records and transcripts.', 'concept', 'Education', '#', '2024-01-15', 'Planning', 'Digital academic records management system for educational institutions.', 'Academic records were managed manually, leading to inefficiencies and errors.', 'Develop a digital system for secure academic record management and transcript generation.');

-- Insert services data
INSERT INTO public.services (title, description, icon) VALUES
('Talent Access', 'Work with developers, designers, mentors. Involves students, alumni, and professionals.', 'users'),
('Cost Efficiency', 'Reduced development cost. Shared infrastructure and tools.', 'banknote'),
('Mentorship', 'Guidance from professors and experts. Regular reviews and code quality checks.', 'rocket'),
('Workspace & Infrastructure', 'Free access to office, internet, devices, and tools.', 'laptop'),
('Project Management', 'Agile/Scrum or hybrid methods. Includes version control, documentation, planning.', 'award'),
('Institutional Support', 'Linked with the University for credibility and recognition.', 'network'),
('Funding Opportunities', 'Access to seed funding and early grants. Support from partners like Mastercard Foundation, GIZ, ENABEL.', 'award'),
('MVP & Prototyping Speed', 'Rapid prototyping and feedback.', 'rocket'),
('Exposure', 'Access to hackathons, exhibitions, seminars, and conferences.', 'network'),
('Sustainability', 'Co-ownership of IP between UR and developers. Support for business modeling and commercialization.', 'users'),
('Post-Incubation Support', 'Help with launching, marketing, and scaling. Connection to alumni and advisors.', 'rocket');

-- Insert stats data
INSERT INTO public.stats (value, label) VALUES
('5', 'Flagship Solutions'),
('22', 'Total Innovators'),
('5', 'Professionals'),
('8+', 'Industry Partners');

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Create storage policies
CREATE POLICY "Public access to images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Anyone can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Anyone can update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Anyone can delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images');