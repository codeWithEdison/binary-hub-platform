ALTER TABLE public.applications
  ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "Users can view their own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can create their own applications" ON public.applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON public.applications;
DROP POLICY IF EXISTS "Applicants and admins can read applications" ON public.applications;
DROP POLICY IF EXISTS "Anyone can submit applications" ON public.applications;
DROP POLICY IF EXISTS "Applicants and admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "Public can submit applications" ON public.applications;
DROP POLICY IF EXISTS "Public can view applications" ON public.applications;
DROP POLICY IF EXISTS "Public can update applications" ON public.applications;

CREATE POLICY "Public can submit applications"
  ON public.applications FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Applicants and admins can read applications"
  ON public.applications FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR (user_id IS NOT NULL AND auth.uid() = user_id));

CREATE POLICY "Applicants and admins can update applications"
  ON public.applications FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR (user_id IS NOT NULL AND auth.uid() = user_id))
  WITH CHECK (has_role(auth.uid(), 'admin') OR (user_id IS NOT NULL AND auth.uid() = user_id));

CREATE POLICY "Applicants can delete their drafts"
  ON public.applications FOR DELETE
  USING (has_role(auth.uid(), 'admin') OR (user_id IS NOT NULL AND auth.uid() = user_id AND status = 'draft'));

CREATE OR REPLACE FUNCTION public.remove_previous_application_drafts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'submitted' THEN
    DELETE FROM public.applications
    WHERE id <> NEW.id
      AND status = 'draft'
      AND (
        (NEW.user_id IS NOT NULL AND user_id = NEW.user_id)
        OR (NEW.user_id IS NULL AND applicant_email IS NOT NULL AND applicant_email = NEW.applicant_email)
      );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS applications_remove_previous_drafts ON public.applications;
CREATE TRIGGER applications_remove_previous_drafts
  AFTER INSERT OR UPDATE OF status ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.remove_previous_application_drafts();
