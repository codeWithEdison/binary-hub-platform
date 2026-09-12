ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS applicant_name TEXT,
  ADD COLUMN IF NOT EXISTS applicant_email TEXT;

UPDATE public.applications AS applications
SET
  applicant_name = NULLIF(
    CONCAT_WS(
      ' ',
      auth_users.raw_user_meta_data->>'first_name',
      auth_users.raw_user_meta_data->>'last_name'
    ),
    ''
  ),
  applicant_email = auth_users.email
FROM auth.users AS auth_users
WHERE applications.user_id = auth_users.id
  AND (applications.applicant_name IS NULL OR applications.applicant_email IS NULL);