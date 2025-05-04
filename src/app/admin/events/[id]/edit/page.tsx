// app/admin/events/[id]/edit/page.tsx
import { getEventById } from "@/lib/services/eventService";
import { notFound } from "next/navigation";
import React from "react";
import UpdateEventPage from "./UpdateEventPage";
import { MediaType } from "@prisma/client";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = params.id;
  const event = await getEventById(eventId);

  if (!event) {
    return notFound();
  }

  return (
    <div className="h-full">
      <UpdateEventPage event={event} />
    </div>
  );
}
