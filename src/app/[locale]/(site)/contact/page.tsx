import ContactPage from "@/components/pages/contact/ContactPage";

import { getDictionary } from "@/lib/i18n";

export default async function Contact({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale);
  
  return (
    <div className="min-h-screen">
      
      <main>
      <ContactPage dictionary={dictionary} />
       
      </main>
    </div>
  );
}