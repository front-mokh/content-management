"use client";

import Image from "next/image";
import { format } from "date-fns";
import { enUS, fr, arSA } from "date-fns/locale";
import { Play, Calendar, Eye, Clock } from "lucide-react";
import { Event, MediaType } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

// Helper function to get the correct API path
const getApiPath = (path) => {
  // Extract the filename from the original path
  const filename = path.split("/").pop();
  // Return the API path
  return `/api/uploads/media/${filename}`;
};

interface EventCardProps {
  event: Event;
  className?: string;
  dictionary?: any; // Made dictionary optional
}

export function EventCard({
  event,
  className = "",
  dictionary,
}: EventCardProps) {
  const params = useParams();
  const locale = params.locale || "en";

  // Get the correct date locale based on the application locale
  const getDateLocale = () => {
    switch (locale) {
      case "fr":
        return fr;
      case "ar":
        return arSA;
      default:
        return enUS;
    }
  };

  const dateLocale = getDateLocale();

  const translations = {
    videoContent: "Video",
    imageContent: "Image",
    postedOn: "Posted on",
    viewDetails: "View Details",
  };

  const isVideo = event.type === MediaType.VIDEO;
  const formattedDate = format(
    new Date(event.updatedAt || event.createdAt),
    locale === "ar" ? "dd MMMM yyyy" : "d MMMM yyyy",
    { locale: dateLocale }
  );
  const [mediaUrl, setMediaUrl] = useState<string>(event.mediaPath);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<string>("00:00");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Process the path on component mount
  useEffect(() => {
    if (event.mediaPath) {
      const apiPath = getApiPath(event.mediaPath);
      setMediaUrl(apiPath);

      // If it's a video, try to get a thumbnail
      if (isVideo) {
        generateVideoThumbnail(apiPath);
      }
    }
  }, [event.mediaPath, isVideo]);

  // Generate video thumbnail and set duration
  const generateVideoThumbnail = (videoPath: string) => {
    if (!isVideo) return;

    const video = document.createElement("video");
    video.preload = "metadata";
    video.crossOrigin = "anonymous";
    videoRef.current = video;

    video.onloadedmetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        // Format duration to MM:SS
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        const formattedDuration = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setVideoDuration(formattedDuration);
      }
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL("image/jpeg");
          setThumbnailUrl(thumbnailUrl);
        }
      } catch (error) {
        console.error("Error generating thumbnail:", error);
      }
    };

    video.src = videoPath;
    video.onloadedmetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        // Format duration to MM:SS
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        const formattedDuration = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setVideoDuration(formattedDuration);

        // Seek to a position to generate thumbnail (25% of video)
        const seekPosition = Math.min(1, video.duration * 0.25);
        video.currentTime = seekPosition;
      }
    };
  };

  // Truncate description to show small portion followed by ...
  const truncateDescription = (text, maxLength = 80) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <Link href={`/${locale}/events/${event.id}`}>
      <Card
        className={`text-website-text group h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border ${className}`}
      >
        <div className="p-3">
          {/* Media Preview */}
          <div className="border aspect-video rounded-md flex items-center justify-center text-white p-0 relative overflow-hidden">
            {isVideo && thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={mediaUrl}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {isVideo && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-website-primary flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 ml-1" />
                </div>

                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-medium flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {videoDuration}
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-0 pt-3">
            <div className="flex items-start justify-between mb-2">
              <h3
                className="font-semibold line-clamp-1 pr-2"
                title={event.title}
              >
                {event.title}
              </h3>
              <Badge className="bg-website-primary/10 text-website-primary text-xs">
                {isVideo
                  ? dictionary?.events?.videoContent ||
                    translations.videoContent
                  : dictionary?.events?.imageContent ||
                    translations.imageContent}
              </Badge>
            </div>

            {event.description && (
              <p
                className="text-sm text-website-text/80 line-clamp-2 mb-3"
                title={event.description}
              >
                {truncateDescription(event.description)}
              </p>
            )}
          </CardContent>

          <CardFooter className="border-t border-website-primary/30 mt-3 pt-3 pb-1 text-sm text-website-text/80 flex justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {dictionary?.events?.postedOn || translations.postedOn}:{" "}
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span>
                  {dictionary?.events?.viewDetails || translations.viewDetails}
                </span>
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
