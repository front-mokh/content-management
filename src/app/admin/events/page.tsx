import { getAllEvents } from "@/lib/services/eventService";
import React from "react";
import EventsPage from "./EventsPage";

export default async function page() {
  // Add error handling if needed
  const events = await getAllEvents();
  console.log("events", events);

  return (
    <div className="h-full">
      <EventsPage events={events} />
    </div>
  );
}
