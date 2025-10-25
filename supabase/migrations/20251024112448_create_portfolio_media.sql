/*
  # Drone Portfolio Media Management

  1. New Tables
    - `portfolio_items`
      - `id` (uuid, primary key) - Unique identifier for each portfolio item
      - `title` (text) - Title of the portfolio item
      - `description` (text) - Description of the work
      - `media_url` (text) - URL to the media file in Supabase Storage
      - `media_type` (text) - Type of media: 'image' or 'video'
      - `thumbnail_url` (text, nullable) - URL to thumbnail for videos
      - `display_order` (integer) - Order for displaying items
      - `is_featured` (boolean) - Whether to feature this item
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `portfolio_items` table
    - Add policy for public read access (portfolio viewing)
    - Add policy for authenticated admin insert/update/delete (content management)

  3. Storage
    - Create storage bucket for portfolio media
    - Set up public access policies for viewing
    - Set up authenticated access for uploads

  4. Notes
    - Media files will be stored in Supabase Storage
    - Public can view all portfolio items
    - Only authenticated users can manage content
*/

-- Create portfolio items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  media_url text NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
  thumbnail_url text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Public can view all portfolio items
CREATE POLICY "Anyone can view portfolio items"
  ON portfolio_items
  FOR SELECT
  USING (true);

-- Authenticated users can insert portfolio items
CREATE POLICY "Authenticated users can insert portfolio items"
  ON portfolio_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update portfolio items
CREATE POLICY "Authenticated users can update portfolio items"
  ON portfolio_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete portfolio items
CREATE POLICY "Authenticated users can delete portfolio items"
  ON portfolio_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for portfolio media
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view files in the bucket
CREATE POLICY "Public can view portfolio media"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload portfolio media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update portfolio media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-media')
  WITH CHECK (bucket_id = 'portfolio-media');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete portfolio media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-media');

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_portfolio_items_display_order 
  ON portfolio_items(display_order);

-- Create index for featured items
CREATE INDEX IF NOT EXISTS idx_portfolio_items_featured 
  ON portfolio_items(is_featured) 
  WHERE is_featured = true;