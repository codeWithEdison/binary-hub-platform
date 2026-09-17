ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS applicant_identifier text;

ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS linkedin text,
  ADD COLUMN IF NOT EXISTS facebook text,
  ADD COLUMN IF NOT EXISTS twitter text,
  ADD COLUMN IF NOT EXISTS website text;

CREATE OR REPLACE FUNCTION public.generate_applicant_identifier()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  candidate text;
BEGIN
  LOOP
    candidate := 'BM-' || lpad(floor(random() * 100000)::int::text, 5, '0');
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.innovators WHERE applicant_identifier = candidate
    );
  END LOOP;
  RETURN candidate;
END;
$$;

UPDATE public.innovators
SET applicant_identifier = public.generate_applicant_identifier()
WHERE applicant_identifier IS NULL;

ALTER TABLE public.innovators
  ALTER COLUMN applicant_identifier SET DEFAULT public.generate_applicant_identifier();

CREATE UNIQUE INDEX IF NOT EXISTS innovators_applicant_identifier_key
  ON public.innovators (applicant_identifier);
