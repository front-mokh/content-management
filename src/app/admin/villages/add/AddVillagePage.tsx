"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import { createVillageWithFile, CreateVillageInput } from "@/lib/services/vilageService";

// Schema for village creation
const addVillageSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
});

export type CreateVillageFormInput = z.infer<typeof addVillageSchema>;

export default function AddVillagePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useForm<CreateVillageFormInput>({
    resolver: zodResolver(addVillageSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileError(null); // Clear previous file errors on new selection
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: CreateVillageFormInput) => {
    if (!selectedFile) {
      setFileError("L'image est obligatoire");
      return;
    }
    setFileError(null); // Clear error if file is now present

    setIsSubmitting(true);
    try {
      // Call the server action with the village data and image file
      const result = await createVillageWithFile(values, selectedFile);

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Village ajouté avec succès");
      router.push("/admin/villages"); // Redirect to the villages list
      router.refresh(); // Ensure the list page data is refreshed
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout du village"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <CardHeader>
            <CardTitle>Ajouter un nouveau village</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour ajouter un nouveau village
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow">
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
              label="Description (optionnel)"
              placeholder="Description du village"
              disabled={isSubmitting}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Image du Village <span className="text-red-500">*</span>
              </label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
                accept="image/*" // Only accept images
              />
              {fileError && <p className="text-sm text-red-500">{fileError}</p>}
              <p className="text-xs text-gray-500">
                Sélectionnez une image représentative du village
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || !selectedFile}>
              {isSubmitting ? "Ajout en cours..." : "Ajouter le village"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}