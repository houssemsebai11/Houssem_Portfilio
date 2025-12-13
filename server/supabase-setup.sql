-- Supabase Database Setup for Portfolio Website
-- Run this SQL in your Supabase SQL Editor

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  responded BOOLEAN DEFAULT FALSE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (form submissions)
CREATE POLICY "Allow public form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional - for admin dashboard)
-- Uncomment and modify if you want to create an admin interface
-- CREATE POLICY "Allow authenticated reads"
--   ON contact_submissions
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Optional: Create a function to get unread submissions count
CREATE OR REPLACE FUNCTION get_unread_submissions_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM contact_submissions
  WHERE read = FALSE;
$$ LANGUAGE SQL SECURITY DEFINER;

