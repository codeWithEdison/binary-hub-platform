-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.innovator_skills (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  innovator_id uuid,
  skill text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT innovator_skills_pkey PRIMARY KEY (id),
  CONSTRAINT innovator_skills_innovator_id_fkey FOREIGN KEY (innovator_id) REFERENCES public.innovators(id)
);
CREATE TABLE public.innovators (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  status USER-DEFINED NOT NULL,
  department text NOT NULL,
  image text,
  bio text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  user_id uuid,
  CONSTRAINT innovators_pkey PRIMARY KEY (id),
  CONSTRAINT innovators_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.project_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_categories_pkey PRIMARY KEY (id),
  CONSTRAINT project_categories_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_gallery (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_gallery_pkey PRIMARY KEY (id),
  CONSTRAINT project_gallery_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_innovators (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  innovator_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_innovators_pkey PRIMARY KEY (id),
  CONSTRAINT project_innovators_innovator_id_fkey FOREIGN KEY (innovator_id) REFERENCES public.innovators(id),
  CONSTRAINT project_innovators_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_links (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  link_type text NOT NULL,
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_links_pkey PRIMARY KEY (id),
  CONSTRAINT project_links_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_team (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  name text NOT NULL,
  role text NOT NULL,
  image text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_team_pkey PRIMARY KEY (id),
  CONSTRAINT project_team_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_technologies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  technology text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_technologies_pkey PRIMARY KEY (id),
  CONSTRAINT project_technologies_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_updates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  date date NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_updates_pkey PRIMARY KEY (id),
  CONSTRAINT project_updates_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  stage USER-DEFINED NOT NULL,
  category text NOT NULL,
  image text,
  date date,
  status text,
  full_description text,
  problem_statement text,
  solution text,
  results text,
  impact text,
  future_plans text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  user_id uuid,
  CONSTRAINT projects_pkey PRIMARY KEY (id),
  CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT services_pkey PRIMARY KEY (id)
);
CREATE TABLE public.stakeholders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text,
  category text NOT NULL,
  contribution text,
  website text,
  contact_email text,
  contact_phone text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT stakeholders_pkey PRIMARY KEY (id)
);
CREATE TABLE public.stats (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT stats_pkey PRIMARY KEY (id)
);  
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role USER-DEFINED NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);