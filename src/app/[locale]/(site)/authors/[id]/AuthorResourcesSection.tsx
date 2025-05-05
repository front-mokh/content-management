"use client";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import the ResourceCard with no SSR
const ResourceCard = dynamic(() => import("./ResourceCard"), { ssr: false });

const AuthorResourcesSection = ({ resources, translations, variants }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="mt-8 space-y-8"
    >
      <h2 className="text-2xl font-bold text-website-primary mb-6">
        {translations.authorResources}
      </h2>
      {resources.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center text-gray-500">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">{translations.noResources}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AuthorResourcesSection;