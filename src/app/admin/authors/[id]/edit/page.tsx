import React from "react";
import { notFound } from "next/navigation";
import UpdateAuthorPage from "./UpdateAuthorPage";
import { getAuthorById } from "@/lib/services/authorService";

export default async function Page({ params }: { params: { id: string } }) {
  const author = await getAuthorById(params.id);

  if (!author) {
    return notFound();
  }

  return (
    <div className="h-full">
      <UpdateAuthorPage author={author} />
    </div>
  );
}
