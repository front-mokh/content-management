"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { enUS, fr, arSA } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  UserCheck,
  Mail,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Globe,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";

// Helper function to get the correct API path for author images
const getApiPath = (path) => {
  if (!path) return "/placeholder-author.jpg";
  // Extract the filename from the original path
  const filename = path.split("/").pop();
  // Return the API path
  return `/api/uploads/authors/${filename}`;
};

// Helper function to get the date locale
const getDateLocale = (locale: string) => {
  switch (locale) {
    case "ar":
      return arSA;
    case "fr":
      return fr;
    case "en":
    default:
      return enUS;
  }
};

export default function AuthorDetailPage({
  author,
  resources,
  dictionary,
  locale,
}: {
  author: any;
  resources: any[];
  dictionary: any;
  locale: string;
}) {
  const dateLocale = getDateLocale(locale);
  const isRTL = locale === "ar";
  
  // Format dates
  const formattedJoinDate = format(
    new Date(author.createdAt),
    isRTL ? "dd MMMM yyyy" : "d MMMM yyyy",
    { locale: dateLocale }
  );

  const translations = {
    backToAuthors: dictionary.authors?.backToAuthors || "Back to Authors",
    aboutAuthor: dictionary.authors?.aboutAuthor || "About This Author",
    noDescription: dictionary.authors?.noDescription || "No description available for this author.",
    authorDetails: dictionary.authors?.authorDetails || "Author Details",
    createdOn: dictionary.authors?.createdOn || "Created on",
    updatedOn: dictionary.authors?.updatedOn || "Updated on",
    resourcesCount: dictionary.authors?.resourcesCount || "Resources Count",
    authorResources: dictionary.authors?.authorResources || "Author Resources",
    noResources: dictionary.authors?.noResources || "No resources available from this author yet.",
    readMore: dictionary.authors?.readMore || "Read More",
    joinCommunity: dictionary.authors?.joinCommunity || "Join Our Community",
    communityDescription: dictionary.authors?.communityDescription || "Be part of our growing community and contribute to our cultural heritage",
    contributeButton: dictionary.authors?.contributeButton || "Contribute Now",
    contactButton: dictionary.authors?.contactButton || "Contact Us",
    joinedOn: dictionary.authors?.joinedOn || "Joined on",
    email: dictionary.authors?.email || "Email",
    website: dictionary.authors?.website || "Website",
    location: dictionary.authors?.location || "Location",
    viewResource: dictionary.authors?.viewResource || "View Resource",
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (  
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      {/* Back Navigation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideIn}
        className="container mx-auto px-4 py-6"
      >
        <Link
          href={`/${locale}/authors`}
          className="inline-flex items-center text-website-primary hover:text-website-primary/80 font-medium transition-colors"
        >
          {isRTL ? (
            <>
              {translations.backToAuthors}
              <ArrowLeft className="h-5 w-5 ml-2 transform rotate-180" />
            </>
          ) : (
            <>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {translations.backToAuthors}
            </>
          )}
        </Link>
      </motion.div>

      {/* Hero Section */}
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
                src={author.imagePath ? getApiPath(author.imagePath) : "/placeholder-author.jpg"}
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
                    {resources.length} {translations.resourcesCount}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* About Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content Area - Takes 2/3 of the grid */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
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
            </div>

            {/* Sidebar - Takes 1/3 of the grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Enhanced Metadata Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg text-website-primary">
                    <UserCheck className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {translations.authorDetails}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <CalendarDays
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.joinedOn}
                      </span>
                      <span className="font-medium">
                        {formattedJoinDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <BookOpen
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.resourcesCount}
                      </span>
                      <span className="font-medium">
                        {resources.length}
                      </span>
                    </div>
                  </div>

                  {author.location && (
                    <div className="flex items-start">
                      <MapPin
                        className={`h-5 w-5 text-website-secondary mt-0.5 ${
                          isRTL ? "ml-4" : "mr-4"
                        } flex-shrink-0`}
                      />
                      <div>
                        <span className="block text-sm text-gray-500">
                          {translations.location}
                        </span>
                        <span className="font-medium">
                          {author.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {author.email && (
                    <div className="flex items-start">
                      <Mail
                        className={`h-5 w-5 text-website-secondary mt-0.5 ${
                          isRTL ? "ml-4" : "mr-4"
                        } flex-shrink-0`}
                      />
                      <div>
                        <span className="block text-sm text-gray-500">
                          {translations.email}
                        </span>
                        <a 
                          href={`mailto:${author.email}`} 
                          className="font-medium text-website-primary hover:underline"
                        >
                          {author.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {author.website && (
                    <div className="flex items-start">
                      <Globe
                        className={`h-5 w-5 text-website-secondary mt-0.5 ${
                          isRTL ? "ml-4" : "mr-4"
                        } flex-shrink-0`}
                      />
                      <div>
                        <span className="block text-sm text-gray-500">
                          {translations.website}
                        </span>
                        <a 
                          href={author.website}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="font-medium text-website-primary hover:underline flex items-center"
                        >
                          {author.website}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Resources Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
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
                    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">
                          {resource.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="bg-website-primary/10 text-website-primary">
                            {resource.type}
                          </Badge>
                          {resource.category && (
                            <Badge variant="outline" className="bg-website-secondary/10 text-website-secondary">
                              {resource.category}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        {resource.description && (
                          <p className="text-gray-600 line-clamp-3 mb-4">
                            {resource.description}
                          </p>
                        )}
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          <time dateTime={resource.createdAt?.toString()}>
                            {format(
                              new Date(resource.createdAt),
                              "MMMM d, yyyy",
                              { locale: dateLocale }
                            )}
                          </time>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={`/${locale}/resources/${resource.id}`}
                          className="w-full"
                        >
                          <Button variant="default" className="w-full">
                            {translations.viewResource}
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-website-primary/5 to-website-accent/5 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-website-primary mb-6">
            {translations.joinCommunity}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {translations.communityDescription}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}/contribution`}
              className="bg-website-accent hover:bg-website-accent/90 text-white px-6 py-3 rounded-lg font-medium inline-block shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {translations.contributeButton}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-website-secondary text-website-secondary hover:bg-website-secondary/10 px-6 py-3 rounded-lg font-medium inline-block transition-all duration-300 transform hover:-translate-y-1"
            >
              {translations.contactButton}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}