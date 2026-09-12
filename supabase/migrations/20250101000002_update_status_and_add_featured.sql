-- Add featured column to innovators table
ALTER TABLE public.innovators 
ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

-- Add featured column to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

-- Keep the existing innovator_status values unchanged.