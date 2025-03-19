import ResourceDetailsPage from "@/components/custom/ResourceDetails";
import { getResourceById } from "@/lib/services";
import { notFound } from "next/navigation";
import React from "react";

export default async function details({ params }: { params: { id: string } }) {
  const resourceId = params.id;
  const resource = await getResourceById(resourceId);

  console.log({ resource });

  if (!resource) {
    notFound();
  }

  return (
    <div>
      <ResourceDetailsPage resource={resource} isAdmin={true} />
    </div>
  );
}
