import { getPublishedResources } from "@/lib/services";
import React from "react";
import PublishedResourcesPage from "./PublishedResourcesPage";

export default async function page() {
  const resources = await getPublishedResources();
  return (
    <div className="h-full">
      <PublishedResourcesPage resources={resources} />
    </div>
  );
}
