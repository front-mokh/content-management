/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Hero.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero({ dictionary }: { dictionary: any }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: isLoaded ? 0 : -50, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
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
              className="mt-6 text-lg md:text-xl text-blue-100"
            >
              {dictionary.hero.description}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button 
                size="lg" 
                className="bg-amber-400 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                {dictionary.hero.exploreCTA}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                {dictionary.hero.contributeCTA}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: isLoaded ? 0 : 50, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <div className="relative bg-white p-2 rounded-lg shadow-2xl overflow-hidden">
                <div className="aspect-video rounded overflow-hidden bg-gray-100">
                <div className="w-full h-full bg-[url('/kabyle_image.png')] bg-cover bg-center flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-semibold px-4 py-2 rounded-full bg-blue-900/70 backdrop-blur-sm">
                        {dictionary.hero.imageCaption}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600 rounded-full opacity-20 animate-float-slow"></div>
              
              {/* Traditional Kabyle symbol overlay */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-[url('/kabyle-symbol.svg')] bg-contain bg-no-repeat bg-center"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats section with animations */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: isLoaded ? 0 : 30, opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {dictionary.hero.stats.map((stat: any, index: number) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-amber-400 text-xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-100 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Scrolling indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
    </div>
  );
}