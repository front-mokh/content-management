"use client";

import { motion } from "framer-motion";

const AuthorAboutSection = ({ author, translations, variants }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold text-website-primary mb-6">
        {translations.aboutAuthor}
      </h2>

      {author.description ? (
        <div className="prose prose-lg prose-headings:text-website-primary prose-a:text-website-secondary max-w-none bg-white rounded-xl shadow-sm p-6 md:p-8">
          <p>{author.description}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-gray-500 italic">
          {translations.noDescription}
        </div>
      )}
    </motion.div>
  );
};

export default AuthorAboutSection;