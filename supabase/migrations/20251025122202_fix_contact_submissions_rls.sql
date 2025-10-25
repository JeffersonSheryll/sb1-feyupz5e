/*
  # Fix contact submissions RLS policy

  1. Changes
    - Drop the existing restrictive policy
    - Create new policy that allows public (anon + authenticated) to insert contact form submissions
  
  2. Security
    - Allow anyone (authenticated or not) to submit contact forms
    - Keep read access restricted to authenticated users only
*/

DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

CREATE POLICY "Public can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);