import React from "react";
import AddVillagePage from "./AddVillagePage";

export default async function page() {
  // No data fetching needed for the add page itself
  return (
    <div className="h-full">
      <AddVillagePage />
    </div>
  );
}