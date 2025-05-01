import React from "react";
import { Event, MediaType } from "@prisma/client";
import TableWrapper from "@/components/custom/TableWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // For displaying type nicely
import { formatDate } from "@/lib/utils";
import UpdateAction from "@/components/custom/UpdateAction";
import DeleteEventDialog from "./DeleteEventDialog";
import DeleteAction from "@/components/custom/DeleteAction";

import { FileDownloader } from "@/components/custom/FileDownloader";
import Image from "next/image"; // For image previews

export default function EventsTable({ events }: { events: Event[] }) {
  const getMediaTypeLabel = (type: MediaType) => {
    switch (type) {
      case MediaType.IMAGE:
        return "Image";
      case MediaType.VIDEO:
        return "Vidéo";
      default:
        return "Inconnu";
    }
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className=" text-center">Chemin Fichier</TableHead>
            <TableHead>Date Création</TableHead>
            <TableHead>Date de Modification</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6} // Adjust colSpan based on number of columns
                className="text-muted-foreground text-center"
              >
                Aucun événement n'a été trouvé
              </TableCell>
            </TableRow>
          )}
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                {event.description || "-"}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getMediaTypeLabel(event.type)}</Badge>
              </TableCell>
              <TableCell className="text-xs font-mono">
                <FileDownloader path={event.mediaPath} />
              </TableCell>
              <TableCell>{formatDate(event.createdAt)}</TableCell>
              <TableCell>{formatDate(event.updatedAt)}</TableCell>
              <TableCell className="w-[100px] text-right">
                <div className="w-fit flex justify-end">
                  <UpdateAction href={`/admin/events/${event.id}/edit`} />
                  <DeleteEventDialog trigger={<DeleteAction />} event={event} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
