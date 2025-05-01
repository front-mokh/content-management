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
import DeleteAction from "@/components/custom/DeleteAction";
import DeleteEventDialog from "./DeleteEventDialog"; // Create this component
import { FileDownloader } from "@/components/custom/FileDownloader"; // Reuse if applicable
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
            <TableHead className="w-[100px]">Média</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Chemin Fichier</TableHead>
            <TableHead>Date Création</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7} // Adjust colSpan based on number of columns
                className="text-muted-foreground text-center"
              >
                Aucun événement n'a été trouvé
              </TableCell>
            </TableRow>
          )}
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {/* Basic Preview */}
                {event.type === MediaType.IMAGE ? (
                  <Image
                    src={event.mediaPath} // Assuming mediaPath is a direct URL/path
                    alt={event.title}
                    width={60}
                    height={40}
                    className="object-cover rounded"
                    // Add error handling if the image source might be invalid
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-image.png"; // Provide a placeholder
                      (e.target as HTMLImageElement).alt = "Image non trouvée";
                    }}
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">Vidéo</span>
                  // Or add a generic video icon
                )}
              </TableCell>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                {event.description || "-"}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getMediaTypeLabel(event.type)}</Badge>
              </TableCell>
              <TableCell className="text-xs font-mono">
                {/* Optionally show download link */}
                <FileDownloader path={event.mediaPath} simple />{" "}
                {/* Add a 'simple' prop or similar to just show name/icon */}
                {/* Or just show the path: event.mediaPath */}
              </TableCell>
              <TableCell>{formatDate(event.createdAt)}</TableCell>
              <TableCell className="w-[100px] text-right">
                <div className="w-fit flex justify-end">
                  {/* UpdateAction will need edit page: /admin/events/[id]/edit */}
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
