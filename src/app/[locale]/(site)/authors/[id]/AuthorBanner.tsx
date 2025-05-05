"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AuthorBanner = ({ 
  author, 
  formattedJoinDate, 
  resourcesCount, 
  translations, 
  isRTL 
}) => {
  return (
    <div className="bg-website-primary text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Author Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-xl"
          >
            <Image
              src={author.imagePath}
              alt={`${author.firstName} ${author.lastName}`}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </motion.div>
          
          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-center md:text-left"
          >
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              {translations.authorDetails}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {`${author.firstName} ${author.lastName}`}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90">
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <CalendarDays className="h-4 w-4 mr-2" />
                <time dateTime={author.createdAt.toString()}>
                  {translations.joinedOn}: {formattedJoinDate}
                </time>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>
                  {resourcesCount} {translations.resourcesCount}
                </span>
              </div>
              {author.location && (
                <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{author.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBanner;