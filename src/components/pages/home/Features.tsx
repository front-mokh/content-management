/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building, Globe, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function Features({ dictionary }: { dictionary: any }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();
  const locale = params.locale || "en";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/kabyle-pattern-light.svg')] bg-repeat opacity-5"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-blue-50 to-amber-50 p-8 md:p-12 rounded-2xl shadow-lg mb-16 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Building className="h-12 w-12 text-amber-500 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{dictionary.features.mission.title}</h2>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                {dictionary.features.mission.description}
              </p>
              
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center px-8 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 hover:shadow-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {dictionary.features.mission.learnMoreCTA}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:ml-3 transition-all duration-300" />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Mission Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {dictionary.features.cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden border border-gray-100"
              style={{ 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)"
              }}
            >
              {/* Card content */}
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors duration-300">
                  {index === 0 ? (
                    <Globe className="h-12 w-12 text-amber-500 group-hover:text-blue-600 transition-colors duration-300" />
                  ) : index === 1 ? (
                    <BookOpen className="h-12 w-12 text-amber-500 group-hover:text-blue-600 transition-colors duration-300" />
                  ) : (
                    <Users className="h-12 w-12 text-amber-500 group-hover:text-blue-600 transition-colors duration-300" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4 group-hover:text-amber-600 transition-colors duration-300">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 text-center">
                  {card.description}
                </p>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500 rotate-45 transform origin-top-right -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}