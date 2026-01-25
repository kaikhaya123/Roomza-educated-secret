import { supabase } from "@/lib/supabase";

export async function GET() {
  const { count, error } = await supabase
    .from("Vote")
    .select("id", { count: "exact", head: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ count: count ?? 0 }), { status: 200 });
}
