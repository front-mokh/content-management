// app/admin/villages/[id]/edit/page.tsx
import { getVillageById } from "@/lib/services/vilageService";
import { notFound } from "next/navigation";
import React from "react";
import UpdateVillagePage from "./UpdateVillagePage";

export default async function EditVillagePage({
  params,
}: {
  params: { id: string };
}) {
  const villageId = params.id;
  const village = await getVillageById(villageId);

  if (!village) {
    return notFound();
  }

  return (
    <div className="h-full">
      <UpdateVillagePage village={village} />
    </div>
  );
}
