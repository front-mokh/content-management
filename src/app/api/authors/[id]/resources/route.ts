// app/api/authors/[id]/resources/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as authorService from "@/lib/services/authorService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resources = await authorService.getAuthorResources(params.id);
    return NextResponse.json(resources);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch author resources" },
      { status: 500 }
    );
  }
}
