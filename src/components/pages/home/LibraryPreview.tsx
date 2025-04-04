/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import {
  Film,
  Image,
  Music,
  FileText,
  ArrowRight,
  ChevronRight
} from 'lucide-react';  
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useParams } from "next/navigation";

const CategoryCard = ({ icon: Icon, title, description, count }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
    >
      <div className={`
        bg-white 
        rounded-2xl 
        shadow-lg 
        border 
        border-gray-200
        overflow-hidden 
        transition-all 
        duration-300 
        relative 
        z-10
        hover:shadow-xl
      `}>
        <div className="p-6 flex items-center border-b border-gray-100">
          <div className={`
            bg-blue-50 
            rounded-full 
            p-4 
            mr-5 
            transition-all 
            duration-500 
            group-hover:rotate-[360deg]
          `}>
            <Icon className="h-9 w-9 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 tracking-tight">{title}</h3>
          </div>
        </div>
        <div className="p-6 pt-4 bg-gray-50/50">
          <p className="text-gray-600 mb-4 text-base leading-relaxed">{description}</p>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                {count} {' '} {count === 1 ? 'Resource Available' : 'Resources Available'}
              </span>
              <motion.div
                animate={{ 
                  x: isHovered ? 5 : 0,
                  transition: { duration: 0.2 }
                }}
              >
                <ChevronRight 
                  className={`
                    h-6 w-6 
                    ${isHovered ? 'text-amber-500' : 'text-blue-600'} 
                    opacity-70 
                    group-hover:opacity-100 
                    transition-all 
                    duration-300
                  `}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const LibraryPreview = ({ dictionary }: { dictionary: any }) => {
  const params = useParams();
  const locale = params.locale || "en";
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            <span className="text-blue-600">{dictionary.libraryPreview.titlePart1}</span> 
            <span className="text-amber-500"> {dictionary.libraryPreview.titlePart2}</span> {dictionary.libraryPreview.titlePart3}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {dictionary.libraryPreview.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {dictionary.libraryPreview.categories.map((category, index) => {
            // Map the icon based on the category type
            let IconComponent;
            switch (index) {
              case 0:
                IconComponent = Film;
                break;
              case 1:
                IconComponent = Image;
                break;
              case 2:
                IconComponent = Music;
                break;
              case 3:
                IconComponent = FileText;
                break;
              default:
                IconComponent = FileText;
            }
            
            return (
              <CategoryCard
                key={index}
                icon={IconComponent}
                title={category.title}
                description={category.description}
                count={category.count}
              />
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Link  href={`/${locale}/media-library`} className="flex items-center">
              {dictionary.libraryPreview.browseCTA}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LibraryPreview;