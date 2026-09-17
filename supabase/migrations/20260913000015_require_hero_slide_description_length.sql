ALTER TABLE public.hero_slides
  DROP CONSTRAINT IF EXISTS hero_slides_description_check;

UPDATE public.hero_slides
SET description = rtrim(description) || ' Learn more about our work and community.'
WHERE char_length(description) < 40;

ALTER TABLE public.hero_slides
  ADD CONSTRAINT hero_slides_description_check
  CHECK (char_length(description) BETWEEN 40 AND 180);