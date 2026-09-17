ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS account_status TEXT NOT NULL DEFAULT 'inactive'
  CHECK (account_status IN ('active', 'inactive'));

ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TYPE innovator_status ADD VALUE IF NOT EXISTS 'innovator';
ALTER TYPE innovator_status ADD VALUE IF NOT EXISTS 'mentor';

CREATE INDEX IF NOT EXISTS innovators_account_status_idx
  ON public.innovators (account_status);

CREATE INDEX IF NOT EXISTS innovators_user_id_idx
  ON public.innovators (user_id);