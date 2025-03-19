import UpdateResourcePage from "@/components/custom/UpdateResource";
import {
  getAllAuthors,
  getAllCategories,
  getAllTypes,
  getResourceById,
} from "@/lib/services";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const resourceId = params.id;

  const resource = await getResourceById(resourceId);
  const [categories, types, authors] = await Promise.all([
    getAllCategories(),
    getAllTypes(),
    getAllAuthors(),
  ]);

  if (!resource) {
    return notFound();
  }
  return (
    <div>
      <UpdateResourcePage
        resource={resource}
        categories={categories}
        types={types}
        authors={authors}
      />
    </div>
  );
}
