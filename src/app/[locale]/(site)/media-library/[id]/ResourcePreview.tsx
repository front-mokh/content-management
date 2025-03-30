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
import { Button } from "@/components/ui/button";

export function ResourcePreview({ resource }: { resource: FullResource }) {
  const category = resource.category.label.toLowerCase();
  const colors =
    CATEGORY_COLORS[category as CategoryColorIndex] || CATEGORY_COLORS.default;

  // State for video/audio previews
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    const isVideo = category === "vidéos";

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
  }, [category, resource.path, videoThumbnail]);

  // Audio duration extraction
  useEffect(() => {
    const isAudio = category === "audio";

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
  }, [category, resource.path, audioDuration]);

  // Render content based on resource type
  switch (category) {
    case "images":
      return (
        <div className="relative aspect-auto max-h-[600px] flex items-center justify-center bg-gray-100 p-6">
          {resource.path ? (
            <Image
              src={resource.path}
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

    case "vidéos":
      return (
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          {resource.path ? (
            <video
              src={resource.path}
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
          {resource.path ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Music className="h-16 w-16 text-white" />
              </div>
              <audio src={resource.path} controls className="w-full">
                Your browser does not support the audio element.
              </audio>
              {audioDuration && (
                <div className="text-center text-white mt-4">
                  Duration: {formatDuration(audioDuration)}
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

    case "texte":
      const fileExtensionStyle = getFileExtensionStyle();
      return (
        <div
          className={`p-8 bg-gradient-to-tl ${colors.gradient} min-h-[300px] flex items-center justify-center`}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <Folder className="h-20 w-20 text-website-accent-1/90 mx-auto mb-4" />
            <p className="text-6xl text-website-accent-1 font-bold mb-4">
              {fileExtensionStyle.text}
            </p>
            <p className="text-white text-lg">{resource.title}</p>
            <Button
              className="mt-6 bg-white text-website-secondary hover:bg-white/90"
              asChild
            >
              <a href={resource.path} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4 mr-2" />
                Open Document
              </a>
            </Button>
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
