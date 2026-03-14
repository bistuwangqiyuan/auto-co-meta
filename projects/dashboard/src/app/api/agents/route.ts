import { NextResponse } from "next/server";
import { listAgents, updateAgentsEnabled } from "@/lib/server/loop-control";

interface UpdatePayload {
  updates?: Array<{ name: string; enabled: boolean }>;
}

export function GET() {
  return NextResponse.json({
    agents: listAgents(),
  });
}

export async function POST(request: Request) {
  let payload: UpdatePayload;
  try {
    payload = (await request.json()) as UpdatePayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const updates = payload.updates ?? [];
  if (!Array.isArray(updates) || updates.some((u) => typeof u.name !== "string" || typeof u.enabled !== "boolean")) {
    return NextResponse.json({ error: "invalid_updates" }, { status: 400 });
  }

  return NextResponse.json({
    agents: updateAgentsEnabled(updates),
  });
}
