import { getUnpublishedResources } from "@/lib/services";
import React from "react";
import UnPublishedResourcesPage from "./UnPublishedResourcesPage";

export default async function page() {
  const resources = await getUnpublishedResources();
  return (
    <div className="h-full">
      <UnPublishedResourcesPage resources={resources} />
    </div>
  );
}
