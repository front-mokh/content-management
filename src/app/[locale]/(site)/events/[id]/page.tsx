// app/[locale]/events/[id]/page.tsx
import { getEventById } from "@/lib/services/eventService";
import EventDetailPage from "../event-detail";
import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function EventDetail({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main>
        <EventDetailPage
          event={event}
          dictionary={dictionary}
          locale={params.locale}
        />
      </main>
    </div>
  );
}
