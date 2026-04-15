import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://evfaktqsizppqimuoyyb.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2ZmFrdHFzaXpwcHFpbXVveXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjY5NDMsImV4cCI6MjA5MTA0Mjk0M30.mXB8CmuDTWFUBU5_QbyujAtJLC0usC74_CzzHb_uL5A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
