ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS story_date TEXT,
  ADD COLUMN IF NOT EXISTS read_time_minutes INTEGER NOT NULL DEFAULT 3;

ALTER TABLE public.blog_posts
  ADD CONSTRAINT blog_posts_read_time_minutes_check
  CHECK (read_time_minutes > 0 AND read_time_minutes <= 120);
