"use client";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ar, fr, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Info,
  Eye,
  RefreshCw,
  MapPin,
  Camera,
  Home,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getApiPath = (path: string) => {
  if (!path) return null;
  const filename = path.split("/").pop();
  return `/api/uploads/images/${filename}`;
};

const getDateLocale = (locale: string) => {
  switch (locale) {
    case "ar":
      return ar;
    case "fr":
      return fr;
    case "en":
    default:
      return enUS;
  }
};

interface Village {
  id: string;
  title: string;
  description?: string;
  mediaPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function VillageDetailPage({
  village,
  dictionary,
  locale,
}: {
  village: Village;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: string;
}) {
  const mediaUrl = getApiPath(village.mediaPath);
  const dateLocale = getDateLocale(locale);
  const isRTL = locale === "ar";

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

  const translations = {
    backToVillages: dictionary.villages.backToVillages || "Back to Villages",
    aboutVillage: dictionary.villages.aboutVillage || "About This Village",
    noDescription:
      dictionary.villages.noDescription ||
      "No description available for this village.",
    villageDetails: dictionary.villages.villageDetails || "Village Details",
    createdOn: dictionary.villages.createdOn || "Created on",
    updatedOn: dictionary.villages.updatedOn || "Updated on",
    summary: dictionary.villages.summary || "Summary",
    readFullDescription:
      dictionary.villages.readFullDescription || "Read Full Description",
    viewFullImage: dictionary.villages.viewFullImage || "View Full Image",
    postedOn: dictionary.villages.postedOn || "Posted on",
    type: dictionary.villages.type || "Village",
    contributeButton: dictionary.villages.contributeButton || "Contribute",
    contactButton: dictionary.villages.contactButton || "Contact Us",
    exploreVillage: "Explore Village",
    
   
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
          href={`/${locale}/villages`}
          className="inline-flex items-center text-website-primary hover:text-website-primary/80 font-medium transition-colors"
        >
          {isRTL ? (
            <>
              {translations.backToVillages}
              <ArrowLeft className="h-5 w-5 ml-2 transform rotate-180" />
            </>
          ) : (
            <>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {translations.backToVillages}
            </>
          )}
        </Link>
      </motion.div>

      {/* Hero Section */}
      <div className="bg-website-primary text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <MapPin className="h-3 w-3 mr-1" />
              {translations.type}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {village.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                <time dateTime={village.createdAt.toISOString()}>
                  {format(new Date(village.createdAt), "MMMM d, yyyy", {
                    locale: dateLocale,
                  })}
                </time>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <Home className="h-4 w-4 mr-2" />
                <span>{translations.type}</span>
              </div>
            
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area - Takes 2/3 of the grid */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Media Card */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Media Display with Badge Overlay */}
                <div className="relative">
                  <div className="aspect-video relative bg-gray-100">
                    <Image
                      src={mediaUrl}
                      alt={village.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-black/70 text-white py-1">
                        <Camera className="h-3 w-3 mr-1" />
                        {translations.type}
                      </Badge>
                    </div>
                    {/* Village overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>

              {/* Full Description Section */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-website-primary mb-6">
                  {translations.aboutVillage}
                </h2>

                {village.description ? (
                  <div className="prose prose-lg prose-headings:text-website-primary prose-a:text-website-secondary max-w-none bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <p className="text-gray-700 leading-relaxed">
                      {village.description}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-gray-500 italic">
                    {translations.noDescription}
                  </div>
                )}
              </motion.div>

              {/* Call to Action Section */}
             
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
                    <Info className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {translations.villageDetails}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Calendar
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.createdOn}
                      </span>
                      <span className="font-medium">
                        {format(new Date(village.createdAt), "PPP", {
                          locale: dateLocale,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <RefreshCw
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.updatedOn}
                      </span>
                      <span className="font-medium">
                        {format(
                          new Date(village.updatedAt || village.createdAt),
                          "PPP",
                          { locale: dateLocale }
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.summary}
                      </span>
                      <span className="font-medium">
                        {translations.type}
                      </span>
                    </div>
                  </div>

             
                  <div className="flex items-start">
                    <Camera
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">   {dictionary.villages.format}</span>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-website-primary font-medium"
                        onClick={() => window.open(mediaUrl, '_blank')}
                      >
                        {translations.viewFullImage}
                        <Eye className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

            
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}