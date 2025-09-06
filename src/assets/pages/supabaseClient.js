import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpolvolrbtnfvdcwjoes.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb2x2b2xyYnRuZnZkY3dqb2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MTEwNzcsImV4cCI6MjA3MjI4NzA3N30.cASPYXnyhbxcLdf_uZjcod-XmLx_ExKGc_dnlXRYCgI';

export const supabase = createClient(supabaseUrl, supabaseKey);