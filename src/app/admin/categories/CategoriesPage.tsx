"use client";
import AddCategoryDialog from "@/components/custom/AddCategoryDialog";
import { Category } from "@prisma/client";
import React from "react";
import CategoriesTable from "./CategoriesTable";
import Page from "@/components/custom/Page";

export default function CategoriesPage({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Page
      title="Gestion des Catégories"
      description="Créer, modifier et gérer les catégorie"
      backButtonHref="" 
      actions={<AddCategoryDialog />}
    >
      <CategoriesTable categories={categories} />
    </Page>
  );
}