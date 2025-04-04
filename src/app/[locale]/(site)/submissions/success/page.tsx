
import SubmissionSuccessPage from "@/components/submission/successPage";

import { getDictionary } from "@/lib/i18n";

export default async function Success({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale);
  
  return (
    <div className="min-h-screen">
      
      <main>
      <SubmissionSuccessPage dictionary={dictionary} />
     
      </main>
    </div>
  );
}
