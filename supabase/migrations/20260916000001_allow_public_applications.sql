ALTER TABLE public.applications
  ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "Users can view their own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can create their own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON public.applications;

CREATE POLICY "Applicants and admins can read applications"
  ON public.applications FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR (user_id IS NOT NULL AND auth.uid() = user_id));

CREATE POLICY "Anyone can submit applications"
  ON public.applications FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Applicants and admins can update applications"
  ON public.applications FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR (user_id IS NOT NULL AND auth.uid() = user_id))
  WITH CHECK (has_role(auth.uid(), 'admin') OR (user_id IS NOT NULL AND auth.uid() = user_id));

ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS innovators_application_id_key
  ON public.innovators (application_id)
  WHERE application_id IS NOT NULL;
