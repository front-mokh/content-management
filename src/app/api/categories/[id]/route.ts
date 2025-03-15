import { NextRequest, NextResponse } from "next/server";
import { UpdateCategoryInput } from "@/lib/db/schema";
import * as categoryService from "@/lib/services/categoryService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await categoryService.getCategoryById(params.id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch category" },
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
    const category = await categoryService.updateCategory(
      params.id,
      body as UpdateCategoryInput
    );
    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await categoryService.deleteCategory(params.id);
    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
