DROP POLICY IF EXISTS "Admin members can read all innovators" ON public.innovators;

CREATE POLICY "Admin members can read all innovators"
  ON public.innovators FOR SELECT
  USING (has_role(auth.uid(), 'admin'));
