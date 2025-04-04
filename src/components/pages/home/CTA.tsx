/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
const CTA = ({ dictionary }: { dictionary: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();
  const locale = params.locale || "en";


  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg overflow-hidden py-24">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('/pattern-kabyle.svg')] bg-repeat opacity-20 animate-pulse"></div>
        <svg className="h-full w-full" viewBox="0 0 800 800">
          <defs>
            <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#pattern)" />
        </svg>
      </div>
      
      {/* Floating circles decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-amber-500 opacity-10 animate-float-slow"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 15}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block relative">
              {dictionary.cta.titlePart1}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500 transform scale-x-0 origin-left animate-expand"></span>
            </span>{" "}
            <span className="text-amber-400">{dictionary.cta.titleHighlight}</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
          >
            {dictionary.cta.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              scale: isLoaded ? 1 : 0.9 
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
            
                 <Link href={`/${locale}/contribution`} className="flex items-center">
                <UploadCloud className="mr-2 h-5 w-5" />
                {dictionary.cta.buttonText}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600 rounded-full opacity-20 animate-float-slow"></div>
    </section>
  );
};

export default CTA;