import { NextResponse } from "next/server";
import { runSingleCycle } from "@/lib/server/loop-control";

export function POST() {
  const result = runSingleCycle();
  return NextResponse.json(result, { status: result.started ? 200 : 409 });
}
