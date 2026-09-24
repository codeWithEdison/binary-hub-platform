ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.blog_posts
SET images = jsonb_build_array(image)
WHERE image IS NOT NULL
  AND jsonb_array_length(images) = 0;
