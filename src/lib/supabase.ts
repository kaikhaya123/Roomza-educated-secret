import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper function to execute raw SQL queries
export async function query(sql: string, params?: any[]) {
  const { data, error } = await supabase.rpc('exec_sql', {
    query: sql,
    params: params || [],
  });

  if (error) throw error;
  return data;
}

export default supabase;
