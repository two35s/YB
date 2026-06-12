import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const MAX = { name: 200, email: 320, projectType: 100, message: 5000 };

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real users never fill this field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const projectType = String(body.projectType ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (
    name.length < 2 ||
    name.length > MAX.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > MAX.email ||
    projectType.length > MAX.projectType ||
    message.length < 6 ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Supabase not configured yet — accept the message so the UI works in dev,
    // but make the gap loud in the server logs.
    console.warn(
      "[contact] SUPABASE env vars missing — message NOT stored:",
      { name, email, projectType }
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, project_type: projectType, message });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json({ error: "Storage failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
