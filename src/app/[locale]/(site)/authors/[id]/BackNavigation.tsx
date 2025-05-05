"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackNavigation = ({ backLink, label, isRTL, variants }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="container mx-auto px-4 py-6"
    >
      <Link
        href={backLink}
        className="inline-flex items-center text-website-primary hover:text-website-primary/80 font-medium transition-colors"
      >
        {isRTL ? (
          <>
            {label}
            <ArrowLeft className="h-5 w-5 ml-2 transform rotate-180" />
          </>
        ) : (
          <>
            <ArrowLeft className="h-5 w-5 mr-2" />
            {label}
          </>
        )}
      </Link>
    </motion.div>
  );
};

export default BackNavigation;