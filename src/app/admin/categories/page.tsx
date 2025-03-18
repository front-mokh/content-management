import { getAllCategories } from "@/lib/services";
import React from "react";
import CategoriesPage from "./CategoriesPage";

export default async function page() {
  const categories = await getAllCategories();

  return (
    <div className="h-full">
      <CategoriesPage categories={categories} />
    </div>
  );
}
