// app/[locale]/villages/[id]/page.tsx
import { getVillageById } from "@/lib/services/vilageService";
import VillageDetailPage from "./VillageDetailPage";
import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function VillageDetail({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const village = await getVillageById(params.id);

  if (!village) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main>
        <VillageDetailPage
          village={village}
          dictionary={dictionary}
          locale={params.locale}
        />
      </main>
    </div>
  );
}