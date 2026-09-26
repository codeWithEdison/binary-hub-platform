-- Manual list order for innovators and projects (lower = first)
ALTER TABLE public.innovators
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.innovators.sort_order IS
  'Manual display order on public/admin lists; lower numbers appear first';

COMMENT ON COLUMN public.projects.sort_order IS
  'Manual display order on public/admin lists; lower numbers appear first';

-- Preserve current list order (newest-first) as the starting sort values
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC NULLS LAST, id) AS rn
  FROM public.innovators
)
UPDATE public.innovators AS i
SET sort_order = ranked.rn
FROM ranked
WHERE i.id = ranked.id;

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC NULLS LAST, id) AS rn
  FROM public.projects
)
UPDATE public.projects AS p
SET sort_order = ranked.rn
FROM ranked
WHERE p.id = ranked.id;

CREATE INDEX IF NOT EXISTS innovators_sort_order_idx
  ON public.innovators (sort_order ASC, created_at DESC);

CREATE INDEX IF NOT EXISTS projects_sort_order_idx
  ON public.projects (sort_order ASC, created_at DESC);
