import React from "react";
import ResourcesPage from "./ResourcesPage";
import { getAllResources } from "@/lib/services";

export default async function page() {
  const resources = await getAllResources();

  return (
    <div className="h-full">
      <ResourcesPage resources={resources} />
    </div>
  );
}
