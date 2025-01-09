import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://egzlbemdyixigbpzjfeo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnemxiZW1keWl4aWdicHpqZmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzODMwNTgsImV4cCI6MjA1MTk1OTA1OH0.uwbOKgnKlUJlKFEnFutriKhPSU0M2YzyqrqtQpbpPC0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);