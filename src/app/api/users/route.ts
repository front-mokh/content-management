// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CreateUserInput } from "@/lib/db/schema";
import * as userService from "@/lib/services/userService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!)
      : undefined;
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!)
      : undefined;
    const users = await userService.getAllUsers(skip, take);
    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await userService.createUser(
      body as CreateUserInput
    );
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}