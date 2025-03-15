import { NextRequest, NextResponse } from "next/server";
import { CreateCategoryInput } from "@/lib/db/schema";
import * as categoryService from "@/lib/services/categoryService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!)
      : undefined;
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!)
      : undefined;

    const categories = await categoryService.getAllCategories(skip, take);
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const category = await categoryService.createCategory(
      body as CreateCategoryInput
    );
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
