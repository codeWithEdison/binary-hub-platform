-- Update status values in the database
-- Change 'student' to 'innovator' and 'faculty' to 'mentor'

-- First, let's check what status values currently exist
SELECT DISTINCT status FROM public.innovators;

-- Update 'student' to 'innovator'
UPDATE public.innovators 
SET status = 'innovator' 
WHERE status = 'student';

-- Update 'faculty' to 'mentor'
UPDATE public.innovators 
SET status = 'mentor' 
WHERE status = 'faculty';

-- Verify the changes
SELECT DISTINCT status FROM public.innovators;

-- Also update any references in other tables if they exist
-- For example, if there are any foreign key references or lookup tables
-- that might reference these status values, they would need to be updated too.

-- Note: If you have any application code that references these status values,
-- you'll also need to update those references to use the new values. 