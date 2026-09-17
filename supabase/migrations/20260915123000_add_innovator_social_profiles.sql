ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS linkedin text,
  ADD COLUMN IF NOT EXISTS facebook text,
  ADD COLUMN IF NOT EXISTS twitter text,
  ADD COLUMN IF NOT EXISTS website text;

ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS gender text;

CREATE TABLE IF NOT EXISTS public.application_setup_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('role', 'department', 'skill')),
  name text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (category, name)
);

ALTER TABLE public.application_setup_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read application setup options" ON public.application_setup_options;
CREATE POLICY "Public can read application setup options"
  ON public.application_setup_options FOR SELECT USING (active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage application setup options" ON public.application_setup_options;
CREATE POLICY "Admins manage application setup options"
  ON public.application_setup_options FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.application_setup_options (category, name)
VALUES
  ('role', 'Student'), ('role', 'Developer'), ('role', 'Designer'),
  ('department', 'Computer Science'), ('department', 'Information Technology'),
  ('skill', 'JavaScript'), ('skill', 'TypeScript'), ('skill', 'Python'), ('skill', 'React')
ON CONFLICT (category, name) DO NOTHING;
