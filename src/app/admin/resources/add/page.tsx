import AddResourcePage from "@/components/custom/AddResource";
import { getAllAuthors, getAllCategories, getAllTypes } from "@/lib/services";
import React from "react";

export default async function page() {
  const [categories, types, authors] = await Promise.all([
    getAllCategories(),
    getAllTypes(),
    getAllAuthors(),
  ]);
  return (
    <div className="h-full">
      <AddResourcePage
        categories={categories}
        types={types}
        authors={authors}
      />
    </div>
  );
}
