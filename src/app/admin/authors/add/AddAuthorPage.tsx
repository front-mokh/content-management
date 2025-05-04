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
import { createAuthorWithImage } from "@/lib/createAuthorWIthImage";

// Schema for author creation
const addAuthorSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
});

export type CreateAuthorInput = z.infer<typeof addAuthorSchema>;

export default function AddAuthorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<CreateAuthorInput>({
    resolver: zodResolver(addAuthorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      description: "",
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: CreateAuthorInput) => {
    setIsSubmitting(true);
    try {
      // Call the server action
      const result = await createAuthorWithImage(values, selectedFile);

      if (!result.success) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      toast.success("Auteur ajouté avec succès");
      router.push("/admin/authors"); // Redirect to the authors list
      router.refresh(); // Ensure the list page data is refreshed
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'ajout de l'auteur"
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
            <CardTitle>Ajouter un nouvel auteur</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour ajouter un nouvel auteur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow">
            <TextField
              control={form.control}
              name="firstName"
              label="Prénom"
              placeholder="Prénom de l'auteur"
              disabled={isSubmitting}
            />
            <TextField
              control={form.control}
              name="lastName"
              label="Nom"
              placeholder="Nom de l'auteur"
              disabled={isSubmitting}
            />
            <TextAreaField
              control={form.control}
              name="description"
              label="Biographie (optionnel)"
              placeholder="Détails biographiques de l'auteur"
              disabled={isSubmitting}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Photo de l'auteur (optionnel)</label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                isSubmitting={isSubmitting}
                accept="image/*" // Only accept images
              />
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ajout en cours..." : "Ajouter l'auteur"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}