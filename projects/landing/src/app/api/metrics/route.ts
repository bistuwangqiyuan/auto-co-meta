import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [viewsResult, waitlistResult] = await Promise.all([
      supabase
        .from("page_views")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("waitlist_signups")
        .select("*", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      pageViews: viewsResult.count ?? 0,
      waitlistSignups: waitlistResult.count ?? 0,
      cyclesCompleted: 42,
      totalCost: 59.0,
      avgCostPerCycle: 1.40,
      monthlyBurn: 5,
      revenue: 0,
      githubStars: 5,
      blogPosts: 3,
      awesomeListPRs: 5,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
