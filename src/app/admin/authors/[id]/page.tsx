import React from "react";
import { notFound } from "next/navigation";
import ViewAuthorPage from "./ViewAuthorPage";
import { getAuthorById, getAuthorResources } from "@/lib/services/authorService";

export default async function Page({ params }: { params: { id: string } }) {
  const author = await getAuthorById(params.id);

  if (!author) {
    return notFound();
  }

  // Fetch the resources associated with this author
  const resources = await getAuthorResources(params.id);

  return (
    <div className="container mx-auto py-6">
      <ViewAuthorPage author={author} resources={resources} />
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const author = await getAuthorById(params.id);
  
  if (!author) {
    return {
      title: "Auteur non trouvé",
    };
  }
  
  return {
    title: `${author.firstName} ${author.lastName} | Détails de l'auteur`,
    description: author.description || `Informations sur l'auteur ${author.firstName} ${author.lastName}`,
  };
}