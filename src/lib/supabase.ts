import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  media_url: string;
  media_type: 'image' | 'video' | '360_image';
  thumbnail_url: string | null;
  display_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}
