import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("Vote")
    .delete()
    .eq("id", params.id)
    .select("id")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Failed to delete vote", details: error.message }, { status: 400 });
  }

  if (!data) return NextResponse.json({ error: "Vote not found" }, { status: 404 });

  return NextResponse.json(null, { status: 204 });
}
