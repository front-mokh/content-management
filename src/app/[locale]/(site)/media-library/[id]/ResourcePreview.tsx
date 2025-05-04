"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  CATEGORY_COLORS,
  CategoryColorIndex,
  ExtensionStylesIndex,
} from "@/lib/constants";
import { FullResource } from "@/lib/types";
import { FileText, Film, Folder, ImageIcon, Music } from "lucide-react";
import { formatDuration } from "@/lib/utils";

// Helper function to convert resource path to API path
const getApiPath = (path: string) => {
  // Extract the filename from the original path
  const filename = path.split("/").pop();
  // Return the API path
  return `/api/uploads/${filename}`;
};

// Helper function to normalize type labels for consistent matching
const normalizeTypeLabel = (typeLabel: string) => {
  const label = typeLabel.toLowerCase().trim();

  // Image variations
  if (
    label.includes("imag") ||
    label === "photo" ||
    label === "photos" ||
    label === "image" ||
    label === "images"
  ) {
    return "image";
  }

  // Video variations
  if (label.includes("vid") || label === "film" || label === "films") {
    return "video";
  }

  // Audio variations
  if (
    label.includes("audio") ||
    label.includes("son") ||
    label === "musique" ||
    label === "music" ||
    label === "mp3" ||
    label === "song" ||
    label === "sound"
  ) {
    return "audio";
  }

  // Text/Document variations
  if (
    label.includes("text") ||
    label.includes("document") ||
    label.includes("doc") ||
    label.includes("file") ||
    label.includes("fichier") ||
    label.includes("texte")
  ) {
    return "text";
  }

  return "default";
};

export function ResourcePreview({
  resource,
}: {
  resource: FullResource & { apiPath?: string | null };
}) {
  // Normalize the type for consistent handling
  const normalizedType = normalizeTypeLabel(resource.type.label);
  const colors =
    CATEGORY_COLORS[normalizedType as CategoryColorIndex] ||
    CATEGORY_COLORS.default;

  // State for video/audio previews
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Use the API path if provided, otherwise generate it from the original path
  const filePath =
    resource.apiPath || (resource.path ? getApiPath(resource.path) : null);

  const getFileExtensionStyle = () => {
    const fileName = resource.path || resource.title;
    const extension = (fileName.split(".").pop()?.toLowerCase() ||
      "") as ExtensionStylesIndex;

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

    return extensionStyles[extension] || extensionStyles.default;
  };

  // Video thumbnail and duration extraction
  useEffect(() => {
    const isVideo = normalizedType === "video";

    if (isVideo && filePath && !videoThumbnail) {
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

      video.src = filePath;
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
  }, [normalizedType, filePath, videoThumbnail]);

  // Audio duration extraction
  useEffect(() => {
    const isAudio = normalizedType === "audio";

    if (isAudio && filePath && !audioDuration) {
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setAudioDuration(audio.duration);
        }
      };

      audio.src = filePath;

      return () => {
        audio.onloadedmetadata = null;
        audio.src = "";
      };
    }
  }, [normalizedType, filePath, audioDuration]);

  // Render content based on normalized type
  switch (normalizedType) {
    case "image":
      return (
        <div className="relative aspect-auto max-h-[600px] flex items-center justify-center bg-gray-100 p-6">
          {filePath ? (
            <Image
              src={filePath}
              alt={resource.title}
              width={1200}
              height={800}
              className="max-h-[500px] object-contain"
            />
          ) : (
            <div
              className={`w-full h-64 flex items-center justify-center bg-gradient-to-br ${colors.gradient}`}
            >
              <ImageIcon className="h-16 w-16 text-white/80" />
            </div>
          )}
        </div>
      );

    case "video":
      return (
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          {filePath ? (
            <video
              src={filePath}
              controls
              className="max-h-[600px] w-full"
              poster={videoThumbnail ?? undefined}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${colors.gradient}`}
            >
              <Film className="h-16 w-16 text-white/80" />
            </div>
          )}
        </div>
      );

    case "audio":
      return (
        <div className={`p-8 bg-gradient-to-tl ${colors.gradient}`}>
          {filePath ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Music className="h-16 w-16 text-white" />
              </div>
              <audio src={filePath} controls className="w-full">
                Votre navigateur ne supporte pas l'élément audio
              </audio>
              {audioDuration > 0 && (
                <div className="text-center text-white mt-4">
                  Durée: {formatDuration(audioDuration)}
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <Music className="h-16 w-16 text-white/80" />
            </div>
          )}
        </div>
      );

    case "text":
      const fileExtensionStyle = getFileExtensionStyle();
      return (
        <div
          className={`p-8 bg-gradient-to-tl from-website-secondary/90 to-website-secondary/90 min-h-[300px] flex items-center justify-center`}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <Folder className="h-20 w-20 text-website-accent-1/90 mx-auto mb-4" />
            <p className="text-6xl text-website-accent-1 font-bold mb-4">
              {fileExtensionStyle.text}
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={`aspect-video w-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}
        >
          <FileText className="h-16 w-16 text-white/80" />
        </div>
      );
  }
}
