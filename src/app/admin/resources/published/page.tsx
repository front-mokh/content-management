import {
  getPublishedResources,
  getAllAuthors,
  getAllCategories,
  getAllTypes,
  getAllUsers,
} from "@/lib/services";
import React from "react";
import PublishedResourcesPage from "./PublishedResourcesPage";

export default async function page() {
  const resources = await getPublishedResources();
  const categories = await getAllCategories();
  const types = await getAllTypes();
  const authors = await getAllAuthors();
  const handlers = await getAllUsers();
  return (
    <div className="h-full">
      <PublishedResourcesPage
        resources={resources}
        categories={categories}
        types={types}
        authors={authors}
        handlers={handlers}
      />
    </div>
  );
}
