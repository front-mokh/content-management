import { getAllAuthors } from "@/lib/services";
import React from "react";
import AuthorsPage from "./AuthorsPage";

export default async function page() {
  const authors = await getAllAuthors();
  return (
    <div className="h-full">
      <AuthorsPage authors={authors} />
    </div>
  );
}