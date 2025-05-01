import { getAllEvents } from "@/lib/services";
import React from "react";
import EventsPage from "./EventsPage";

export default async function page() {
  // Add error handling if needed
  const events = await getAllEvents();

  return (
    <div className="h-full">
      <EventsPage events={events} />
    </div>
  );
}
