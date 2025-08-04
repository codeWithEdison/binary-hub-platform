-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'innovator');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create stakeholders table
CREATE TABLE public.stakeholders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  category TEXT NOT NULL,
  contribution TEXT,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stakeholders ENABLE ROW LEVEL SECURITY;

-- Create policies for stakeholders
CREATE POLICY "Public read access for stakeholders" 
ON public.stakeholders 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage stakeholders" 
ON public.stakeholders 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_stakeholders_updated_at
BEFORE UPDATE ON public.stakeholders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial stakeholder data
INSERT INTO public.stakeholders (name, logo, category, contribution) VALUES
('University of Rwanda', '/img/stakeholder/UR.png', 'Academic', 'Policy oversight and coordination'),
('UR Data Center', '/img/stakeholder/datacenter.png', 'Infrastructure', 'Hosting and testing infrastructure'),
('Ministry of ICT / RISA', '/img/stakeholder/minict.png', 'Government', 'Prioritization aligned with national strategy'),
('Center for Innovation', '/img/stakeholder/RISALogo.jpg', 'Innovation', 'IP support and alignment with national goals'),
('Mastercard Foundation', '/img/stakeholder/mastercard foundation.png', 'Funding', 'Support activities and innovation programs'),
('GIZ', '/img/stakeholder/giz.png', 'International', 'Technical assistance and capacity building'),
('ENABEL', '/img/stakeholder/enabel.png', 'International', 'Development cooperation and support'),
('AI & IoT Hub', '/img/stakeholder/ICT CHAMBER.png', 'Innovation', 'Mentorship, resource sharing, project protection'),
('Directorate of Research', '/img/stakeholder/NCST.png', 'Research', 'Research fund access'),
('Private Sector', '/img/stakeholder/RDB_logo.png', 'Industry', 'Mentorship, co-development, sponsorship'),
('Africa Centre of Excellence in IoT', '/img/stakeholder/ACOEIOT.png', 'Research', 'IoT research and innovation in Africa');