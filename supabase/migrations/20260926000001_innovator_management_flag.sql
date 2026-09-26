-- Management visibility uses innovators.featured
-- Yes (featured = true) → Meet the management on landing + innovators directory

COMMENT ON COLUMN public.innovators.featured IS
  'Is management: when true, shown in Meet the management on landing and innovators pages';

-- Promote currently highlighted / leadership roles into management
UPDATE public.innovators
SET featured = true
WHERE featured IS DISTINCT FROM true
  AND (
    role ILIKE '%coordinator%'
    OR role ILIKE '%administrator%'
    OR role ILIKE '%director%'
    OR role ILIKE '%management%'
  );
