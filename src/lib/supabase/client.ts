import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knicvdbfsjccxwltolyb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_tGCMwZNXYUa0XhJd2No8Ag_qeDX1paH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
