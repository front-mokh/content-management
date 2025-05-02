// app/[locale]/events/page.tsx
import { getAllEvents } from "@/lib/services/eventService";
import EventsPage from "./events";
import { getDictionary } from "@/lib/i18n";

export default async function Events({
  params,
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const events = await getAllEvents();

  return (
    <div className="min-h-screen">
      <main>
        <EventsPage events={events} dictionary={dictionary} />
      </main>
    </div>
  );
}
