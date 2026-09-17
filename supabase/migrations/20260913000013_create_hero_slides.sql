CREATE TABLE IF NOT EXISTS public.hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 60),
  description TEXT NOT NULL DEFAULT '' CHECK (char_length(description) <= 180),
  image_url TEXT NOT NULL,
  button_label TEXT NOT NULL DEFAULT 'Explore the Hub' CHECK (char_length(button_label) BETWEEN 1 AND 24),
  button_url TEXT NOT NULL DEFAULT '/innovations' CHECK (char_length(button_url) BETWEEN 1 AND 200),
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published hero slides"
  ON public.hero_slides FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage hero slides"
  ON public.hero_slides FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_hero_slides_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS hero_slides_updated_at ON public.hero_slides;
CREATE TRIGGER hero_slides_updated_at
  BEFORE UPDATE ON public.hero_slides
  FOR EACH ROW EXECUTE FUNCTION public.set_hero_slides_updated_at();

-- Hero media is uploaded by the admin form to the hero-slides/ prefix
-- in the existing public images bucket.
