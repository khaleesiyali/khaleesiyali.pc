-- SUPABASE SCHEMA FOR INTERNET APP BLOG

-- 1. Create Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  tags text[] DEFAULT '{}'::text[],
  thumbnail_url text,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Guestbook Comments Table
CREATE TABLE IF NOT EXISTS public.guestbook_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  nickname text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Likes Table (Tracking via anonymous string IDs or IP hashes)
CREATE TABLE IF NOT EXISTS public.post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(post_id, session_id)
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to Posts
CREATE POLICY "Enable read access for all users" ON public.posts FOR SELECT USING (true);

-- Allow public insert to Guestbook and read
CREATE POLICY "Enable insert for anonymous users" ON public.guestbook_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON public.guestbook_comments FOR SELECT USING (true);

-- Allow public insert to Likes and read
CREATE POLICY "Enable insert for anonymous users" ON public.post_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON public.post_likes FOR SELECT USING (true);

-- ----------------------------------------------------
-- SEED DATA (EXAMPLE POSTS)
-- ----------------------------------------------------
-- (Assuming you want to insert the data into Supabase directly instead of LocalStorage fallback)

-- Run this snippet manually replacing the generated UUIDs if needed.
-- INSERT INTO public.posts (slug, title, tags, thumbnail_url, content)
-- VALUES 
--  ('post-1', 'Spring Break: A Ghibli-Inspired Reset at Building 12', ARRAY['#UniLife', '#Campus', '#Reset', '#Gamer'], '/assets/chihiro.jpg', 'Content here...'),
--  ('post-2', 'The Tokyo Data Dive: Uncovering UX in Shinjuku & Akihabara', ARRAY['#Travel', '#Tokyo', '#UXResearch', '#NLP'], '/assets/IMG_1058.PNG', 'Content here...');
