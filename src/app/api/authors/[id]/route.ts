// app/api/authors/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UpdateAuthorInput } from "@/lib/db/schema";
import * as authorService from "@/lib/services/authorService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const author = await authorService.getAuthorById(params.id);
    if (!author) {
      return NextResponse.json(
        { error: "Author not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(author);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch author" },
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
    const author = await authorService.updateAuthor(
      params.id,
      body as UpdateAuthorInput
    );
    return NextResponse.json(author);
  } catch {
    return NextResponse.json(
      { error: "Failed to update author" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const author = await authorService.deleteAuthor(params.id);
    return NextResponse.json(author);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 }
    );
  }
}