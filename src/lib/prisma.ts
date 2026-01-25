import { supabase } from './supabase';

const globalForSupabase = globalThis as unknown as {
  supabase: typeof supabase | undefined;
};

export const prisma = globalForSupabase.supabase ?? supabase;

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase;

export default prisma;
