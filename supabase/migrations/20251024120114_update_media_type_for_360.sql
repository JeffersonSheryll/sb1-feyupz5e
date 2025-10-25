/*
  # Update media_type column to support 360 images

  1. Changes
    - Modify the media_type column to accept '360_image' as a valid value
    - This allows storing 360-degree panoramic photos alongside regular images and videos
  
  2. Notes
    - Existing data remains unchanged
    - New uploads can now specify '360_image' as the media type
*/

DO $$
BEGIN
  -- Drop the existing check constraint if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'portfolio_items' 
    AND constraint_name LIKE '%media_type%'
  ) THEN
    ALTER TABLE portfolio_items DROP CONSTRAINT IF EXISTS portfolio_items_media_type_check;
  END IF;
  
  -- Add new check constraint with 360_image support
  ALTER TABLE portfolio_items ADD CONSTRAINT portfolio_items_media_type_check 
    CHECK (media_type IN ('image', 'video', '360_image'));
END $$;
