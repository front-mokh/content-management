import { getRejectedSubmissions } from "@/lib/services";
import React from "react";
import RejectedSubmissionsPage from "./RejectedSubmissionsPage";
export default async function Page() {
  const submissions = await getRejectedSubmissions();
  return (
    <div className="h-full">
      <RejectedSubmissionsPage submissions={submissions} />
    </div>
  );
}
