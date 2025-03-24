import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/pages/home/Hero";
import Features from "@/components/pages/home/Features";
import CTA from "@/components/pages/home/CTA";
import Footer from "@/components/layout/Footer";
import LibraryPreview from "@/components/pages/home/LibraryPreview";
import Testimonials from "@/components/pages/home/Testimonials";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <LibraryPreview />
     
        <CTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}