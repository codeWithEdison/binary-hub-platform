ALTER TYPE innovator_status ADD VALUE IF NOT EXISTS 'innovator';
ALTER TYPE innovator_status ADD VALUE IF NOT EXISTS 'mentor';

ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

UPDATE public.innovators
SET account_status = 'active'
WHERE user_id IS NULL;

CREATE INDEX IF NOT EXISTS innovators_user_id_idx
  ON public.innovators (user_id);
