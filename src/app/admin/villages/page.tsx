
import { getAllVillages } from "@/lib/services/vilageService";
import React from "react";
import VillagesPage from "./VillagesPage";

export default async function page() {
  // Add error handling if needed
  const villages = await getAllVillages();
  console.log("villages", villages);

  return (
    <div className="h-full">
      <VillagesPage villages={villages} />
    </div>
  );
}
