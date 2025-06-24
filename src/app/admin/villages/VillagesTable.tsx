import React from "react";
import { Village } from "@prisma/client";
import TableWrapper from "@/components/custom/TableWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import UpdateAction from "@/components/custom/UpdateAction";
import DeleteVillageDialog from "./DeleteVillageDialog";
import DeleteAction from "@/components/custom/DeleteAction";
import { FileDownloader } from "@/components/custom/FileDownloader_2";

export default function VillagesTable({ villages }: { villages: Village[] }) {
 

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>  
            <TableHead className=" text-center">Image</TableHead>
            <TableHead>Date Création</TableHead>
            <TableHead>Date de Modification</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {villages.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6} // Adjust colSpan based on number of columns
                className="text-muted-foreground text-center"
              >
                Aucun village n&apos;a été trouvé
              </TableCell>
            </TableRow>
          )}
          {villages.map((village) => (
            <TableRow key={village.id}>
              <TableCell className="font-medium">{village.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                {village.description || "-"}
              </TableCell>
          
              <TableCell className="text-xs font-mono">
                <FileDownloader path={village.mediaPath} />
              </TableCell>
         
              <TableCell>{formatDate(village.createdAt)}</TableCell>
              <TableCell>{formatDate(village.updatedAt)}</TableCell>
              <TableCell className="w-[100px] text-right">
                <div className="w-fit flex justify-end">
                  <UpdateAction href={`/admin/villages/${village.id}/edit`} />
                  <DeleteVillageDialog trigger={<DeleteAction />} village={village} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
