"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FullResource } from "@/lib/types";
import React from "react";
import ResourcesTable from "./ResourcesTable";
import AddButton from "@/components/custom/AddButton";
import { usePagination } from "@/hooks/use-pagination";
import CustomPagination from "@/components/custom/CustomPagination";

export default function PublishedResourcesPage({
  resources,
}: {
  resources: FullResource[];
}) {
  const { pageItems, currentPage, handlePageChange, totalPages } =
    usePagination(resources, 10);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Ressources Publiées</CardTitle>
            <CardDescription>
              Page de gestion des ressources publiées pour les visiteurs
            </CardDescription>
          </div>
          <AddButton
            label="Ajouter une ressource"
            href="/admin/resources/add"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ResourcesTable resources={pageItems} />
      </CardContent>
      <CardFooter>
        {totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </CardFooter>
    </Card>
  );
}
