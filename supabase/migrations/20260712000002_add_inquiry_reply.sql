-- 20260712000002_add_inquiry_reply.sql: Add email reply columns to inquiries table
ALTER TABLE public.inquiries
ADD COLUMN replied_at timestamp with time zone,
ADD COLUMN reply_message text;
