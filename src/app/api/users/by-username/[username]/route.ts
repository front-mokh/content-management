import { NextRequest, NextResponse } from "next/server";
import * as userService from "@/lib/services/userService";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const user = await userService.getUserByUsername(params.username);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
