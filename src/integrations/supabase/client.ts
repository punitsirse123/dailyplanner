import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cpjlsozxxjkedwkujgxp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwamxzb3p4eGprZWR3a3VqZ3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMTUzMTIsImV4cCI6MjA1MTc5MTMxMn0.MGEYXHYSrgZ1W-8mdGrXdm8bTGeKq5Qycjb1BzoTYFc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
