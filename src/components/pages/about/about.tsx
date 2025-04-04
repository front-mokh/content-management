/* eslint-disable @typescript-eslint/no-explicit-any */
// app/about/page.tsx
"use client";
import { motion } from "framer-motion";
import { Video, Archive, Upload } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default  function AboutPage({ dictionary }: { dictionary: any }) {
 
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-[url('/pattern-kabyle.svg')] bg-repeat opacity-20 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="inline-block relative">
                {dictionary.about.heroTitle}
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500"></span>
                </span>{" "}
                <span className="text-amber-400">{dictionary.about.heroSubtitle}</span>
              </h1>
              <p className="text-xl text-blue-100">
              {dictionary.about.heroDescription}
              </p>
            </motion.div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-amber-500 opacity-10"
                style={{
                  width: `${Math.random() * 80 + 40}px`,
                  height: `${Math.random() * 80 + 40}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 20 + 15}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {dictionary.about.storyTitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
              {dictionary.about.storyDescription} 
               </p>
            </div>

            {/* Team Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              {[
                {
                    name: dictionary.about.teamMember1Name,
                    role: dictionary.about.teamMember1Role,
                    description: dictionary.about.teamMember1Description,
                    image: "/team-amina.jpg",
                },
                {
                    name: dictionary.about.teamMember2Name,
                    role: dictionary.about.teamMember2Role,
                    description: dictionary.about.teamMember2Description,
                    image: "/team-yanis.jpg",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-amber-400 rounded-full blur-sm opacity-75"></div>
                    <div className="relative w-full h-full bg-gray-200 rounded-full overflow-hidden">
                      {/* Placeholder for team image */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <span className="text-gray-600">{member.name[0]}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center">{member.name}</h3>
                  <p className="text-amber-600 text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission Section - Updated */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dictionary.about.missionTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dictionary.about.missionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
               {
                icon: <Video className="h-12 w-12 text-amber-500" />,
                title: dictionary.about.initiative1Title,
                description: dictionary.about.initiative1Description,
              },
              {
                icon: <Archive className="h-12 w-12 text-amber-500" />,
                title: dictionary.about.initiative2Title,
                description: dictionary.about.initiative2Description,
              },
              {
                icon: <Upload className="h-12 w-12 text-amber-500" />,
                title: dictionary.about.initiative3Title,
                description: dictionary.about.initiative3Description,
              },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-amber-50 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {dictionary.about.ctaTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              {dictionary.about.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                   <Link href="/contribution">{dictionary.about.contributeButton}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                     <Link href="/database">{dictionary.about.exploreButton}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}