// app/api/authors/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CreateAuthorInput } from "@/lib/db/schema";
import * as authorService from "@/lib/services/authorService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!)
      : undefined;
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!)
      : undefined;
    const authors = await authorService.getAllAuthors(skip, take);
    return NextResponse.json(authors);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const author = await authorService.createAuthor(
      body as CreateAuthorInput
    );
    return NextResponse.json(author, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}