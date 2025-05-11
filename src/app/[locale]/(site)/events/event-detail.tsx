"use client";
import { Event, MediaType } from "@prisma/client";
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
  Type,
  FileText,
  Camera,
  Film,
  GlobeLock,
  Tag,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getApiPath = (path: string) => {
  if (!path) return null;
  const filename = path.split("/").pop();
  return `/api/uploads/media/${filename}`;
};

const getApiPath_pdf = (path: string) => {
  if (!path) return null;
  const filename = path.split("/").pop();
  return `/api/uploads/pdf/${filename}`;
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

export default function EventDetailPage({
  event,
  dictionary,
  locale,
}: {
  event: Event;
  dictionary: any;
  locale: string;
}) {
  const isVideo = event.type === MediaType.VIDEO;
  const mediaUrl = getApiPath(event.mediaPath);
  const pdfUrl = event.pdfPath ? getApiPath_pdf(event.pdfPath) : null;
  const pdfFilename = event.pdfPath ? event.pdfPath.split("/").pop() : null;
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
    backToEvents: dictionary.events.backToEvents || "Back to Events",
    aboutEvent: dictionary.events.aboutEvent || "About This Event",
    noDescription:
      dictionary.events.noDescription ||
      "No description available for this event.",
    eventDetails: dictionary.events.eventDetails || "Event Details",
    createdOn: dictionary.events.createdOn || "Created on",
    updatedOn: dictionary.events.updatedOn || "Updated on",
    contentType: dictionary.events.contentType || "Content Type",
    videoContent: dictionary.events.videoContent || "Video Content",
    imageContent: dictionary.events.imageContent || "Image Content",
    readFullDescription:
      dictionary.events.readFullDescription || "Read Full Description",
    joinCommunity: dictionary.events.joinCommunity || "Join Our Community",
    communityDescription:
      dictionary.events.communityDescription ||
      "Be part of our growing community and contribute to our cultural heritage",
    contributeButton: dictionary.events.contributeButton || "Contribute Now",
    contactButton: dictionary.events.contactButton || "Contact Us",
    category: dictionary.events.category || "Category",
    culturalEvent: dictionary.events.culturalEvent || "Cultural Event",
    viewFullImage: dictionary.events.viewFullImage || "View Full Image",
    postDate: dictionary.events.postedOn || "Posted on",
    eventLanguage: dictionary.events.eventLanguage || "Event Language",
    originalContent: dictionary.events.originalContent || "Original Content",
    // New PDF-related translations
    documentContent: dictionary.events.documentContent || "Document Content",
    downloadPdf: dictionary.events.downloadPdf || "Download PDF",
    viewPdf: dictionary.events.viewPdf || "View PDF",
    relatedDocument: dictionary.events.relatedDocument || "Related Document",
    noPdfAvailable: dictionary.events.noPdfAvailable || "No PDF available for this event",
    downloadDocument: dictionary.events.downloadDocument || "Download Document",
  };
  
  const handlePdfDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfFilename || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          href={`/${locale}/events`}
          className="inline-flex items-center text-website-primary hover:text-website-primary/80 font-medium transition-colors"
        >
          {isRTL ? (
            <>
              {translations.backToEvents}
              <ArrowLeft className="h-5 w-5 ml-2 transform rotate-180" />
            </>
          ) : (
            <>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {translations.backToEvents}
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
              {isVideo ? translations.videoContent : translations.imageContent}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                <time dateTime={event.createdAt.toISOString()}>
                  {format(new Date(event.createdAt), "MMMM d, yyyy", {
                    locale: dateLocale,
                  })}
                </time>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <Type className="h-4 w-4 mr-2" />
                <span>
                  {isVideo
                    ? translations.videoContent
                    : translations.imageContent}
                </span>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <Tag className="h-4 w-4 mr-2" />
                <span>{translations.culturalEvent}</span>
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
                  {isVideo ? (
                    <div className="aspect-video relative">
                      <video
                        src={mediaUrl}
                        controls
                        className="w-full h-full object-contain"
                        poster={`${mediaUrl
                          .split(".")
                          .slice(0, -1)
                          .join(".")}_poster.jpg`}
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-black/70 text-white py-1">
                          <Film className="h-3 w-3 mr-1" />{" "}
                          {translations.videoContent}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video relative bg-gray-100">
                      <Image
                        src={mediaUrl}
                        alt={event.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-black/70 text-white py-1">
                          <Camera className="h-3 w-3 mr-1" />{" "}
                          {translations.imageContent}
                        </Badge>
                      </div>
                    </div>
                  )}
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
                  {translations.aboutEvent}
                </h2>

                {event.description ? (
                  <div className="prose prose-lg prose-headings:text-website-primary prose-a:text-website-secondary max-w-none bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <p>{event.description}</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-gray-500 italic">
                    {translations.noDescription}
                  </div>
                )}
              </motion.div>
              {/* PDF Document Card (if available) */}
              {pdfUrl && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium flex items-center text-website-primary">
                        <FileText className="h-5 w-5 mr-2" />
                        {translations.relatedDocument}
                      </h3>
                      <Badge variant="outline" className="bg-website-primary/5">
                        PDF
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <div className="h-10 w-10 flex items-center justify-center bg-website-primary/10 text-website-primary rounded-lg mr-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="truncate max-w-[200px]">
                          <p className="font-medium text-gray-900 truncate">{pdfFilename}</p>
                          <p className="text-xs text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-website-secondary border-website-secondary hover:bg-website-secondary/10"
                          onClick={() => window.open(pdfUrl, '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {translations.viewPdf}
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-website-primary hover:bg-website-primary/90"
                          onClick={handlePdfDownload}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          {translations.downloadPdf}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

        
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
                    {translations.eventDetails}
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
                        {translations.postDate}
                      </span>
                      <span className="font-medium">
                        {format(new Date(event.createdAt), "PPP", {
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
                          new Date(event.updatedAt || event.createdAt),
                          "PPP",
                          { locale: dateLocale }
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Type
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.contentType}
                      </span>
                      <span className="font-medium">
                        {isVideo
                          ? translations.videoContent
                          : translations.imageContent}
                      </span>
                    </div>
                  </div>

                  {/* Document Status Section */}
                  <div className="flex items-start">
                    <FileText
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.documentContent}
                      </span>
                      {pdfUrl ? (
                        <div>
                          <span className="font-medium">PDF</span>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-website-primary font-medium" 
                            onClick={handlePdfDownload}
                          >
                            {translations.downloadDocument}
                            <Download className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">{translations.noPdfAvailable}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Tag
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.category}
                      </span>
                      <span className="font-medium">
                        {translations.culturalEvent}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <GlobeLock
                      className={`h-5 w-5 text-website-secondary mt-0.5 ${
                        isRTL ? "ml-4" : "mr-4"
                      } flex-shrink-0`}
                    />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {translations.eventLanguage}
                      </span>
                      <span className="font-medium">
                        {translations.originalContent}
                      </span>
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