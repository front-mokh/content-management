import { NextRequest, NextResponse } from "next/server";
import * as userService from "@/lib/services/userService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resources = await userService.getUserResources(params.id);
    return NextResponse.json(resources);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user resources" },
      { status: 500 }
    );
  }
}
