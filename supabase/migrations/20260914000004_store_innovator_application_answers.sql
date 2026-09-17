ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS application_answers JSONB;
