ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS github text;

ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS highest_education text,
  ADD COLUMN IF NOT EXISTS discovery_source text;
