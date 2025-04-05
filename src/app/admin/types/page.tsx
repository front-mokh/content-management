import { getAllTypes, getAllCategories } from "@/lib/services";
import React from "react";
import TypesPage from "./TypePage";

export default async function page() {
  const types = await getAllTypes();
  const categories = await getAllCategories();
  return (
    <div className="h-full">
      <TypesPage types={types} categories={categories} />
    </div>
  );
}