import { NextRequest, NextResponse } from "next/server";
import { UpdateTypeInput } from "@/lib/db/schema";
import * as typeService from "@/lib/services/typeService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const type = await typeService.getTypeById(params.id);
    if (!type) {
      return NextResponse.json({ error: "Type not found" }, { status: 404 });
    }
    return NextResponse.json(type);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch type" },
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
    const type = await typeService.updateType(
      params.id,
      body as UpdateTypeInput
    );
    return NextResponse.json(type);
  } catch {
    return NextResponse.json(
      { error: "Failed to update type" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const type = await typeService.deleteType(params.id);
    return NextResponse.json(type);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete type" },
      { status: 500 }
    );
  }
}
