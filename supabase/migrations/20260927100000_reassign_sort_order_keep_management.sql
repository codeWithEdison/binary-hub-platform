-- Reassign list order:
-- - Management (featured) with sort_order 1..6: keep as currently assigned
-- - All other innovators: number by created_at (oldest → next after 6)
-- - Projects: number by created_at (oldest → 1)

WITH locked_management AS (
  SELECT id
  FROM public.innovators
  WHERE featured IS TRUE
    AND sort_order BETWEEN 1 AND 6
),
ranked_others AS (
  SELECT
    id,
    6 + ROW_NUMBER() OVER (ORDER BY created_at ASC NULLS LAST, id) AS new_order
  FROM public.innovators
  WHERE id NOT IN (SELECT id FROM locked_management)
)
UPDATE public.innovators AS i
SET sort_order = ranked_others.new_order
FROM ranked_others
WHERE i.id = ranked_others.id;

WITH ranked_projects AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY created_at ASC NULLS LAST, id) AS new_order
  FROM public.projects
)
UPDATE public.projects AS p
SET sort_order = ranked_projects.new_order
FROM ranked_projects
WHERE p.id = ranked_projects.id;
