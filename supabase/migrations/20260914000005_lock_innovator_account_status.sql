DROP POLICY IF EXISTS "innovators_policy" ON public.innovators;
DROP POLICY IF EXISTS "Public read access for innovators" ON public.innovators;
DROP POLICY IF EXISTS "Public can create inactive innovators" ON public.innovators;
DROP POLICY IF EXISTS "Admins can manage innovators" ON public.innovators;

CREATE POLICY "Public can read active innovators"
  ON public.innovators FOR SELECT
  USING (account_status = 'active' OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can create inactive innovators"
  ON public.innovators FOR INSERT
  WITH CHECK (account_status = 'inactive');

CREATE POLICY "Admins can create innovators"
  ON public.innovators FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage innovators"
  ON public.innovators FOR UPDATE
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete innovators"
  ON public.innovators FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.force_innovator_application_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NOT has_role(auth.uid(), 'admin') THEN
    NEW.account_status := 'inactive';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS force_innovator_application_status ON public.innovators;
CREATE TRIGGER force_innovator_application_status
  BEFORE INSERT ON public.innovators
  FOR EACH ROW
  EXECUTE FUNCTION public.force_innovator_application_status();