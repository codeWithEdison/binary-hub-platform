ALTER TABLE public.applications
  ADD CONSTRAINT applications_submitted_image_required
  CHECK (status <> 'submitted' OR length(trim(COALESCE(image, ''))) > 0) NOT VALID;