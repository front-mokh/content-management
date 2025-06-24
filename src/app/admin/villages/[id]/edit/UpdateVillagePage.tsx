// app/admin/villages/[id]/edit/UpdateVillagePage.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Village } from "@prisma/client";

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
import { FileUpload } from "@/components/custom/FileUpload";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateVillageWithFile, UpdateVillageInput } from "@/lib/services/vilageService";

// Define the schema for village update
const updateVillageSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
});

export type UpdateVillageFormInput = z.infer<typeof updateVillageSchema>;

export default function UpdateVillagePage({ village }: { village: Village }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<UpdateVillageFormInput>({
    resolver: zodResolver(updateVillageSchema),
    defaultValues: {
      id: village.id,
      title: village.title,
      description: village.description || "",
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileError(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: UpdateVillageFormInput) => {
    setIsSubmitting(true);
    try {
      // The server action handles both the village update and file upload if needed
      const result = await updateVillageWithFile(
        values,
        selectedFile,
        village.mediaPath
      );

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Village mis à jour avec succès");
      router.push("/admin/villages");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour du village"
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
        <CardTitle>Modifier le village</CardTitle>
        <CardDescription>
          Modifiez les informations de ce village.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              control={form.control}
              name="title"
              label="Titre"
              placeholder="Nom du village"
              disabled={isSubmitting}
            />

            <TextAreaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Description détaillée du village"
              disabled={isSubmitting}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Image du Village <span className="text-red-500">*</span>
              </label>
              <div className="mb-2 text-sm text-gray-500">
                Image actuelle: {getFilename(village.mediaPath)}
              </div>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
                accept="image/*" // Only accept images
              />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Laissez vide pour conserver l&apos;image actuelle
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