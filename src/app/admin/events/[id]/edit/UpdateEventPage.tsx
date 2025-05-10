"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Event, MediaType } from "@prisma/client";

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
import { PDFFileUpload } from "@/components/custom/PDFFileUpload"; // Import the PDF component
import { updateEventWithFile } from "@/lib/updateEvent";
import { FileText } from "lucide-react"; // Import for PDF icon

// Define the schema for event update
const updateEventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
  type: z.nativeEnum(MediaType, {
    errorMap: () => ({ message: "Le type de média est obligatoire" }),
  }),
});

export type UpdateEventInput = z.infer<typeof updateEventSchema>;

export default function UpdateEventPage({ event }: { event: Event }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null); // New state for PDF
  const [fileError, setFileError] = useState<string | null>(null);
  const [removePdf, setRemovePdf] = useState(false); // Track if PDF should be removed

  const form = useForm<UpdateEventInput>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      id: event.id,
      title: event.title,
      description: event.description || "",
      type: event.type,
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileError(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  // New handlers for PDF
  const handlePdfSelect = (file: File) => {
    setSelectedPdfFile(file);
    setRemovePdf(false); // If selecting a new PDF, cancel any removal
  };

  const handlePdfRemove = () => {
    setSelectedPdfFile(null);
    // If there was an existing PDF, mark it for removal
    if (event.pdfPath) {
      setRemovePdf(true);
    }
  };

  // Cancel PDF removal
  const cancelPdfRemoval = () => {
    setRemovePdf(false);
  };

  const onSubmit = async (values: UpdateEventInput) => {
    setIsSubmitting(true);
    try {
      if (!selectedFile && values.type !== event.type) {
        // If changing media type but not uploading a new file, show error
        setFileError(
          "Un nouveau fichier est requis lors du changement de type de média"
        );
        setIsSubmitting(false);
        return;
      }

      // The server action handles both the event update and file upload if needed
      const result = await updateEventWithFile(
        values,
        selectedFile,
        event.mediaPath,
        selectedPdfFile,
        event.pdfPath || null,
        removePdf
      );

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Événement mis à jour avec succès");
      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de l'événement"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get filename from path
  const getFilename = (filePath: string | null | undefined) => {
    if (!filePath) return "";
    return filePath.split("/").pop() || "";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Modifier l'événement</CardTitle>
        <CardDescription>
          Modifiez les informations de cet événement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              control={form.control}
              name="title"
              label="Titre"
              placeholder="Titre de l'événement"
            />

            <TextAreaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Description détaillée de l'événement"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Type de média</label>
              <Select
                onValueChange={(value) =>
                  form.setValue("type", value as MediaType)
                }
                defaultValue={event.type}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type de média" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MediaType.IMAGE}>Image</SelectItem>
                  <SelectItem value={MediaType.VIDEO}>Vidéo</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Fichier média <span className="text-red-500">*</span>
              </label>
              <div className="mb-2 text-sm text-gray-500">
                Fichier actuel: {getFilename(event.mediaPath)}
              </div>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
              />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Laissez vide pour conserver le fichier actuel
              </p>
            </div>

            {/* PDF File Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Document PDF (optionnel)
              </label>
              
              {event.pdfPath && !removePdf ? (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2 p-3 bg-gray-50 rounded-md">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">
                      Fichier actuel: {getFilename(event.pdfPath)}
                    </span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setRemovePdf(true)}
                      disabled={isSubmitting}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ) : event.pdfPath && removePdf ? (
                <div className="mb-4 p-3 bg-red-50 rounded-md">
                  <p className="text-sm text-red-600 mb-2">
                    Le PDF sera supprimé lors de la mise à jour
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={cancelPdfRemoval}
                    disabled={isSubmitting}
                  >
                    Annuler la suppression
                  </Button>
                </div>
              ) : null}

              {!event.pdfPath || removePdf ? (
                <>
                  <PDFFileUpload
                    onFileSelect={handlePdfSelect}
                    onFileRemove={handlePdfRemove}
                    isSubmitting={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vous pouvez ajouter un fichier PDF associé à cet événement
                  </p>
                </>
              ) : null}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Mise à jour en cours..." : "Mettre à jour"}
        </Button>
      </CardFooter>
    </Card>
  );
}