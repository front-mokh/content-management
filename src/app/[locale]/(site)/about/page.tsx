import AboutPage from "@/components/pages/about/about";

import { getDictionary } from "@/lib/i18n";

export default async function About({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale);
  
  return (
    <div className="min-h-screen">
      
      <main>
      <AboutPage dictionary={dictionary} />
       
      </main>
    </div>
  );
}