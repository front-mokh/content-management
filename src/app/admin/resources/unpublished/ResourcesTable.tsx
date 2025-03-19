import { FileDownloader } from "@/components/custom/FileDownloader";
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
import { formatDate } from "@/lib/utils";
import React from "react";
import PublishResourceAction from "./PublishResourceAction";
import ViewAction from "@/components/custom/ViewAction";
import UpdateAction from "@/components/custom/UpdateAction";
import DeleteResourceDialog from "@/components/custom/DeleteResourceDialog";
import DeleteAction from "@/components/custom/DeleteAction";

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
            <TableHead className="text-center">Fichier</TableHead>

            <TableHead>Date de création</TableHead>

            <TableHead className="w-[160px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-muted-foreground text-center"
              >
                Aucune ressource n&apos;a été trouvée
              </TableCell>
            </TableRow>
          )}
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell className="font-medium">
                {resource.description}
              </TableCell>
              <TableCell>{resource.category.label}</TableCell>
              <TableCell>{resource.type.label}</TableCell>
              <TableCell>
                {resource.author ? (
                  resource.author?.lastName.toUpperCase() +
                  " " +
                  resource.author?.firstName
                ) : (
                  <span className="text-muted-foreground">Non renseigné</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <FileDownloader path={resource.path} />
              </TableCell>

              <TableCell>{formatDate(resource.createdAt)}</TableCell>
              <TableCell className="text-right w-[160px]">
                <div className="w-fit flex">
                  <PublishResourceAction resource={resource} />
                  <ViewAction href={`/admin/resources/${resource.id}`} />
                  <UpdateAction href={`/admin/resources/${resource.id}/edit`} />
                  <DeleteResourceDialog
                    trigger={<DeleteAction />}
                    resource={resource}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
