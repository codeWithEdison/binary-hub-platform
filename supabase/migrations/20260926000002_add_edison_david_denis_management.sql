-- Promote leadership + Edison/David/Denis to management
UPDATE public.innovators
SET featured = true
WHERE featured IS DISTINCT FROM true
  AND (
    name ILIKE '%Edison%'
    OR name ILIKE '%David TUYISHIME%'
    OR name ILIKE '%Denis UWIHIRWE%'
    OR role ILIKE '%Hub Coordinator%'
    OR role ILIKE '%Assistant Coordinator%'
    OR role ILIKE '%Assistant Administrator%'
    OR role ILIKE '%Team Leader%'
  );
