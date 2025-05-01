import { PrismaClient, Event } from "@prisma/client";

const prisma = new PrismaClient();

// ... other service functions ...

export async function getAllEvents(): Promise<Event[]> {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc", // Or however you want to order them
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    // Handle or throw the error appropriately
    throw new Error("Could not fetch events.");
  }
}

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
