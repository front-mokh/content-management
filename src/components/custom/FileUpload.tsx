"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  isSubmitting: boolean;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  isSubmitting,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);

      // Create a preview URL if it's an image
      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileRemove();

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Revoke object URL to avoid memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onFileSelect(droppedFile);

      // Create a preview URL if it's an image
      if (droppedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(droppedFile);
        setPreviewUrl(url);
      }
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg px-4 py-3 transition-all ${
        file ? "border-gray-300" : "border-gray-300 hover:border-gray-400"
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!file && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <label htmlFor="file-upload" className="cursor-pointer text-center">
            <span className="text-sm font-medium text-blue-600 hover:underline">
              Cliquez pour sélectionner un fichier
            </span>
            <span className="text-sm text-gray-500 block">
              ou glissez-déposez votre fichier ici
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isSubmitting}
            />
          </label>
        </div>
      )}

      {file && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-xs font-medium uppercase">
                  {file.name.split(".").pop()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!isSubmitting && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>

          {previewUrl && file.type.startsWith("image/") && (
            <div className="mt-2 relative rounded-md overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto max-h-32 object-cover"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
