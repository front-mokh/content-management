import React from "react";
import AddEventPage from "./AddEventPage";

export default async function page() {
  // No data fetching needed for the add page itself
  return (
    <div className="h-full">
      <AddEventPage />
    </div>
  );
}
