import { NextResponse } from "next/server";
import { emergencyStop } from "@/lib/server/loop-control";

export function POST() {
  const result = emergencyStop();
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
