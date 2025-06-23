/* eslint-disable @typescript-eslint/no-explicit-any */
// app/terms-of-service/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TermsOfServicePage({ dictionary }: { dictionary: any }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
    
        {/* test */}
        <section className="relative bg-[url('/new_hero2.png')] bg-cover bg-center shadow-lg py-24 overflow-hidden">
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Animated Background Pattern */}
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
                {dictionary.termsOfService.heroTitle}
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500"></span>
                </span>{" "}
                <span className="text-amber-400">{dictionary.termsOfService.heroSubtitle}</span>
              </h1>
              <p className="text-xl text-blue-100">
              {dictionary.termsOfService.heroDescription}
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
        {/* Terms Content Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{dictionary.termsOfService.header}</h2>
                  <p className="text-gray-600">{dictionary.termsOfService.lastUpdated}</p>
                </div>

                <div className="space-y-10 text-gray-700">
                  {/* Introduction */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section1Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section1Text}
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section2Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section2Text}
                    </p>
                  </div>

                  {/* User Content */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section3Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section3Text}
                    </p>
                  </div>

                  {/* Acceptable Use */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section4Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section4Text}
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>{dictionary.termsOfService.section4ListItem1}</li>
                        <li>{dictionary.termsOfService.section4ListItem2}</li>
                        <li>{dictionary.termsOfService.section4ListItem3}</li>
                      </ul>
                    </p>
                  </div>

                  {/* Intellectual Property */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section5Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section5Text}
                    </p>
                  </div>

                  {/* Termination */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section6Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section6Text}
                    </p>
                  </div>

                  {/* Disclaimer of Warranties */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section7Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section7Text}
                    </p>
                  </div>

                  {/* Limitation of Liability */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section8Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section8Text}
                    </p>
                  </div>

                  {/* Changes to Terms */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section9Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section9Text}
                    </p>
                  </div>

                  {/* Governing Law */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section10Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section10Text}
                    </p>
                  </div>

                  {/* Contact Us */}
                  <div className="pb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{dictionary.termsOfService.section11Title}</h3>
                    <p className="leading-relaxed">
                      {dictionary.termsOfService.section11Text}{" "}
                      <a
                        href="mailto:contact@tamazight-treasures.org"
                        className="text-amber-600 hover:underline transition-colors duration-200"
                      >
                        {dictionary.termsOfService.contactEmail}
                      </a>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}