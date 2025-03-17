import { NextRequest, NextResponse } from "next/server";
import { UpdateUserInput } from "@/lib/db/schema";
import * as userService from "@/lib/services/userService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.getUserById(params.id);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await userService.updateUser(
      params.id,
      body as UpdateUserInput
    );
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.deleteUser(params.id);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}