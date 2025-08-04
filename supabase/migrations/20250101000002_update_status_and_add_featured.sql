-- Add featured column to innovators table
ALTER TABLE public.innovators 
ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

-- Add featured column to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

-- Update existing status values to new format
UPDATE public.innovators 
SET status = 'innovator' 
WHERE status = 'student';

UPDATE public.innovators 
SET status = 'mentor' 
WHERE status = 'faculty';

-- Update the status enum type if it exists
-- Note: This might need to be done manually in the database
-- ALTER TYPE user_status RENAME TO user_status_old;
-- CREATE TYPE user_status AS ENUM ('innovator', 'alumni', 'mentor');
-- ALTER TABLE innovators ALTER COLUMN status TYPE user_status USING status::text::user_status;
-- DROP TYPE user_status_old; 