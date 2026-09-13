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
  'Binary Hub at the Global AI Summit on Africa',
  'binary-hub-global-ai-summit-africa',
  'From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa, joining bold minds and visionary ideas shaping the future of AI, innovation, and impact on our continent.',
  E'From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa, an event that brought together bold minds and visionary ideas.\n\nWe are proud to be part of a movement shaping the future of AI, innovation, and impact on our continent. The summit was a powerful reminder that Africa''s most important ideas are already here, being developed by people who understand our communities and our possibilities.\n\nBig thanks to MINICT and @rwandaict for organizing such a transformative experience. Africa is rising and we are building the future, one idea at a time.\n\n#gais2025 #BinaryHub #aiforafrica #innovationinmotion',
  'AI & Africa',
  '3-4 April 2025',
  3,
  '/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even (2).jpg',
  true,
  true,
  '2025-04-04T12:00:00Z'
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
