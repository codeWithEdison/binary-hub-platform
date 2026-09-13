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
VALUES
(
  'Building with purpose: what makes a strong prototype',
  'building-with-purpose-strong-prototype',
  'A practical look at the choices that help promising ideas move from a sketch to something people can use.',
  E'A strong prototype does more than demonstrate an idea. It creates a shared language for the people building it and the people it is meant to serve.\n\nAt Binary Hub, we help innovators test assumptions early, listen closely to users, and turn promising concepts into useful digital solutions.',
  'Resources',
  'Innovation in practice',
  4,
  '/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even.jpg',
  true,
  false,
  '2025-11-02T12:00:00Z'
),
(
  'The people behind the projects changing campus life',
  'people-behind-projects-changing-campus-life',
  'Meet the students and staff turning everyday observations into useful, ambitious digital solutions.',
  E'Innovation begins with attention. Across the University of Rwanda, students and staff are turning everyday observations into useful, ambitious digital solutions.\n\nTheir work shows what becomes possible when curiosity, technical skill, and a deep understanding of community needs come together.',
  'Community',
  'The Binary Hub community',
  5,
  '/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even (1).jpg',
  true,
  false,
  '2025-11-09T12:00:00Z'
),
(
  'From first conversation to lasting collaboration',
  'first-conversation-lasting-collaboration',
  'Why the best innovation partnerships begin by listening carefully and building trust early.',
  E'The best innovation partnerships begin with a good conversation. Listening carefully helps teams understand the challenge before deciding on the solution.\n\nThat foundation of trust makes collaboration stronger, more practical, and more likely to create lasting impact.',
  'Partnerships',
  'Working together',
  3,
  '/img/presentation-img/IMG-20231019-WA0013.jpg',
  true,
  false,
  '2025-11-16T12:00:00Z'
),
(
  'Designing digital tools for the context they serve',
  'designing-digital-tools-for-context',
  'Local insight is more than a constraint. It is the advantage that helps solutions stay relevant after launch.',
  E'Great digital tools are shaped by the context they serve. Local insight helps teams design around real habits, real constraints, and real opportunities.\n\nWhen solutions are grounded in that context, they remain relevant long after launch and are better positioned to grow with the people who use them.',
  'Perspective',
  'Designing for impact',
  4,
  '/img/presentation-img/IMG-20231019-WA0016.jpg',
  true,
  false,
  '2025-11-23T12:00:00Z'
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
