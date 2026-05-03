import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Only create the client if the environment variables exist (prevent crashing local-first dev without envs)
export const supabase = 
  PUBLIC_SUPABASE_URL && PUBLIC_SUPABASE_ANON_KEY 
    ? createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY) 
    : null;
