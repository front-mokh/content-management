import {
  getAllAuthors,
  getAllCategories,
  getAllTypes,
  getAllUsers,
  getUnpublishedResources,
} from "@/lib/services";
import React from "react";
import UnPublishedResourcesPage from "./UnPublishedResourcesPage";

export default async function page() {
  const resources = await getUnpublishedResources();
  const categories = await getAllCategories();
  const types = await getAllTypes();
  const authors = await getAllAuthors();
  const handlers = await getAllUsers();
  return (
    <div className="h-full">
      <UnPublishedResourcesPage
        resources={resources}
        categories={categories}
        types={types}
        authors={authors}
        handlers={handlers}
      />
    </div>
  );
}
