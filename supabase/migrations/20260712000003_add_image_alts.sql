-- 20260712000003_add_image_alts.sql: Add alt text columns for accessibility (a11y)
ALTER TABLE public.destinations ADD COLUMN hero_image_alt text NOT NULL DEFAULT 'Destination Skyline';
ALTER TABLE public.universities ADD COLUMN logo_alt text NOT NULL DEFAULT 'University Logo';
ALTER TABLE public.universities ADD COLUMN gallery_images_alts text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.team_members ADD COLUMN image_alt text NOT NULL DEFAULT 'Team Member Photo';
