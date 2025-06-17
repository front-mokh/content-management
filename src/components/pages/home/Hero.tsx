/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Hero.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Hero({ dictionary }: { dictionary: any }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();
  const locale = params.locale || "en";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden bg-[url('/new_hero2.png')] bg-cover bg-center flex flex-col">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
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
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full bg-amber-500 opacity-10 animate-float-slow`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 15}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center flex-1"
        >
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: isLoaded ? 0 : -50, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="inline-block relative">
                {dictionary.hero.titlePart1}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500 transform scale-x-0 origin-left animate-expand"></span>
              </span>{" "}
              <span className="text-amber-400">{dictionary.hero.titleHighlight}</span> {dictionary.hero.titlePart2}
            </h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 lg:mt-6 text-base sm:text-lg md:text-xl text-blue-100"
            >
              {dictionary.hero.description}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 lg:mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button 
                size="lg" 
                className="bg-amber-400 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link href={`/${locale}/media-library`}>{dictionary.hero.exploreCTA}</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link href={`/${locale}/contribution`}>{dictionary.hero.contributeCTA}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: isLoaded ? 0 : 50, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative group">
              {/* Traditional Kabyle symbol */}
              {/* <div className="w-60 h-60 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center animate-float-slow">
                <div className="w-40 h-40 bg-[url('/kabyle-symbol.svg')] bg-contain bg-no-repeat bg-center"></div>
              </div> */}
              
              {/* Animated decorative elements */}
              {/* <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-600 rounded-full opacity-20 animate-float-slow"></div> */}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats section with animations */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: isLoaded ? 0 : 30, opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 lg:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {dictionary.hero.stats.map((stat: any, index: number) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 text-center hover:bg-white/15 transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-amber-400 text-lg lg:text-xl mb-2">{stat.icon}</div>
              <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-100 mt-1 text-sm lg:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scrolling indicator - moved outside content container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}