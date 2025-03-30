"use client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  ThumbsUp,
  Clock,
  FileText,
  Image as ImageIcon,
  Music,
  Film,
  Folder,
  User,
  CircleUser,
} from "lucide-react";
import { FullResource } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import {
  CATEGORY_COLORS,
  CategoryColorIndex,
  ExtensionStylesIndex,
} from "@/lib/constants";
import { useParams } from "next/navigation";

interface ResourceCardProps {
  resource: FullResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const params = useParams();
  const resourceUrl = `/${params.locale}/media-library/${resource.id}`;

  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getCategoryColors = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    return (
      CATEGORY_COLORS[normalizedCategory as CategoryColorIndex] ||
      CATEGORY_COLORS.default
    );
  };

  // Helper function to get category icon
  const getCategoryIcon = () => {
    const category = resource.category.label.toLowerCase();
    const iconMap = {
      images: ImageIcon,
      vidéos: Film,
      audio: Music,
      texte: FileText,
      default: FileText,
    };

    const Icon = iconMap[category as CategoryColorIndex] || iconMap.default;
    return <Icon className="h-5 w-5" />;
  };

  // Duration formatting utility
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // File extension styling utility
  const getFileExtensionStyle = () => {
    const fileName = resource.path || resource.title;
    const extension = fileName.split(".").pop()?.toLowerCase() || "";

    const extensionStyles = {
      doc: { color: "bg-blue-500", text: "DOC", icon: "text-blue-500" },
      docx: { color: "bg-blue-500", text: "DOC", icon: "text-blue-500" },
      pdf: { color: "bg-red-500", text: "PDF", icon: "text-red-500" },
      txt: { color: "bg-gray-500", text: "TXT", icon: "text-gray-500" },
      ppt: { color: "bg-orange-500", text: "PPT", icon: "text-orange-500" },
      pptx: { color: "bg-orange-500", text: "PPT", icon: "text-orange-500" },
      xls: { color: "bg-green-500", text: "XLS", icon: "text-green-500" },
      xlsx: { color: "bg-green-500", text: "XLS", icon: "text-green-500" },
      default: {
        color: "bg-indigo-500",
        text: "FILE",
        icon: "text-indigo-500",
      },
    };

    return (
      extensionStyles[extension as ExtensionStylesIndex] ||
      extensionStyles.default
    );
  };

  useEffect(() => {
    const isVideo = resource.category.label.toLowerCase() === "vidéos";

    if (isVideo && resource.path && !videoThumbnail) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.crossOrigin = "anonymous";
      videoRef.current = video;

      video.onloadedmetadata = () => {
        if (video.duration && !isNaN(video.duration)) {
          setVideoDuration(video.duration);
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
            setVideoThumbnail(thumbnailUrl);
          }
        } catch (error) {
          console.error("Error generating thumbnail:", error);
        }
      };

      video.src = resource.path;
      video.onloadedmetadata = () => {
        if (video.duration && !isNaN(video.duration)) {
          setVideoDuration(video.duration);
          const seekPosition = Math.min(1, video.duration * 0.25);
          video.currentTime = seekPosition;
        }
      };

      return () => {
        video.onloadedmetadata = null;
        video.onseeked = null;
        video.src = "";
      };
    }
  }, [resource.category.label, resource.path, videoThumbnail]);

  // Audio duration extraction (unchanged)
  useEffect(() => {
    const isAudio = resource.category.label.toLowerCase() === "audio";

    if (isAudio && resource.path && !audioDuration) {
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setAudioDuration(audio.duration);
        }
      };

      audio.src = resource.path;

      return () => {
        audio.onloadedmetadata = null;
        audio.src = "";
      };
    }
  }, [resource.category.label, resource.path, audioDuration]);

  // Render preview content
  const renderPreview = () => {
    const category = resource.category.label.toLowerCase();
    const colors = getCategoryColors(category);

    switch (category) {
      case "images":
        return (
          <div className="border aspect-video rounded-md flex items-center justify-center text-white p-0 relative overflow-hidden">
            {resource.path ? (
              <Image
                src={resource.path}
                alt={resource.title}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${colors.gradient}`}
              >
                <div className="text-xs font-medium flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" /> Image
                </div>
              </div>
            )}
          </div>
        );

      case "vidéos":
        return (
          <div className="border aspect-video rounded-md flex items-center justify-center text-white relative overflow-hidden">
            {resource.path ? (
              <div className="w-full h-full relative">
                <Image
                  src={videoThumbnail || resource.path}
                  alt={resource.title}
                  layout="fill"
                  objectFit="cover"
                />

                {(videoDuration || 0) && (
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {videoDuration
                      ? formatDuration(videoDuration)
                      : typeof 0 === "number"
                      ? formatDuration(0)
                      : 0}
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${colors.gradient}`}
              >
                <div className="text-xs font-medium mt-auto absolute bottom-2 right-2">
                  {videoDuration ? formatDuration(videoDuration) : "Vidéo"}
                </div>
              </div>
            )}
          </div>
        );

      case "audio":
        return (
          <div
            className={`border aspect-video bg-gradient-to-tl ${colors.gradient} rounded-md flex items-center justify-center p-2 relative`}
          >
            <div className="flex items-center h-16 gap-1 w-10/12 justify-center">
              {Array.from({ length: 46 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-website-accent-1/70 w-1.5 rounded-t-full rounded-b-full"
                  style={{
                    height: `${Math.floor(Math.random() * 85) + 5}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1.8s",
                  }}
                ></div>
              ))}
            </div>
            <div className="text-xs font-medium text-white absolute bottom-2 flex items-center right-2 bg-black/40 px-2 py-0.5 rounded">
              <Clock className="h-3 w-3 mr-1" />
              {resource.path ? (
                <span>{formatDuration(audioDuration || 0)}</span>
              ) : (
                <span>Audio</span>
              )}
            </div>
          </div>
        );

      case "texte":
        const fileExtensionStyle = getFileExtensionStyle();
        return (
          <div
            className={`border aspect-video bg-gradient-to-tl ${colors.gradient} rounded-md flex items-center justify-center p-2 relative`}
          >
            <Folder className="h-12 w-12 text-website-accent-1/70 mr-2" />
            <p className="text-5xl text-website-accent-1/70 font-bold">
              {fileExtensionStyle.text}
            </p>
          </div>
        );

      default:
        return (
          <div
            className={`aspect-video bg-gradient-to-r ${colors.gradient} rounded-md flex items-center justify-center text-white`}
          >
            <FileText className="h-8 w-8" />
          </div>
        );
    }
  };

  const colors = getCategoryColors(resource.category.label);

  return (
    <Link href={resourceUrl}>
      <Card
        className={`text-website-text group h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border `}
      >
        <div className="p-3">
          {renderPreview()}

          <CardContent className="p-0 pt-3">
            <div className="flex items-start justify-between mb-2">
              <h3
                className="font-semibold line-clamp-1 pr-2"
                title={resource.title}
              >
                {resource.title}
              </h3>
              <div className={`${colors.icon}`}>{getCategoryIcon()}</div>
            </div>

            <p
              className="text-sm text-website-text/80 line-clamp-2 mb-3"
              title={resource.description}
            >
              {resource.description}
            </p>

            <div className="flex items-center justify-between">
              <Badge className={`${colors.badge} text-xs`}>
                {resource.type.label}
              </Badge>

              {resource.author && (
                <span
                  className="inline-flex items-center  gap-2 text-[14px] text-website-text/80 truncate"
                  title={`${resource.author.firstName} ${resource.author.lastName}`}
                >
                  {resource.author.firstName} {resource.author.lastName}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t border-website-primary/30 mt-3 pt-3 pb-1 text-sm text-website-text/80 flex justify-between">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {resource.publishedAt &&
                formatDistanceToNow(resource.publishedAt, { addSuffix: true })}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center">
                <Eye className="h-3.5 w-3.5 mr-1" />
                {Number(resource.views).toLocaleString()}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                {Number(resource.upvotes).toLocaleString()}
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
