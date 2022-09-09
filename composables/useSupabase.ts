import { createClient } from '@supabase/supabase-js';
const SUPABASE_KEY= process.env.SUPABASE_KEY;

const useSupabase = () => {
  const supabase = createClient(process.env.SUPABASE_URL, SUPABASE_KEY);
  return { supabase };
}

export default useSupabase;