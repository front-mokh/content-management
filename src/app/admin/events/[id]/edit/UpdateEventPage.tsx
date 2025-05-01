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
import { updateEventWithFile } from "@/lib/updateEvent"; // You'll need to create this

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
  const [fileError, setFileError] = useState<string | null>(null);

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
        event.mediaPath
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
                Fichier média (optionnel)
              </label>
              <div className="mb-2 text-sm text-gray-500">
                Fichier actuel: {event.mediaPath.split("/").pop()}
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
