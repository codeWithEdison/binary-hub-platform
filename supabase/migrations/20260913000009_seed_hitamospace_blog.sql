INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  story_date,
  read_time_minutes,
  image,
  published,
  is_main,
  publish_date
)
VALUES (
  'Empowering innovation together with HitamoSpace',
  'empowering-innovation-together-hitamospace',
  'Binary Hub proudly supports HitamoSpace, a next-generation event and venue management platform powered by Binary Hub, transforming how the University of Rwanda manages events and spaces.',
  E'Binary Hub proudly supports the HitamoSpace system, a next-generation event and venue management platform powered by Binary Hub.\n\nHitamoSpace is transforming how the University of Rwanda manages events and spaces, bringing smarter workflows and better experiences to the people who use them.\n\n#HitamoSpace #BinaryHub #ur #innovation #TechForImpact #eventtech #smartsolutions #urcst',
  'Product Spotlight',
  '47 weeks ago',
  2,
  '/img/blog/🚀 Empowering innovation together!Binary Hub proudly supporting the HitamoSpace system, a next-.webp',
  true,
  false,
  '2025-10-26T12:00:00Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  story_date = EXCLUDED.story_date,
  read_time_minutes = EXCLUDED.read_time_minutes,
  image = EXCLUDED.image,
  published = EXCLUDED.published,
  is_main = EXCLUDED.is_main,
  publish_date = EXCLUDED.publish_date;
