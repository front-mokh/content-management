"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FileDownloader({ path }: { path: string }) {
  // If path is null or undefined, don't render anything
  if (!path) return null;
  
  // Extract file extension and name
  const extension = path.split(".").pop() || "";
  const originalFilename = path.split("/").pop() || `resource.${extension}`;
  
  const getApiPath = (path: string) => {
    // Keep the full path structure after "/uploads/"
    // Example: "/uploads/media/uuid-filename.jpg" → "/api/uploads/media/uuid-filename.jpg"
    const pathParts = path.split("/uploads/");
    if (pathParts.length > 1) {
      return `/api/uploads/${pathParts[1]}`;
    }
    return path; // Fallback to original path if structure is unexpected
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = getApiPath(path);
    link.download = originalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getApiPath(path), "_blank");
  };

  return (
    <TooltipProvider>
      <div
        className={cn("flex items-center justify-center gap-2")}
        onClick={handleDownload}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={handlePreview}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Aperçu</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-primary"
            >
              <Download className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Télécharger</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}