"use client";
import { Event, MediaType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Clock,
  MapPin,
  Info,
  Eye,
  RefreshCw,
  Play,
  Type,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to get the API path for media
const getApiPath = (path: string) => {
  // Extract the filename from the original path
  const filename = path.split("/").pop();
  // Return the API path
  return `/api/uploads/${filename}`;
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

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <ArrowLeft className="h-5 w-5 mr-2" />
          {dictionary.events.backToEvents}
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
              {isVideo ? "Video" : "Image"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                <time dateTime={event.createdAt.toISOString()}>
                  {format(new Date(event.createdAt), "MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full">
                <Type className="h-4 w-4 mr-2" />
                <span>{isVideo ? "Video Content" : "Image Content"}</span>
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
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Media Display */}
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
                          <Play className="h-3 w-3 mr-1" /> Video
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
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-website-primary mb-6">
                    {dictionary.events.aboutEvent}
                  </h2>

                  {event.description ? (
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <p>{event.description}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      {dictionary.events.noDescription}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 px-6 md:px-8 py-4 flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Share2 className="h-4 w-4" />
                    {dictionary.events.shareEvent}
                  </Button>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{Math.floor(Math.random() * 1000)} views</span>
                  </div>
                </div>
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
              {/* Metadata Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg text-website-primary">
                    <Info className="h-5 w-5 mr-2" />
                    {dictionary.events.eventDetails || "Event Details"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-website-secondary mt-0.5 mr-3" />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {dictionary.events.createdOn || "Created on"}
                      </span>
                      <span className="font-medium">
                        {format(new Date(event.createdAt), "PPP")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <RefreshCw className="h-5 w-5 text-website-secondary mt-0.5 mr-3" />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {dictionary.events.updatedOn || "Updated on"}
                      </span>
                      <span className="font-medium">
                        {format(
                          new Date(event.updatedAt || event.createdAt),
                          "PPP"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Type className="h-5 w-5 text-website-secondary mt-0.5 mr-3" />
                    <div>
                      <span className="block text-sm text-gray-500">
                        {dictionary.events.contentType || "Content Type"}
                      </span>
                      <span className="font-medium">
                        {isVideo ? "Video" : "Image"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-website-primary/5 to-website-accent/5 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-website-primary mb-6">
            {dictionary.events.joinCommunity || "Join Our Community"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {dictionary.events.communityDescription ||
              "Be part of our growing community and contribute to our cultural heritage"}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}/contribution`}
              className="bg-website-accent hover:bg-website-accent/90 text-white px-6 py-3 rounded-lg font-medium inline-block shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {dictionary.events.contributeButton || "Contribute Now"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-website-secondary text-website-secondary hover:bg-website-secondary/10 px-6 py-3 rounded-lg font-medium inline-block transition-all duration-300 transform hover:-translate-y-1"
            >
              {dictionary.events.contactButton || "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
