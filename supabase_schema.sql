-- Schema for Ecards Application

-- Cards Table
CREATE TABLE public.cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  occasion TEXT NOT NULL, -- e.g., 'birthday', 'farewell'
  theme TEXT DEFAULT 'default',
  background_music TEXT,
  scheduled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'sent'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Signatures Table
CREATE TABLE public.signatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
  contributor_name TEXT NOT NULL,
  message TEXT,
  image_url TEXT,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Allow public read access to cards and signatures based on ID for shareable links
CREATE POLICY "Cards are publicly viewable" ON public.cards FOR SELECT USING (true);
CREATE POLICY "Signatures are publicly viewable" ON public.signatures FOR SELECT USING (true);
CREATE POLICY "Anyone can add a signature" ON public.signatures FOR INSERT WITH CHECK (true);

-- Creator policies
CREATE POLICY "Users can create cards" ON public.cards FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update their own cards" ON public.cards FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete their own cards" ON public.cards FOR DELETE USING (auth.uid() = creator_id);
