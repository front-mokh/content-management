import { getPendingSubmissions } from "@/lib/services";
import React from "react";
import PendingSubmissionsPage from "./PendingSubmissionsPage";
export default async function Page() {
  const submissions = await getPendingSubmissions();
  return (
    <div className="h-full">
      <PendingSubmissionsPage submissions={submissions} />
    </div>
  );
}
