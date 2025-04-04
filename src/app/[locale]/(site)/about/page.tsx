// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { Video, Archive, Upload } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  // Simple fade-in variants for consistent animation
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
                  About
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500"></span>
                </span>{" "}
                <span className="text-amber-400">Tamazight Treasures</span>
              </h1>
              <p className="text-xl text-blue-100">
                A passion project by two Kabyle students dedicated to preserving our cultural heritage through a digital archive.
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
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                We are two students from Kabylie, united by a shared passion for our cultural heritage. Growing up surrounded by the rich traditions, music, and stories of our people, we realized how much of this legacy was at risk of being lost. That's why we created Tamazight Treasures – a digital sanctuary where the essence of Kabyle culture can be preserved and shared with the world.
              </p>
            </div>

            {/* Team Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              {[
                {
                  name: "Sarah",
                  role: "Co-Founder & Cultural Researcher",
                  description: "Amina is a history enthusiast dedicated to documenting Kabyle traditions and stories.",
                  image: "/team-amina.jpg",
                },
                {
                  name: "Amine",
                  role: "Co-Founder & Tech Lead",
                  description: "Yanis brings technical expertise to build a robust platform for cultural preservation.",
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
                What We're Building
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our mission is to create a living archive of Kabyle culture, driven by these core initiatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Video className="h-12 w-12 text-amber-500" />,
                  title: "Multimedia Collection",
                  description: "Gathering videos, audio recordings, and images to showcase Kabyle traditions and history.",
                },
                {
                  icon: <Archive className="h-12 w-12 text-amber-500" />,
                  title: "Digital Preservation",
                  description: "Safeguarding our heritage in a secure, organized database for future generations.",
                },
                {
                  icon: <Upload className="h-12 w-12 text-amber-500" />,
                  title: "Community Contributions",
                  description: "Inviting Kabyles everywhere to share their stories and artifacts with us.",
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
                Join Our Mission
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                Help us preserve Kabyle heritage by contributing your stories, media, or simply exploring our database.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link href="/contribution">Contribute Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link href="/database">Explore Database</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}