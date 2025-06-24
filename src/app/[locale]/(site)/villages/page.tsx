// app/[locale]/events/page.tsx

import { getAllVillages } from "@/lib/services/vilageService";
import VillagesPage from "./VillagesPage";
import { getDictionary } from "@/lib/i18n";

export default async function Events({
  params,
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const villages = await getAllVillages();

  return (
    <div className="min-h-screen">
      <main>
        <VillagesPage villages={villages} dictionary={dictionary} />
      </main>
    </div>
  );
}
