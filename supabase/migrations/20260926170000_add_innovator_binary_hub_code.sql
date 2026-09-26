-- Human-friendly Binary Hub membership codes (e.g. /innovators/003)
ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS binary_hub_code text;

COMMENT ON COLUMN public.innovators.binary_hub_code IS
  'Public membership code used in profile URLs such as /innovators/003';

-- Unique when present (case-insensitive); multiple NULLs allowed
CREATE UNIQUE INDEX IF NOT EXISTS innovators_binary_hub_code_unique
  ON public.innovators (lower(binary_hub_code))
  WHERE binary_hub_code IS NOT NULL AND btrim(binary_hub_code) <> '';

-- Reasonable format: letters, digits, hyphen/underscore; 1–32 chars
ALTER TABLE public.innovators
  DROP CONSTRAINT IF EXISTS innovators_binary_hub_code_format;

ALTER TABLE public.innovators
  ADD CONSTRAINT innovators_binary_hub_code_format
  CHECK (
    binary_hub_code IS NULL
    OR binary_hub_code ~ '^[A-Za-z0-9_-]{1,32}$'
  );
