import TableWrapper from "@/components/custom/TableWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FullResource } from "@/lib/types";
import React from "react";

export default function ResourcesTable({
  resources,
}: {
  resources: FullResource[];
}) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Fichier</TableHead>
            <TableHead>Statut</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell className="font-medium">
                {resource.description}
              </TableCell>
              <TableCell>{resource.category.label}</TableCell>
              <TableCell>{resource.type.label}</TableCell>
              <TableCell>
                {resource.author?.lastName.toUpperCase()}{" "}
                {resource.author?.firstName}
              </TableCell>
              <TableCell>{resource.path}</TableCell>
              <TableCell>{resource.status}</TableCell>
              <TableCell>
                <div className="space-x-2"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
