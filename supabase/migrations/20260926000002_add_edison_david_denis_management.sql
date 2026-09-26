-- Promote Edison, David, and Denis to management
UPDATE public.innovators
SET featured = true
WHERE
  name ILIKE '%Edison%'
  OR name ILIKE '%David TUYISHIME%'
  OR name ILIKE '%Denis UWIHIRWE%';
