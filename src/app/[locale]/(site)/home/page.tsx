

import Hero from "@/components/pages/home/Hero";
import Features from "@/components/pages/home/Features";
import CTA from "@/components/pages/home/CTA";
import LibraryPreview from "@/components/pages/home/LibraryPreview";
import Testimonials from "@/components/pages/home/Testimonials";

import { getDictionary } from "@/lib/i18n";
export default async function Home({ params }: { params: { locale: string } }) {
  const dictionary = await getDictionary(params.locale);
  
  return (
    <div className="min-h-screen">
      
      <main>
      <Hero dictionary={dictionary} />
        <Features dictionary={dictionary}  />
        <LibraryPreview dictionary={dictionary} />
     
        <CTA dictionary={dictionary}/>
        <Testimonials dictionary={dictionary}/>
      </main>
    </div>
  );
}