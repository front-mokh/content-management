
import Hero from "@/components/pages/home/Hero";
import Features from "@/components/pages/home/Features";
import CTA from "@/components/pages/home/CTA";
import LibraryPreview from "@/components/pages/home/LibraryPreview";
import Testimonials from "@/components/pages/home/Testimonials";
export default function Home() {
  return (
    <div className="min-h-screen">
      
      <main>
        <Hero />
        <Features />
        <LibraryPreview />
     
        <CTA />
        <Testimonials />
      </main>
    </div>
  );
}