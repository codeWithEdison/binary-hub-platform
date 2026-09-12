ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS secondary_email TEXT;