import { getAllTypes } from "@/lib/services";
import React from "react";
import TypesPage from "./TypePage";

export default async function page() {
  const types = await getAllTypes();
  return (
    <div className="h-full">
      <TypesPage types={types} />
    </div>
  );
}
