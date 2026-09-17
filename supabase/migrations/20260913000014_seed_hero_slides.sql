INSERT INTO public.hero_slides (title, description, image_url, button_label, button_url, sort_order, published)
SELECT seed.title, seed.description, seed.image_url, seed.button_label, seed.button_url, seed.sort_order, true
FROM (VALUES
  (
    'Ideas in motion',
    'Students turning thoughtful ideas into practical solutions for Rwanda and beyond.',
    '/img/presentation-img/presentation.jpg',
    'Explore the Hub',
    '/innovations',
    0
  ),
  (
    'Built together',
    'A collaborative space where students, mentors, and partners build the future together.',
    '/img/presentation-img/team.jpg',
    'Meet the Community',
    '/innovators',
    1
  ),
  (
    'People who create',
    'Supporting curious minds with the guidance, tools, and community they need to create.',
    '/img/presentation-img/IMG-20231019-WA0036.jpg',
    'See Our Work',
    '/projects',
    2
  ),
  (
    'Shared knowledge',
    'Learn from experienced voices and connect with people who believe in your next idea.',
    '/img/presentation-img/guest-pic.jpg',
    'Join the Conversation',
    '/events',
    3
  ),
  (
    'From prototype to impact',
    'Move from an early concept to a solution that makes a meaningful difference.',
    '/img/presentation-img/IMG-20231019-WA0017.jpg',
    'View Innovations',
    '/innovations',
    4
  )
) AS seed(title, description, image_url, button_label, button_url, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.hero_slides existing WHERE existing.title = seed.title
);
