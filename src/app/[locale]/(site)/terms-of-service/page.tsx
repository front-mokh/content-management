import TermsOfServicePage from "@/components/pages/termsofservice/TermsOfServicePage";
import { getDictionary } from "@/lib/i18n";

export default async function TermsOfService({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale);
  
  return (
    <div className="min-h-screen">
      
      <main>
      <TermsOfServicePage dictionary={dictionary} />
       
      </main>
    </div>
  );
}