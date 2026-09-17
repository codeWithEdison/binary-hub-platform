UPDATE public.innovators
SET account_status = 'active'
WHERE user_id IS NULL
  AND account_status = 'inactive';
