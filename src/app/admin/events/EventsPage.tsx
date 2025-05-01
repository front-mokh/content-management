"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter, // Keep if you add pagination
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@prisma/client"; // Import the Event type
import React, { useState } from "react"; // Keep useState if adding filters/pagination
import EventsTable from "./EventsTable";
import AddButton from "@/components/custom/AddButton";
// Import pagination/filtering components if you add them later
// import CustomPagination from "@/components/custom/CustomPagination";
// import { useEventFiltering } from "@/hooks/use-event-filtering"; // You'd create this hook if needed

interface EventsPageProps {
  events: Event[];
}

export default function EventsPage({ events }: EventsPageProps) {
  // --- Add state/hooks for filtering/pagination if needed later ---
  // const {
  //   pageItems,
  //   currentPage,
  //   totalPages,
  //   handlePageChange,
  //   // ... other filtering/search states/functions
  // } = useEventFiltering(events, 10); // Example, create useEventFiltering hook

  // const [showFilters, setShowFilters] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Événements</CardTitle>
            <CardDescription>
              Gestion des événements (images et vidéos).
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {/* Add filter/reset buttons here if implementing filtering */}
            <AddButton label="Ajouter un événement" href="/admin/events/add" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add filter component section here if implementing filtering */}
        {/* {showFilters && <EventFilters ... />} */}

        {/* Add count display if implementing filtering */}
        {/* {isActive && <div>...</div>} */}

        {/* Pass events directly for now, or pageItems if paginating */}
        <EventsTable events={events} />
      </CardContent>
      {/* Add pagination footer if implementing pagination */}
      {/* {totalPages > 1 && (
        <CardFooter>
          <CustomPagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </CardFooter>
      )} */}
    </Card>
  );
}
