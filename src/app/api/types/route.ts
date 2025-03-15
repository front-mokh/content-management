import { NextRequest, NextResponse } from "next/server";
import { CreateTypeInput } from "@/lib/db/schema";
import * as typeService from "@/lib/services/typeService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!)
      : undefined;
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!)
      : undefined;

    const types = await typeService.getAllTypes(categoryId, skip, take);
    return NextResponse.json(types);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch types" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = await typeService.createType(body as CreateTypeInput);
    return NextResponse.json(type, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create type" },
      { status: 500 }
    );
  }
}
