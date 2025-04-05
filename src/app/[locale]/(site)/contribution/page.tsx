import ContributionPage from "@/components/pages/contribution/contributionPage";

import { getDictionary } from "@/lib/i18n";

export default async function Contribution({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale);
  
  return (
    <div className="min-h-screen">
      
      <main>
      <ContributionPage dictionary={dictionary} />
       
      </main>
    </div>
  );
}