-- 20260712000004_update_branches_telephone.sql: Add telephone column to branches table
ALTER TABLE public.branches ADD COLUMN telephone text NOT NULL DEFAULT '';
