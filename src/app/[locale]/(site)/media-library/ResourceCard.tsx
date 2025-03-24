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
  Play,
  ArrowUpRight,
} from "lucide-react";
import { FullResource } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface ResourceCardProps {
  resource: FullResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const resourceUrl = `/media-library/${resource.category.label.toLowerCase()}/${
    resource.id
  }`;

  // State for generated thumbnail and calculated duration
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to calculate audio duration
  const calculateAudioDuration = () => {
    return audioDuration;
  };

  // Extract thumbnail and duration from video file when resource is a video
  useEffect(() => {
    const isVideo = resource.category.label.toLowerCase() === "vidéos";

    if (isVideo && resource.path && !videoThumbnail) {
      // Create a video element to load the video and extract info
      const video = document.createElement("video");
      video.preload = "metadata";
      video.crossOrigin = "anonymous";
      videoRef.current = video;

      // Set up event listeners
      video.onloadedmetadata = () => {
        // Get duration in seconds
        if (video.duration && !isNaN(video.duration)) {
          setVideoDuration(video.duration);
        }
      };

      // Generate thumbnail at 1 second mark
      video.onseeked = () => {
        try {
          // Create a canvas to extract the frame
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            // Draw the current frame to the canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            // Convert canvas to data URL for the thumbnail
            const thumbnailUrl = canvas.toDataURL("image/jpeg");
            setVideoThumbnail(thumbnailUrl);
          }
        } catch (error) {
          console.error("Error generating thumbnail:", error);
        }
      };

      // Load the video
      video.src = resource.path;
      // Seek to 1 second or 25% of video duration (when metadata is loaded)
      video.onloadedmetadata = () => {
        if (video.duration && !isNaN(video.duration)) {
          setVideoDuration(video.duration);
          const seekPosition = Math.min(1, video.duration * 0.25);
          video.currentTime = seekPosition;
        }
      };

      // Clean up
      return () => {
        video.onloadedmetadata = null;
        video.onseeked = null;
        video.src = "";
      };
    }
  }, [resource.category.label, resource.path, videoThumbnail]);

  // Extract duration from audio file when resource is an audio
  useEffect(() => {
    const isAudio = resource.category.label.toLowerCase() === "audio";

    if (isAudio && resource.path && !audioDuration) {
      // Create an audio element to load the file and extract info
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;

      // Set up event listener
      audio.onloadedmetadata = () => {
        // Get duration in seconds
        if (audio.duration && !isNaN(audio.duration)) {
          setAudioDuration(audio.duration);
        }
      };

      // Load the audio
      audio.src = resource.path;

      // Clean up
      return () => {
        audio.onloadedmetadata = null;
        audio.src = "";
      };
    }
  }, [resource.category.label, resource.path, audioDuration]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Get appropriate icon based on resource category
  const getCategoryIcon = () => {
    const category = resource.category.label.toLowerCase();
    switch (category) {
      case "images":
        return <ImageIcon className="h-5 w-5" />;
      case "vidéos":
        return <Film className="h-5 w-5" />;
      case "audio":
        return <Music className="h-5 w-5" />;
      case "texts":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Generate preview content based on resource type
  const renderPreview = () => {
    const category = resource.category.label.toLowerCase();

    switch (category) {
      case "images":
        // For images, show the actual image if available
        return (
          <div className="aspect-video rounded-md flex items-center justify-center text-white p-0 relative overflow-hidden">
            {resource.path ? (
              <div className="w-full h-full relative">
                <Image
                  src={resource.path}
                  alt={resource.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="text-xs font-medium flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" /> Image
                </div>
              </div>
            )}
          </div>
        );

      case "vidéos":
        // For videos, show the video thumbnail with duration overlay and play button
        return (
          <div className="aspect-video rounded-md flex items-center justify-center text-white relative overflow-hidden">
            {resource.path ? (
              <div className="w-full h-full relative">
                {/* Video thumbnail - use generated thumbnail if available, otherwise use path as fallback */}
                <Image
                  src={videoThumbnail || resource.path}
                  alt={resource.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  {/* Play button */}
                </div>

                {/* Video duration badge - use calculated duration if available, otherwise use resource.duration */}
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

                {/* Video indicator badge */}
                <div className="absolute top-2 left-2 bg-red-500/90 px-2 py-0.5 rounded text-xs font-medium flex items-center">
                  <Film className="h-3 w-3 mr-1" />
                  Vidéo
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <Play className="h-6 w-6 ml-1 text-white" fill="white" />
                  </div>
                </div>
                <div className="text-xs font-medium mt-auto absolute bottom-2 right-2">
                  {videoDuration
                    ? formatDuration(videoDuration)
                    : resource.duration
                    ? typeof resource.duration === "number"
                      ? formatDuration(resource.duration)
                      : resource.duration
                    : "Vidéo"}
                </div>
              </div>
            )}
          </div>
        );

      case "audio":
        // For audio, show a waveform style preview with centered bars
        return (
          <div className="aspect-video bg-gradient-to-tl from-website-secondary/85 to-website-secondary/90 rounded-md flex items-center justify-center p-2 relative">
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
            <div className="text-xs font-medium text-white absolute bottom-2  flex items-center right-2 bg-black/40 px-2 py-0.5 rounded">
              <Clock className="h-3 w-3 mr-1" />
              {resource.path && !resource.duration ? (
                  <span>{formatDuration(audioDuration || 0)}</span>
              ) : (
                // Calculate duration for audio files similar to how you did for video
                <span>
                  {resource.duration
                    ? typeof resource.duration === "number"
                      ? formatDuration(resource.duration)
                      : resource.duration
                    : "Audio"}
                </span>
              )}
            </div>
            <div className="absolute top-2 left-2 bg-[#a47600] text-white px-2 py-0.5 rounded text-xs font-medium flex items-center">
              <Music className="h-3 w-3 mr-1" />
              Audio
            </div>
          </div>
        );

      case "texts":
        // For text documents, show a document style preview
        return (
          <div className="aspect-video bg-gradient-to-r from-green-500 to-teal-500 rounded-md p-4 flex flex-col text-white/90">
            <div className="flex flex-col gap-1 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 bg-white/40 rounded"
                  style={{ width: `${75 - i * 15}%` }}
                ></div>
              ))}
            </div>
            <div className="flex flex-col gap-1 mt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 bg-white/30 rounded"
                  style={{ width: `${85 - (i % 2) * 20}%` }}
                ></div>
              ))}
            </div>
            <div className="absolute top-2 left-2 bg-green-700/90 px-2 py-0.5 rounded text-xs font-medium flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              Texte
            </div>
          </div>
        );

      default:
        return (
          <div className="aspect-video bg-gradient-to-r from-gray-500 to-slate-600 rounded-md flex items-center justify-center text-white">
            <FileText className="h-8 w-8" />
          </div>
        );
    }
  };

  // Get color scheme for each category
  const getCategoryColors = () => {
    const category = resource.category.label.toLowerCase();
    switch (category) {
      case "images":
        return {
          border: "border-indigo-200",
          badge: "bg-indigo-100 text-indigo-800",
          hover: "hover:border-indigo-300",
          icon: "text-indigo-500",
        };
      case "vidéos":
        return {
          border: "border-red-200",
          badge: "bg-red-100 text-red-800",
          hover: "hover:border-red-300",
          icon: "text-red-500",
        };
      case "audio":
        return {
          border: "border-purple-200",
          badge: "bg-website-accent-1/40 text-[#a47600]",
          hover: "hover:border-purple-300",
          icon: "text-[#a47600]",
        };
      case "texts":
        return {
          border: "border-green-200",
          badge: "bg-green-100 text-green-800",
          hover: "hover:border-green-300",
          icon: "text-green-500",
        };
      default:
        return {
          border: "border-gray-200",
          badge: "bg-gray-100 text-gray-800",
          hover: "hover:border-gray-300",
          icon: "text-gray-500",
        };
    }
  };

  const colors = getCategoryColors();

  return (
    <Link href={resourceUrl}>
      <Card
        className={`group h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white`}
      >
        <div className="p-3">
          {/* Preview Section */}
          {renderPreview()}

          {/* Card Content */}
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
              className="text-sm text-gray-600 line-clamp-2 mb-3"
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
                  className="text-xs text-gray-500 truncate max-w-[120px]"
                  title={`${resource.author.firstName} ${resource.author.lastName}`}
                >
                  Par: {resource.author.firstName} {resource.author.lastName}
                </span>
              )}
            </div>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="border-t mt-3 pt-3 pb-1 text-sm text-gray-500 flex justify-between">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {resource.publishedAt &&
                formatDistanceToNow(resource.publishedAt, { addSuffix: true })}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {Number(resource.views).toLocaleString()}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="h-3 w-3 mr-1" />
                {Number(resource.upvotes).toLocaleString()}
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
