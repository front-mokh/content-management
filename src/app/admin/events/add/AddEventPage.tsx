"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MediaType } from "@prisma/client"; // Import MediaType

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextField from "@/components/custom/TextField";
import TextAreaField from "@/components/custom/TextAreaField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/custom/FileUpload";
import { PDFFileUpload } from "@/components/custom/PDFFileUpload"; // Import the new PDFFileUpload component
import { createEventWithFile } from "@/lib/createEvent";

// Schema matching the server action input (excluding the file)
const addEventSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
  type: z.nativeEnum(MediaType, {
    errorMap: () => ({ message: "Le type de média est obligatoire" }),
  }),
});

export type CreateEventInput = z.infer<typeof addEventSchema>;

export default function AddEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null); // New state for PDF file
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: "",
      description: "",
      // type: undefined // Let the user select
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileError(null); // Clear previous file errors on new selection
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  // New handlers for PDF file
  const handlePdfSelect = (file: File) => {
    setSelectedPdfFile(file);
  };

  const handlePdfRemove = () => {
    setSelectedPdfFile(null);
  };

  const onSubmit = async (values: CreateEventInput) => {
    if (!selectedFile) {
      setFileError("Le fichier média est obligatoire");
      // Optionally focus the file input or scroll to it
      return;
    }
    setFileError(null); // Clear error if file is now present

    setIsSubmitting(true);
    try {
      // Call the server action with both media file and optional PDF file
      const result = await createEventWithFile(values, selectedFile, selectedPdfFile);

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Événement ajouté avec succès");
      router.push("/admin/events"); // Redirect to the events list
      router.refresh(); // Ensure the list page data is refreshed
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout de l'événement"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full">
      <Form {...form}>
        {/* Use form tag here to ensure proper submit handling */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <CardHeader>
            <CardTitle>Ajouter un nouvel événement</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour ajouter un nouvel événement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow">
            <TextField
              control={form.control}
              name="title"
              label="Titre"
              placeholder="Titre de l'événement"
              disabled={isSubmitting}
            />
            <TextAreaField
              control={form.control}
              name="description"
              label="Description (optionnel)"
              placeholder="Description de l'événement"
              disabled={isSubmitting}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de Média</label>
              <Select
                onValueChange={(value) =>
                  form.setValue("type", value as MediaType)
                } // Cast value to MediaType
                defaultValue={form.getValues("type")}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type (Image/Vidéo)" />
                </SelectTrigger>
                <SelectContent>
                  {/* Use values from Prisma's MediaType enum */}
                  {Object.values(MediaType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === MediaType.IMAGE ? "Image" : "Vidéo"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fichier Média <span className="text-red-500">*</span></label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
                // Optionally add accept="image/*,video/*" to <input type="file"> inside FileUpload
              />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
            </div>
            
            {/* New PDF File Upload section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Document PDF (optionnel)</label>
              <PDFFileUpload
                onFileSelect={handlePdfSelect}
                onFileRemove={handlePdfRemove}
                isSubmitting={isSubmitting}
              />
              <p className="text-xs text-gray-500">
                Vous pouvez ajouter un fichier PDF associé à cet événement (brochure, programme, etc.)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button
              type="button" // Important: type="button" for cancel
              variant="outline"
              onClick={() => router.back()} // Go back to previous page
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || !selectedFile}>
              {isSubmitting ? "Ajout en cours..." : "Ajouter l'événement"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}