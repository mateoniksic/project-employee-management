import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://inlhwmifvfmeychsqyle.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlubGh3bWlmdmZtZXljaHNxeWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1MzY2NjIsImV4cCI6MjAxMDExMjY2Mn0.ZhYhoeHoRnkOp9TEyJAyIywI7GVFyjCxuqW6pt9C754';

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

export { SUPABASE_URL };
