"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFFileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  isSubmitting: boolean;
}

export function PDFFileUpload({
  onFileSelect,
  onFileRemove,
  isSubmitting,
}: PDFFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    onFileRemove();

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        onFileSelect(droppedFile);
      } else {
        // Optional: Show error message for non-PDF files
        alert("Seuls les fichiers PDF sont acceptés");
      }
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 transition-all ${
        file ? "border-gray-300" : "border-gray-300 hover:border-gray-400"
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!file && (
        <div className="flex flex-col items-center justify-center gap-4">
          <FileText className="h-10 w-10 text-gray-400" />
          <label htmlFor="pdf-upload" className="cursor-pointer text-center">
            <span className="text-sm font-medium text-blue-600 hover:underline">
              Cliquez pour sélectionner un PDF (optionnel)
            </span>
            <span className="text-sm text-gray-500 block">
              ou glissez-déposez votre fichier ici
            </span>
            <input
              id="pdf-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isSubmitting}
              accept="application/pdf" // Only allow PDF files
            />
          </label>
        </div>
      )}

      {file && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-500" />
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
        </div>
      )}
    </div>
  );
}