import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

// Only create the client if the environment variables exist (prevent crashing local-first dev without envs)
export const supabase = 
  env.PUBLIC_SUPABASE_URL && env.PUBLIC_SUPABASE_ANON_KEY 
    ? createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY) 
    : null;
