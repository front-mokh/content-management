import { NextRequest, NextResponse } from "next/server";
import {
  getCategoryById,
  getCategoryTypes,
  getResourcesByCategory,
} from "@/lib/services";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  const searchParams = request.nextUrl.searchParams;

  const page = parseInt(searchParams.get("page") || "1");
  const typeFilter = searchParams.get("type") || undefined;
  const sortOption = searchParams.get("sort") || "publishedAt";

  try {
    const category = await getCategoryById(categoryId);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const types = await getCategoryTypes(category.id);

    // Fetch resources with pagination
    const { resources, pagination } = await getResourcesByCategory({
      categoryId: category.id,
      page,
      typeId: typeFilter,
      sort: sortOption,
      limit: 12,
    });

    return NextResponse.json({
      resources,
      pagination,
      types,
      category,
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
