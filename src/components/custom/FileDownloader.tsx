"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileIcon, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FileDownloader({ path }: { path: string }) {
  // Extract file extension
  const extension = path.split(".").pop() || "";
  const fileName = `resource.${extension}`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = path;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(path, "_blank");
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
