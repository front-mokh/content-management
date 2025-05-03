import React from "react";
import AddAuthorPage from "./AddAuthorPage";

export default async function Page() {
  // No data fetching needed for the add page itself
  return (
    <div className="h-full">
      <AddAuthorPage />
    </div>
  );
}
