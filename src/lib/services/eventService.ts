// lib/services/eventService.ts
import { PrismaClient, Event, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetches all events, ordered by creation date descending.
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Could not fetch events.");
  }
}

/**
 * Fetches a single event by its ID.
 */
export async function getEventById(id: string): Promise<Event | null> {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    return event;
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    throw new Error("Could not fetch event.");
  }
}

// --- Placeholders or simplified versions ---
// Note: Prefer using server actions for create/update/delete
//       to handle file operations and revalidation together.

/**
 * Creates a new event record in the database.
 * WARNING: This does NOT handle file uploads or revalidation.
 * Prefer using the 'createEventWithFile' server action.
 */
export async function createEvent(
  data: Prisma.EventCreateInput
): Promise<Event> {
  try {
    const event = await prisma.event.create({ data });
    console.warn(
      "createEvent service used. Consider using createEventWithFile server action for file handling & revalidation."
    );
    return event;
  } catch (error) {
    console.error("Error creating event record:", error);
    throw new Error("Could not create event record.");
  }
}

/**
 * Updates an event record in the database.
 * WARNING: This does NOT handle file uploads/updates or revalidation.
 * Prefer using an 'updateEventWithFile' server action (to be created).
 */
export async function updateEvent(
  id: string,
  data: Prisma.EventUpdateInput
): Promise<Event> {
  try {
    const event = await prisma.event.update({ where: { id }, data });
    console.warn(
      "updateEvent service used. Consider using an updateEventWithFile server action for file handling & revalidation."
    );
    return event;
  } catch (error) {
    console.error(`Error updating event record ${id}:`, error);
    throw new Error("Could not update event record.");
  }
}

/**
 * Deletes an event record from the database.
 * WARNING: This does NOT handle file deletion or revalidation.
 * Prefer using the 'deleteEvent' server action.
 */
export async function deleteEventRecord(id: string): Promise<Event> {
  try {
    const event = await prisma.event.delete({ where: { id } });
    console.warn(
      "deleteEventRecord service used. Consider using deleteEvent server action for file deletion & revalidation."
    );
    return event;
  } catch (error) {
    console.error(`Error deleting event record ${id}:`, error);
    throw new Error("Could not delete event record.");
  }
}
